"use client"
import { User } from "@/domains/User";
import './Profile.scss'
import { useEffect } from "react";

export function Profile({ user }: User) {
  useEffect(()=>{
     console.log(user)
  },[user])
  let userData = user.user_metadata
  return (
    <div>
      <div className="pictureandupdatepicturediv">

      </div>
      {userData.first_name}
      {user.id}
    </div>
  )
}

export default Profile