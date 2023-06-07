import Layout from '../components/layout'
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';

export default function Custom404() {
    return (
        <Layout>
          <Head>
            <title>404</title>
          </Head>
          <h1 className={utilStyles.headingXl}>404 - You're lost rip</h1>
        </Layout>
    );
}
