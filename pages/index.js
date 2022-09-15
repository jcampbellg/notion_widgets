import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

export default function Home() {
  const today = moment().format('MMMM D YYYY');
  return (
    <main>
      <h1 className='text-lg'>
        ¡Hola <span className='font-bold'>Juan Carlos!</span>
      </h1>
      <h1 className='text-lg'>
        Hoy is <span className='font-bold'>{today}</span>
      </h1>
    </main>
  );
};