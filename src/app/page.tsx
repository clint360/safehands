import Image from 'next/image'
import styles from './page.module.css'
import ReportingForm from '@/components/organisms/ReportingForm'
import SideBar from '@/components/organisms/SideBar'

export default function Home() {
  return (
    <main className={styles.main}>
      <SideBar />
      <ReportingForm />
    </main>
  )
}
