import '../styles/globals.css';
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>JC&apos;s Life Notion Widgets</title>
        <meta name="description" content="Notion widgets for me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
};

export default MyApp;