import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPubsData } from '../lib/pubs'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import Image from 'next/image'

export default function Home({
  allPubsData
}: {
  allPubsData: {
    date: string
    title: string
    id: string
    authors: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* <section className={utilStyles.headingMd}>
        <p style={{textAlign: 'center'}}>Student at UIUC</p>
      </section> */}
      <section>
        <h2 className={utilStyles.headingLg}>Education</h2>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Image
            src="/images/illini.png"
            height={88.8}
            width={61.6}
            alt="UIUC Logo"
          />
          <div style={{marginLeft: '20px'}}>
            <h3 className={utilStyles.headingMd}>University of Illinois, Urbana-Champaign</h3>
            <p className={utilStyles.lightText}>Computer Science + Linguistics, B.S.</p>
            <p className={utilStyles.lightText}>August 2020 - December 2023</p>
          </div>
        </div>
      </section>
      <section className={utilStyles.sectionPadding}>
        <h2 className={utilStyles.headingLg}>Publications</h2>  
        <ul className={utilStyles.list}>
          {allPubsData.map(({ id, date, title, authors }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link className={utilStyles.headingMd} href={`/pubs/${id}`}>{title}</Link>
              <p className={utilStyles.lightText}>
                <Date dateString={date} />
              </p>
              <p className={utilStyles.lightText}>{authors}</p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPubsData = getSortedPubsData()
  return {
    props: {
      allPubsData
    }
  }
}