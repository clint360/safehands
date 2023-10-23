import Image from 'next/image'
import styles from './page.module.css'
import ReportingForm from '@/components/organisms/ReportingForm'
import SideBar from '@/components/organisms/SideBar'
import NavBar from '@/components/organisms/NavBar'

export default function Home() {
  return (
    <main className={styles.main}>
      <NavBar />
      <SideBar />
      <ReportingForm />
    </main>
  )
}
