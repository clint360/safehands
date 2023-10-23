import { NextPage } from 'next';
import React from 'react';
import styles from './AppWrapper.module.scss'
import NavBar from '@/components/organisms/NavBar';
import SideBar from '@/components/organisms/SideBar';



const AppWrapper = (Page: NextPage, title: string) : NextPage => {
    function AppPage() {
  return (
    <div className={styles.mainApp}>
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