import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPubsData } from '../lib/pubs'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

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
      <section className={utilStyles.headingMd}>
        <p style={{textAlign: 'center'}}>Student at UIUC</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Publications</h2>
        <ul className={utilStyles.list}>
          {allPubsData.map(({ id, date, title, authors }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/pubs/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
              <br />
              <small className={utilStyles.lightText}>{authors}</small>
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