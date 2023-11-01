"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import sampleuserpic from "./../../../assets/images/face21.jpg";
import { User } from "@/domains/User";
import "./Profile.scss";
import Link from "next/link";
import { supabase } from "@/utils";
import Loader from "@/components/atoms/Loader";

interface ProfileProps {
  user: User;
}

export function Profile({ user }: ProfileProps) {
  const userData = user.user_metadata;
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [avatarImage, setAvatarImage] = useState<string | undefined>(
    userData?.avatarImage
  );

 async function onUpdateUser() {
    setIsLoading(true)
    setError(null)
    const { data, error } = await supabase.auth.updateUser({
      email: emailRef.current && emailRef.current.value ||  userData.email,
      data: {
        firstName: firstNameRef.current && firstNameRef.current.value || userData.firstName,
        lastName: lastNameRef.current && lastNameRef.current.value || userData.lastName,
        phone: phoneRef.current && phoneRef.current.value ||  userData.phone,
        email: emailRef.current && emailRef.current.value ||  userData.email,
        avatarImage: avatarImage ||  userData.avatarImage
      },
    });
    if(error) {
      setIsLoading(false)
      setError('There was an error updating user')
    }
    else {
      setIsLoading(false)
      window.location.reload()
    } 
  }

  function onFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setAvatarImage(base64Image);
      };
    }
  }

  function onCameraClick() {
    if (hiddenFileInput.current !== null) {
      hiddenFileInput.current.click();
    }
  }

  return (
    <div
      style={{
        width: `${
          window.innerWidth > 736
            ? window.innerWidth - 160
            : window.innerWidth - 50
        }px`,
      }}
    >
      <div className="pictureandupdatepicturediv">
        <div className="photobox">
          {avatarImage ? (
            <Image src={avatarImage} alt="" width={40} height={40} />
          ) : (
            <Image src={sampleuserpic} alt="" />
          )}
          <div className="camerabox" onClick={onCameraClick}>
            <i className="material-icons-outlined">photo_camera</i>
          </div>
          <input
            type="file"
            onChange={onFileInputChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className="profileformsection">
        <div className="formRow">
          <label htmlFor="firstName">First Name</label>
          <div className="inputDiv">
            <input
              type="text"
              name="firstName"
              id="firstName"
              ref={firstNameRef}
              defaultValue={userData.firstName}
            />
          </div>
        </div>
        <div className="formRow">
          <label htmlFor="lastName">Last Name</label>
          <div className="inputDiv">
            <input
              type="text"
              name="lastName"
              id="lastName"
              ref={lastNameRef}
              defaultValue={userData.lastName}
            />
          </div>
        </div>
        <div className="formRow">
          <label htmlFor="email">Email</label>
          <div className="inputDiv">
            <input
              type="text"
              name="email"
              id="email"
              ref={emailRef}
              defaultValue={userData.email}
            />
          </div>
        </div>

        <div className="formRow">
          <label htmlFor="phone">Phone</label>
          <div className="inputDiv">
            <input
              type="text"
              name="phone"
              id="phone"
              ref={phoneRef}
              defaultValue={userData.phone}
            />
          </div>
        </div>
        {error && <div style={{color: "red"}}>{error}</div>}
        <div className="formRow">
          <button className="submitbtn" onClick={onUpdateUser}>{
           isLoading ? <Loader size={20} /> : 'Update'
          }</button>
        </div>
        <div className="wanttoresetpassword">
          <Link href="/auth/resetpassword">Want to reset Password?</Link>
        </div>
      </div>
    </div>
  );
}
export default Profile;
