import moment from 'moment';

export default function Home() {
  const today = moment().format('MMMM Do YYYY');
  return (
    <main>
      <h1 className='text-lg'>
        Welcome <span className='font-bold'>Juan Carlos!</span>
      </h1>
      <h1 className='text-lg'>
        Today is <span className='font-bold'>{today}</span>
      </h1>
    </main>
  );
};