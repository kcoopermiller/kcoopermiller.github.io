import Layout from '../../components/layout'
import { getAllPubIds, getPubData } from '../../lib/pubs'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Publication({
  pubData
}: {
  pubData: {
    title: string
    date: string
    contentHtml: string
    authors: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{pubData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{pubData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={pubData.date} />
          <p>{pubData.authors}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: pubData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPubIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pubData = await getPubData(params?.id as string)
  return {
    props: {
      pubData
    }
  }
}