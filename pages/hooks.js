import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

function hooks() {
  const currentMonth = moment().format('MMMM');
  const nextMonth = moment().add(1, 'M').format('MMMM');

  const onAddDefault = () => {
    fetch('/api/addMonthly').then(res => {
      console.log(res);
    });
  };

  return (
    <main>
      <div className='grid gap-y-3 py-3'>
        <button onClick={onAddDefault} className='bg-red rounded border border-red-dark text-red-dark py-2 px-4 hover:bg-red-dark hover:text-red'>
          Añadir Pagos Mensuales de {currentMonth}
        </button>
        <button onClick={onAddDefault} className='bg-red rounded border border-red-dark text-red-dark py-2 px-4 hover:bg-red-dark hover:text-red'>
          Añadir Pagos Mensuales de {nextMonth}
        </button>
        <button onClick={onAddDefault} className='bg-red rounded border border-red-dark text-red-dark py-2 px-4 hover:bg-red-dark hover:text-red'>
          Get Credit Card Amounts
        </button>
      </div>
    </main>
  );
};

export default hooks;