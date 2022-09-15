import { Client } from '@notionhq/client';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

export default function (req, res) {
  const notion = new Client({auth: process.env.notionSecret});
  const resumenDB = 'b0bfc4bf3b3243e7bbb0710955860f3c';
  const transDB = '3f05558d142644a29acb475d47f68494';

  const callMap = [notion.databases.query({
    database_id: resumenDB,
    filter: {
      property: 'Pagado',
      checkbox: {
        equals: true
      }
    }
  })]

  Promise.all(callMap).then((response) => {
    const updateCallMap = response[0].results.map(r => {
      notion.pages.update({
        page_id: r.id,
        properties: {
          Esconder: {
            checkbox: true
          }
        }
      });
    });

    Promise.all(updateCallMap).then(() => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'max-age=180000');
      res.end(JSON.stringify({succeed: true}));
    }).catch((err) => {
      res.json(err);
      res.status(405).end();
    });
  }).catch((err) => {
    res.json(err);
    res.status(405).end();
  });
};