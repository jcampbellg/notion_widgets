import moment from 'moment'
import Head from 'next/head'

export default function Home() {
  const today = moment().format('MMMM Do YYYY');
  return (
    <div>
      <Head>
        <title>JC's Life Notion Widgets</title>
        <meta name="description" content="Notion widgets for me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className='text-lg'>
          Welcome <span className='font-bold'>Juan Carlos!</span>
        </h1>
        <h1 className='text-lg'>
          Today is <span className='font-bold'>{today}</span>
        </h1>
      </main>
    </div>
  )
}
