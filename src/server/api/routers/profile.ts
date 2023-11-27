import { Prisma } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  createTRPCContext,
  publicProcedure,
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  
  getById: publicProcedure.input(
    z.object({
        id: z.string(),
        
      })
    )
      .query(async ({ input: { id  }, ctx }) => {
       
        const currentuserId = ctx.session?.user.id;

        const profile = await ctx.db.user.findUnique({
            where: {id},
            select: 
                { name: true, id: true, image: true ,
                _count: {select :{tweets: true} }
                },
            
        });
        
        if(profile == null) return null;

        return { name: profile.name, image: profile.image, tweetcount: profile._count.tweets };
          
      })

    });

  
