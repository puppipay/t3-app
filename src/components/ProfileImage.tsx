import React from 'react'
import Image from 'next/image';
import { VscAccount } from 'react-icons/vsc';

type ProfileImgeProps = {
 src?: string | null
 className?: string
};

function ProfileImage({src, className=""}) {
  return (
    <div
      className={`relative h-8 w-8 overflow-hidden rounded-full ${className}`}
    >
      ProfileImage
      {src == null ? (
        <VscAccount className="h-full w-full" />
      ) : (
        <Image src={src} alt="Profile image" quality={100} fill />
      )}
    </div>
  );
  

}

export default ProfileImage