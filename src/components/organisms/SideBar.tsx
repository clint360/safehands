"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./SideBar.module.scss";
import { SideBarItemInterface, items } from "@/constants/sidebaritems";
import { User } from "@supabase/auth-helpers-nextjs";
import { getUnseenMessagesCountForId } from "@/services/messages";
import { getUnseenReports } from "@/services/reports";

interface SideBarProps {
  user: User
}

async function shouldShowdot(link: string, user: User | undefined) {
  if(link === '/app/dashboard') return false
  if(!user?.user_metadata.isAdmin && link === '/app/reports') return false
  if(link === '/app/messages') {
    const count = user && await getUnseenMessagesCountForId(user?.id)
    if(count && count > 0) return true
  }
  if(link === '/app/reports' && user?.user_metadata.isAdmin) {
    const reports = user && await getUnseenReports()
    if(reports && reports.length > 0) return true
  }
}

function SideBarItem({ title, icon, link, user }: SideBarItemInterface) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [shouldShowDot, setShouldShowDot] = useState(false)

  useEffect(()=>{
    async function show (){
      setShouldShowDot(await shouldShowdot(link, user) as boolean)
    }
    show()
  })

  useEffect(() => {
    setActive(!!window.location.href.includes(link));
  }, [window.location.href]);

  function action() {
    router.push(link);
  }

  return (
    <div
      className={`${styles.sidebaritem} ${active && styles.sidebaritemactive}`}
      onClick={action}
    >
      {shouldShowDot && <div className={styles.notificationdot} />}
      <div className={styles.sidebaritemicon}>
        <i className="material-icons-outlined">{icon}</i>
      </div>
      <div className={styles.sidebaritemtitle}>{title}</div>
    </div>
  );
}

function SideBar({ user }: SideBarProps) {
  const userData = user.user_metadata

  return (
    <div className={styles.sidebarmain}>
      {userData.isAdmin ? items.map((item, index) => {
        return (
          <SideBarItem
            title={item.title}
            icon={item.icon}
            link={item.link}
            adminItem={item.adminItem}
            user={user}
          />
        );
      }) : 
      items.filter((item)=>!item.adminItem).map((item, index) => {
        return (
          <SideBarItem
            title={item.title}
            icon={item.icon}
            link={item.link}
            adminItem={item.adminItem}
            user={user}
          />
        );
      })
    
    }
    </div>
  );
}

export default SideBar;
