import '../styles/styles.scss'
import Layout from './layout'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Attend | TEDxColumbia Lake Youth</title>
        <meta name="description" content="Registration portal for TEDxColumbia Lake Youth"></meta>
        <link rel="icon" href="/tedx.png" />
        <meta name="viewport" content="initial-scale=1"></meta>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}