import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Footer from './footer'
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'
import { useState } from 'react'

const name = 'Cooper Miller'
export const siteTitle = name

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  const [showEmail, setShowEmail] = useState(false);
  const toggleEmail = () => setShowEmail(!showEmail);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Cooper Miller's personal website"
          />
          <meta name="og:title" content={siteTitle} />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
              <div className={styles.socials}>
                <button onClick={toggleEmail}><FaEnvelope /></button>
                <a href="https://www.linkedin.com/in/cooper-miller/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                <a href="https://github.com/kcoopermiller" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              </div>
              {showEmail && (
                  <div className={styles.emailContainer}>
                    <p style={{marginRight: '20px'}}>your-email [at] example [dot] com</p>
                    <Link href="/pubkey.txt">PGP Key</Link>
                  </div>
              )}
            </>
          ) : (
            <>
              <h2 className={utilStyles.headingLg}>
                <Link href="/" className={utilStyles.colorInherit}>
                  {name}
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}