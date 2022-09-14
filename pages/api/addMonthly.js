import { Client } from '@notionhq/client';

export default function handler(req, res) {
  const notion = new Client({auth: process.env.notionSecret});
  const databaseId = process.env.notionDbId;

  const accountId = '8a56e0a94bad47a48680aebd55ec9029';
  const description = 'Hola Mi amor';
  const date = '2022-08-01';
  const amount = {
    hnl: 1000,
    usd: 1000
  };

  notion.pages.create({
    parent: {
      database_id: databaseId
    },
    properties: {
      Descripción: {
        title: [{
          text: {
            content: description
          }
        }]
      },
      Cuenta: {
        relation: [{
          id: accountId
        }]
      },
      Fecha: {
        date: {
          start: date
        }
      },
      'Monto HNL': {
        number: amount.hnl
      },
      'Monto USD': {
        number: amount.usd
      },
      Categoria: {
        multi_select: [{
          name: 'Misc'
        }]
      }
    }
  }).then((response) => {
    res.status(200).json(response);
  }).catch(err => res.status(200).json(err));
};
