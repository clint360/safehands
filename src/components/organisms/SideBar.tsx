"use client"
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "./SideBar.module.scss";
import { SideBarItemInterface, items } from "@/constants/sidebaritems";
import { sideBarItemActive } from "@/services/utils";

function SideBarItem({title, icon, link}: SideBarItemInterface) {
    const router = useRouter();
    const active = sideBarItemActive(link)
    
    function action() {

  }

  return (
    <div className={`${styles.sidebaritem} ${active && styles.sidebaritemactive}`} onClick={action}>
      <div className={styles.sidebaritemicon}>{icon}</div>
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
