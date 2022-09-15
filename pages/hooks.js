import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

function hooks() {
  const today = moment();
  const nextToday =moment().add(1, 'M');

  const currentMonth = {
    format: today.format('MMMM'),
    month: today.format('MM'),
    year: today.format('YYYY')
  };
  const nextMonth = {
    format:nextToday.format('MMMM'),
    month: nextToday.format('MM'),
    year: nextToday.format('YYYY')
  };

  const onAddDefault = (m, y) => {
    fetch(`/api/addDefaults/${m}/${y}`).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    });
  };

  const css = 'bg-red rounded border border-red-dark text-red-dark py-2 px-4 hover:bg-red-dark hover:text-red capitalize';

  return (
    <main>
      <div className='grid gap-y-3 py-3'>
        <button onClick={() => onAddDefault(currentMonth.month, currentMonth.year)} className={css}>
          Añadir Pagos Mensuales de {currentMonth.format}
        </button>
        <button onClick={() => onAddDefault(nextMonth.month, nextMonth.year)} className={css}>
          Añadir Pagos Mensuales de {nextMonth.format}
        </button>
      </div>
    </main>
  );
};

export default hooks;