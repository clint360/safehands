import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import styles from './AppWrapper.module.scss'
import NavBar from '@/components/organisms/NavBar';
import SideBar from '@/components/organisms/SideBar';
import { AppNextPage } from '@/domains/Page';

let viewHeight : string

if (typeof window !== "undefined") {
    viewHeight = `calc(${window.innerHeight}px - 10px)`
  } else {
    viewHeight = `calc(100vh - 10px)`
  }

const AppWrapper = (Page: AppNextPage, title: string) : AppNextPage => {
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
        <NavBar user={user}/>
        <div className={styles.bodySection}>
            <div>
                <SideBar user={user} />
            </div>
            <div className={styles.page}>
                <h1 className={styles.headertitle}>{title}</h1>
                <Page user={user} />
            </div>
        </div>
    </div>
  )
    }
    return AppPage;
}

export default AppWrapper