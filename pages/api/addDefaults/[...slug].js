import { Client } from '@notionhq/client';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

export default function (req, res) {
  const { slug } = req.query
  const [month, year] = slug;
  
  const notion = new Client({auth: process.env.notionSecret});
  const resumenDB = 'b0bfc4bf3b3243e7bbb0710955860f3c';
  const transDB = '3f05558d142644a29acb475d47f68494';

  const defaultCCData = [{
    Cuenta: '8a56e0a94bad47a48680aebd55ec9029',
    Descripción: 'Pago de Tarjeta de ' + moment(`${year}-${month}-01`).format('MMMM'),
    Categoria: 'Tarjeta de Credito',
    endDate: 9
  }, {
    Cuenta: '4fea622c01254df69b696ae75f97f6d5',
    Descripción: 'Pago de Tarjeta de ' + moment(`${year}-${month}-01`).format('MMMM'),
    Categoria: 'Tarjeta de Credito',
    endDate: 9
  }, {
    Cuenta: 'd7aaf12ff5ca4459bb8a6e365324ae02',
    Descripción: 'Pago de Tarjeta de ' + moment(`${year}-${month}-01`).format('MMMM'),
    Categoria: 'Tarjeta de Credito',
    endDate: 15
  }, {
    Cuenta: 'db745cd910eb4beba09045842b06b5b0',
    Descripción: 'Pago de Tarjeta de ' + moment(`${year}-${month}-01`).format('MMMM'),
    Categoria: 'Tarjeta de Credito',
    endDate: 18
  }];

  const defaultFixData = [{
    Descripción: 'ASI Network',
    Categoria: ['Fijo', 'Internet'],
    Fecha: moment(`${year}-${month}-01`).format('YYYY-MM-DD'),
  }, {
    Descripción: 'Tigo Internet',
    Categoria: ['Fijo', 'Internet'],
    Fecha: moment(`${year}-${month}-01`).format('YYYY-MM-DD'),
  }, {
    Descripción: 'Claro Mireya',
    Cuenta: '49e9ad9d23f94605bc955098fcc5a24d',
    Categoria: ['Fijo', 'Celular'],
    Fecha: moment(`${year}-${month}-01`).format('YYYY-MM-DD'),
  }, {
    Descripción: 'Oficina',
    Cuenta: '67b23808d82b4269951c5ed6ba6e11b0',
    Categoria: ['Fijo', 'Renta'],
    Fecha: moment(`${year}-${month}-01`).format('YYYY-MM-DD'),
    'Monto USD': 200
  }, {
    Descripción: 'Pago ' + moment(`${year}-${month}-05`).format('MMMM') + ' del Terreno',
    Categoria: ['Fijo', 'Deuda'],
    Cuenta: '49d8f70129b1496bbae760a16c537d81',
    Fecha: moment(`${year}-${month}-05`).format('YYYY-MM-DD'),
    'Monto USD': 1000
  }]

  const callMap = defaultCCData.map(d => {
    return notion.pages.create({
      parent: {
        database_id: resumenDB
      },
      properties: {
        Descripción: {
          title: [{
            text: {
              content: d.Descripción
            }
          }]
        },
        Cuenta: {
          relation: [{
            id: d.Cuenta
          }]
        },
        'Fecha de Corte': {
          date: {
            start: moment(`${year}-${month}-${d.endDate}`).subtract(1, 'M').add(1, 'day').format('YYYY-MM-DD'),
            end: moment(`${year}-${month}-${d.endDate}`).format('YYYY-MM-DD'),
          }
        },
        Categoria: {
          multi_select: [{
            name: d.Categoria
          }]
        }
      }
    });
  }, defaultFixData.map(d => {
    let extraProperties = {
      Categoria: {
        multi_select: d.Categoria.map(c => ({
          name: c
        }))
      }
    };

    if (d.Cuenta) {
      extraProperties.Cuenta = {
        relation: [{
          id: d.Cuenta
        }]
      }
    }

    if (d['Monto USD']) {
      extraProperties['Monto USD'] = {
        number: d['Monto USD']
      }
    }

    if (d['Monto HNL']) {
      extraProperties['Monto HNL'] = {
        number: d['Monto HNL']
      }
    }
    return notion.pages.create({
      parent: {
        database_id: transDB
      },
      properties: {
        Descripción: {
          title: [{
            text: {
              content: d.Descripción
            }
          }]
        },
        'Fecha': {
          date: {
            start: d.Fecha
          }
        },
        ...extraProperties
      }
    });
  }));

  Promise.all(callMap).then(() => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=180000');
    res.end(JSON.stringify({succeed: true}));
  }).catch((err) => {
    res.json(err);
    res.status(405).end();
  });
};