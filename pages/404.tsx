import Layout from '../components/layout'
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';

export default function Custom404() {
    return (
        <Layout>
          <Head>
            <title>404</title>
          </Head>
          <h1 style={{textAlign:'center'}} className={utilStyles.headingXl}>Page Not Found <br/> 😔</h1>
        </Layout>
    );
}
