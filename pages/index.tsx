import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { Footer, Navbar, Services, Transactions, Welcome } from '@/src/components'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className='min-h-screen'>
        <div className='gradient-bg-welcome'>
          <Navbar />
          <Welcome />
        </div>
        {/* <Services /> */}
        <Transactions />
        <Footer />
      </div>
    </>
  )
}
