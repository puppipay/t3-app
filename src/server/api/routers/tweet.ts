import { Prisma } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  createTRPCContext,
  publicProcedure,
} from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  infiniteProfileFeed: publicProcedure
  .input(
    z.object({
      userId: z.string(),
      limit: z.number().optional(),
      cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
    })
  )
  .query(async ({ input: { limit = 10, userId, cursor }, ctx }) => {
    return await getInfiniteTweets({
      limit,
      ctx,
      cursor,
      whereClause: { userId },
    });
  }),
  infiniteFeed: publicProcedure.input(
    z.object({
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
      .query(async ({ input: { limit = 10, cursor }, ctx }) => {
        const currentuserId = ctx.session?.user.id;

        const data = await ctx.db.tweet.findMany({
          take: limit + 1,
          cursor: cursor ? { createdAt_id: cursor } : undefined,
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
          select: {
            id: true,
            content: true,
            createdAt: true,
            _count: { select: { likes: true } },
            likes:
              currentuserId == null
                ? false
                : { where: { userId: currentuserId } },
            user: {
              select: { name: true, id: true, image: true },
            },
          },
        });

        let nextCursor: typeof cursor | undefined;
        if (data.length > limit) {
          const nextItem = data.pop();
          if (nextItem != null) {
            nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt };
          }
        }

        return {
          tweets: data.map((tweet) => {
            return {
              id: tweet.id,
              content: tweet.content,
              createdAt: tweet.createdAt,
              likeCount: tweet._count.likes,
              user: tweet.user,
              //likedByMe: tweet.likes?.length > 0,
            };
          }, nextCursor),
        };
      }),
  

  
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      const tweet = await ctx.db.tweet.create({ data: { 
        content, 
        userId: ctx.session.user.id 
      }
    }); 
    
    
      return tweet;
    }),
    
    togglelike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const data = {tweetId: id, userId: ctx.session.user.id};
      const existinglike = await ctx.db.like.findUnique({ 
        where: { 
        userId_tweetId: data, 
        
      }
    });

    if(existinglike == null) {
      await ctx.db.like.create({data});
      return {addedlike: true};
    }else {
      await ctx.db.like.delete({where: {userId_tweetId: data}});
      return {addedlike: false};
    }
    
      return existingtweet;
    }),
  

  /*
    create: protectedProcedure
      .input(z.object({ name: z.string().min(1) }))
      .mutation(async ({ ctx, input }) => {
        // simulate a slow db call
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        return ctx.db.post.create({
          data: {
            name: input.name,
            createdBy: { connect: { id: ctx.session.user.id } },
          },
        });
      }),
  
    getLatest: protectedProcedure.query(({ ctx }) => {
      return ctx.db.post.findFirst({
        orderBy: { createdAt: "desc" },
        where: { createdBy: { id: ctx.session.user.id } },
      });
    }),
  
    getSecretMessage: protectedProcedure.query(() => {
      return "you can now see this secret message!";
    }),
  
    */
});

async function getInfiniteTweets({
  whereClause,
  ctx,
  limit,
  cursor,
}: {
  whereClause?: Prisma.TweetWhereInput;
  limit: number;
  cursor: { id: string; createdAt: Date } | undefined;
  ctx: inferAsyncReturnType<typeof createTRPCContext>;
}) {
  const currentUserId = ctx.session?.user.id;

  const data = await ctx.db.tweet.findMany({
    take: limit + 1,
    cursor: cursor ? { createdAt_id: cursor } : undefined,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    where: whereClause,
    select: {
      id: true,
      content: true,
      createdAt: true,
      _count: { select: { likes: true } },
      likes:
        currentUserId == null ? false : { where: { userId: currentUserId } },
      user: {
        select: { name: true, id: true, image: true },
      },
    },
  });

  let nextCursor: typeof cursor | undefined;
  if (data.length > limit) {
    const nextItem = data.pop();
    if (nextItem != null) {
      nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt };
    }
  }

  return {
    tweets: data.map((tweet) => {
      return {
        id: tweet.id,
        content: tweet.content,
        createdAt: tweet.createdAt,
        likeCount: tweet._count.likes,
        user: tweet.user,
        likedByMe: tweet.likes?.length > 0,
      };
    }),
    nextCursor,
  };
}
