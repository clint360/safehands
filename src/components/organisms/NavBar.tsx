import React from 'react';
import styles from './NavBar.module.scss'
import Logo from '../atoms/Logo';
import sampleuserpic from './../../assets/images/face21.jpg'
import Image from 'next/image';

function NavBar() {
  return (
    <div className={styles.navbarmain}>
     <div className={styles.navlogosection}>
        <Logo />
     </div>
     <div className={styles.detailssection}>
        <div className={styles.notificationicon}>
            <div className={styles.notificationdot} />
            <i className="material-icons-outlined">notifications</i>
        </div>
        <div className={styles.accountcircle}>
          <Image src={sampleuserpic} alt='' />
        </div>
        <div className={styles.downarrow}>
        <i className="material-icons-outlined">keyboard_arrow_down</i>
        </div>
     </div>
    </div>
  )
}

export default NavBar