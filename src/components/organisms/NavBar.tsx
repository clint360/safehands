"use client"
import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import Logo from "../atoms/Logo";
import sampleuserpic from "./../../assets/images/face21.jpg";
import Image from "next/image";
import Link from "next/link";
import NotificationsWrapper from "../molecules/NotifactionsWrapper";

function NavBar() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unseenNotificationsCount, setUnseenNotificationsCount] = useState<number>(0);

  const setOpen = () => {
     if(isNotificationsOpen === true) setIsNotificationsOpen(false)
     else setIsNotificationsOpen(true)
  }

  return (
    <div className={styles.navbarmain}>
      <div className={styles.navlogosection}>
        <Logo />
      </div>
      <div className={styles.detailssection}>
        <div className={styles.notificationicon} onClick={setOpen}>
          <div className={styles.notificationdot} />
          <i className="material-icons-outlined">notifications</i>
        </div>
        <NotificationsWrapper
            open={isNotificationsOpen}
            notifications={notifications}
            setOpen={setIsNotificationsOpen}
          />
        <Link href={"/app/profile"}>
          <div className={styles.accountcircle}>
            <Image src={sampleuserpic} alt="" />
          </div>
        </Link>
        <div className={styles.downarrow}>
          <select name="slct" id="slct" defaultValue={''}>
              <option style={{display: "none"}}></option>
               <option value="1" className={styles.selectopt}>
                    Website 🏠
                </option>
                <option value="1" className={styles.selectopt}>
                    Log Out 📴
                </option>
            </select>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
