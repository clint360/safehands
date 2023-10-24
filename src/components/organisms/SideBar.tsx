"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./SideBar.module.scss";
import { SideBarItemInterface, items } from "@/constants/sidebaritems";
import { domainName } from "@/services/utils";

function SideBarItem({title, icon, link}: SideBarItemInterface) {
    const router = useRouter();
    const [active, setActive] = useState(false)
    
    useEffect(()=> {
        setActive(!!(window.location.href === `${domainName + link}`))
    },[])

    function action() {
      router.push(link)
  }

  return (
    <div className={`${styles.sidebaritem} ${active && styles.sidebaritemactive}`} onClick={action}>
      {
        <div className={styles.notificationdot} />
      }
      <div className={styles.sidebaritemicon}><i className="material-icons-outlined">
          {icon}
        </i></div>
      <div className={styles.sidebaritemtitle}>{title}</div>
    </div>
  );
}

function SideBar() {
  return <div className={styles.sidebarmain}>
    {items.map((item, index)=> {return (
    <SideBarItem 
    title={item.title}
    icon={item.icon}
    link={item.link}
    />
    )})}
  </div>;
}

export default SideBar;
