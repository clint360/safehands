import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styles from './AppWrapper.module.scss'
import NavBar from '@/components/organisms/NavBar';
import SideBar from '@/components/organisms/SideBar';

let viewHeight : string

if (typeof window !== "undefined") {
    viewHeight = `calc(${window.innerHeight}px - 10px)`
  } else {
    viewHeight = `calc(100vh - 10px)`
  }

const AppWrapper = (Page: NextPage, title: string) : NextPage => {
  async function AppPage() {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      redirect('/auth/login');
    } 

  return (
    <div className={styles.mainApp} style={{height: viewHeight}}>
        <NavBar />
        <div className={styles.bodySection}>
            <div>
                <SideBar />
            </div>
            <div className={styles.page}>
                <h1 className={styles.headertitle}>{title}</h1>
                <Page />
            </div>
        </div>
    </div>
  )
    }
    return AppPage;
}

export default AppWrapper