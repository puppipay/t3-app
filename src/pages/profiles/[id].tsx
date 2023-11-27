import { getSession } from "next-auth/react";
import React from "react";
import Head from "next/head";
import { api } from "~/utils/api";
import ProfileImage from "~/components/ProfileImage";
import { ssgHelper } from "~/server/api/ssgHelper";

function Profile({ id }) {
  //const session = getSession();

  const {data: profile }  = api.profile.getById.useQuery({ id });
  
  console.log(profile?.name);

  Intl.

  return (
    <div>
      
      <Head>
         <title>Messaging app {profile?.name}  </title>
         
      </Head>
      {profile?.name}
      
    </div>
  );
}

export async function getServerSideProps(
  context: GetStaticPropsContext<{ id: string }>,
) {
  const id = context.params?.id;

  // Fetch data from external API

  const ssg = ssgHelper();

  await ssg.profile.getById.fetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}

export default Profile;
