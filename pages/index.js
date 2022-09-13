import Head from 'next/head'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>JC's Life Notion Widgets</title>
        <meta name="description" content="Notion widgets for me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome Juan Carlos!
        </h1>
      </main>
    </div>
  )
}
