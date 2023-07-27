import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const UserProfilePicSkeleton = () => {
  return (
    <div style={{display:"flex", alignItems:"center"}}>
        <Skeleton style={{width:"150px", height:"150px"}} circle/>
        <Skeleton style={{width:"150px", height:"30px", marginLeft:"30px"}} />
    </div>
  )
}
