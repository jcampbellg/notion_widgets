import { Client } from '@notionhq/client';
import moment from 'moment';
import https from 'https';
import numeral from 'numeral';
import csv from 'csv-parser';
import 'moment/locale/es';

moment.locale('es');

export default async function handler(req, res) {
  const notion = new Client({auth: process.env.notionSecret});
  const resumenDB = 'b0bfc4bf3b3243e7bbb0710955860f3c';
  const transDB = '3f05558d142644a29acb475d47f68494';

	const query = await notion.databases.query({
		database_id: resumenDB,
		filter: {
			property: 'Extraer',
			checkbox: {
				equals: true
			}
		}
	});

  const csvFiles = query.results.filter(r => r.properties['Estado de Cuenta'].files.length > 0).map(r => {
    return {
      pageId: r.id,
      accoundId: r.properties.Cuenta.relation[0].id,
      csvUrl: r.properties['Estado de Cuenta'].files[0].file.url
    };
  });

  const csvInfo = await Promise.all(csvFiles.map(async d => {
    const info = await readCSV(d.csvUrl);

    await notion.pages.update({
      page_id: d.pageId,
      properties: {
        'Fecha de Corte': {
          date: {
            start: info.cycleDate
          }
        },
        'Fecha de Pago': {
          date: {
            start: info.dueDate
          }
        },
        'Extraer': {
          checkbox: false
        },
        'Monto HNL': {
          number: info.balance.hnl
        },
        'Monto USD': {
          number: info.balance.usd
        }
      }
    });

    for (let i = 0; i < info.transactions.length; i++) {
      const t = info.transactions[i];
      await notion.pages.create({
        parent: {
          database_id: transDB
        },
        properties: {
          Descripción: {
            title: [{
              text: {
                content: t.description
              }
            }]
          },
          Cuenta: {
            relation: [{
              id: d.accoundId
            }]
          },
          'Estado de Cuenta': {
            relation: [{
              id: d.pageId
            }]
          },
          'Fecha': {
            date: {
              start: t.date
            }
          },
          'Monto HNL': {
            number: t.amount.hnl
          },
          'Monto USD': {
            number: t.amount.usd
          }
        }
      });
    }

    return {
      ...d,
      ...info
    }
  }));

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(csvInfo);
};

const readCSV = (url) => {
  let results = [];
  return new Promise((resolve, reject) => {
    const req = https.get(url, (stream) => {
      stream.pipe(csv({headers: false})).on('data', (row) => {
        results.push(row);
      }).on('end', () => {
        const isBac = results[0][0] === 'Pro000000000000duct';
        const isFicohsa = results[0][0] === 'Titular';

        if (isBac) {
          resolve(processBAC(results));
        } else if (isFicohsa) {
          resolve(processFicohsa(results));
        }
      });
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
};

const processBAC = (array) => {
  const s = {
    product: array[1][0].trim(),
    bank: 'BAC Credomatic',
    owner: array[1][1].trim(),
    cycleDate: moment(array[1][2], 'DD/MM/YYYY').format('YYYY-MM-DD'),
    dueDate: moment(array[1][3], 'DD/MM/YYYY').format('YYYY-MM-DD'),
    bankStatement: moment(array[1][2], 'DD/MM/YYYY').format('MMMM/YYYY'),
    balance: {
      hnl: Math.abs(numeral(array[1][7]).value()),
      usd: Math.abs(numeral(array[1][8]).value()),
    },
    transactions: array.slice(3, -8).map(t => {
      return {
        date: (t[0] && moment(t[0], 'DD/MM/YYYY').format('YYYY-MM-DD')) || '',
        description: t[1].replace(/\s{2,}/g, ' ').trim(),
        amount: {
          hnl: Math.abs(numeral(t[2]).value()),
          usd: Math.abs(numeral(t[3]).value())
        },
      };
    }).filter(t => (t.amount.hnl || t.amount.usd) && t.date)
  };
  
  return {
    balance: s.balance,
    cycleDate: s.cycleDate,
    dueDate: s.dueDate,
    transactions: s.transactions
  };
};

const processFicohsa = (array) => {
  const s = {
    product: array[1][1].trim(),
    bank: 'Ficohsa',
    owner: array[1][0].trim(),
    cycleDate: moment(array[1][3], 'DD/MM/YYYY').format('YYYY-MM-DD'),
    dueDate: moment(array[1][4], 'DD/MM/YYYY').format('YYYY-MM-DD'),
    bankStatement: moment(array[1][3], 'DD/MM/YYYY').format('MMMM/YYYY'),
    balance: {
      hnl: Math.abs(numeral(array[4][3]).value()),
      usd: Math.abs(numeral(array[4][2]).value()),
    },
    transactions: array.slice(11).map(t => {
      return {
        date: (t[0] && moment(t[0], 'DD/MM/YYYY').format('YYYY-MM-DD')) || '',
        description: t[2].replace(/\s{2,}/g, ' ').trim(),
        amount: {
          hnl: Math.abs(numeral(t[3]).value()),
          usd: Math.abs(numeral(t[4]).value())
        },
      };
    }).filter(t => (t.amount.hnl || t.amount.usd) && t.date)
  };
  
  return {
    balance: s.balance,
    cycleDate: s.cycleDate,
    dueDate: s.dueDate,
    transactions: s.transactions
  };
};