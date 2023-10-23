import React from 'react';
import styles from './NavBar.module.scss'
import Logo from '../atoms/Logo';

function NavBar() {
  return (
    <div className={styles.navbarmain}>
     <div className={styles.navlogosection}>
        <Logo />
     </div>
     <div className={styles.detailssection}>
        <div className={styles.notificationicon}>
            <div className={styles.notificationdot} />
          🔔
        </div>
        <div className={styles.accountcircle}>
          O
        </div>
        <div className={styles.downarrow}>
         ⬇️
        </div>
     </div>
    </div>
  )
}

export default NavBar