import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

export default function Home() {
  const todayM = moment()
  const today = todayM.format('MMMM D YYYY')
  const toWedding = moment('12-16-2023 6:00 PM', 'MM-DD-YYYY hh:mm A').diff(todayM, 'days')
  return (
    <main>
      <h1 className='text-lg'>
        ¡Hola <span className='font-bold'>Juan Carlos!</span>
      </h1>
      <h1 className='text-lg'>
        Hoy es <span className='font-bold'>{today}</span>
      </h1>
      <h1 className='text-lg'>
        Falta <span className='font-bold'>{toWedding} días</span> para la boda
      </h1>
    </main>
  );
};