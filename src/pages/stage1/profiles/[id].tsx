import React from 'react'

import { useRouter } from 'next/router';




function Profilepage() {

    const router = useRouter();
const { id } = router.query;

  return (
    <div>{id}</div>
  )
}

export default Profilepage;
