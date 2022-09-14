function AddMonthly() {
  const onClick = () => {
    fetch('/api/addMonthly').then(res => {
      console.log(res);
    });
  };

  return (
    <main>
      <button onClick={onClick} className='bg-red rounded border border-red-dark text-red-dark py-2 px-4'>
        Add Default Monthly Payments
      </button>
    </main>
  );
};

export default AddMonthly;