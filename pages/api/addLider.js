import { Client } from '@notionhq/client';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

export default async function handler(req, res) {
  const data = req.body;
  const notion = new Client({auth: process.env.notionSecret});
  const lideresDB = '2186a7f252314640930c75abd019fb5b'

  await notion.pages.create({
    parent: {
      database_id: lideresDB
    },
    properties: {
      Nombre: {
        title: [{
          text: {
            content: data.nombre
          }
        }]
      },
      Correo: {
        email: data.correo
      },
      Telefono: {
        phone_number: data.telefono
      },
      Tribu: {
        relation: [{
          id: data.tribu
        }]
      }
    }
  });

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({succeed: true});
};