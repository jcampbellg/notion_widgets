import { useRef, useState } from 'react';

function Lideres() {
  const [done, setDone] = useState(0);
  const nombre = useRef(null);
  const correo = useRef(null);
  const telefono = useRef(null);
  const tribu = useRef(null);

  const onSubmit = () => {
    const lider={
      nombre: nombre.current.value,
      correo: correo.current.value,
      telefono: telefono.current.value,
      tribu: tribu.current.value
    };

    fetch('/api/addLider', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lider),
    }).then(() => {
      setDone(1);
    }).catch(err => {
      console.error(err);
      setDone(-1);
    });
  };

  if (done === -1) {
    return (
      <main>
        <div className='container-sm mx-auto max-w-screen-sm'>
          <div className='grid py-3 px-3'>
            <h1 className='text-red-dark font-bold text-lg text-center'>!Ops! Paso algo malo, intenta otra vez</h1>
          </div>
        </div>
      </main>
    )
  }

  if (done === 1) {
    return (
      <main>
        <div className='container-sm mx-auto max-w-screen-sm'>
          <div className='grid py-3 px-3'>
            <h1 className='text-green-dark font-bold text-lg text-center'>!Listo!</h1>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className='container-sm mx-auto max-w-screen-sm'>
        <div className='grid grid-cols-3 gap-y-3 py-3 gap-x-2 px-3 text-dark'>
          <label className='text-right font-bold'>Nombre:</label>
          <input
            ref={nombre}
            className='border border-dark rounded px-2 col-span-2'
            placeholder='Nombre' type='text'
          />
          <label className='text-right font-bold'>Correo Electronico:</label>
          <input
            ref={correo}
            className='border border-dark rounded px-2 col-span-2'
            placeholder='Correo Electronico' type='email'
          />
          <label className='text-right font-bold'>Telefono:</label>
          <input
            ref={telefono}
            className='border border-dark rounded px-2 col-span-2'
            placeholder='Telefono' type='tel'
          />
          <label className='text-right font-bold'>Tribu:</label>
          <select ref={tribu} className='border border-dark rounded px-2 col-span-2'>
            <option value='740c37b076d94409a00608717c70201a'>Casa Maya II</option>
            <option value='486cf76807124b3eb02602bfef8e495a'>Casa Maya IV</option>
            <option value='e05a8b79d1a7418da44b9656e9172360'>Costa del Sol</option>
            <option value='7fb0f54beb054072ab023dda5c8460a7'>Potosi/Universidad</option>
            <option value='b3715c82eab94d4d9a946583fa972d96'>Terreno PIER</option>
            <option value='863dafdee0a6428cabe1f611c651ab8c'>Villa Matilda</option>
            <option value='80319c402bff411eb5fba30c437e2eec'>Villa Monaco</option>
            <option value='f1e47a83942f418685799d83fdb5afe0'>Villas del Sol</option>
            <option value='e6567c9c59964dbbac73e8e18e499de4'>Villas Mackay</option>
            <option value='f29fcc7e92994ff8ac02bb8eeafb702b'>Zeron</option>
            <option value='9ce06aa3b0d845d8ab3aa3560fc0da52'>Zorzales</option>
          </select>
          <button onClick={onSubmit} className='border border-green-dark rounded text-green-dark hover:bg-green-dark hover:text-white col-start-2'>
            Enviar Datos
          </button>
        </div>
      </div>
    </main>
  );
};

export default Lideres;