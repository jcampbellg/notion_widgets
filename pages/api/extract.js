import { Client } from '@notionhq/client';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

export default function (req, res) {
  const { slug } = req.query
  
  const notion = new Client({auth: process.env.notionSecret});
  const resumenDB = 'b0bfc4bf3b3243e7bbb0710955860f3c';
  const transDB = '3f05558d142644a29acb475d47f68494';

	notion.databases.query({
		database_id: resumenDB,
		filter: {
			property: 'Pagado',
			checkbox: {
				equals: false
			}
		}
	}).then(response => {
		const CSVFiles = response.results.filter(r => r.properties['Estado de Cuenta'].files.length > 0).map(r => {
			return {
				pageId: r.id,
				csvUrl: r.properties['Estado de Cuenta'].files[0].file.url
			};
		});

		res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'max-age=180000');
    res.end(JSON.stringify(response.results));
	}).catch(err => {
		res.json(err);
		res.status(405).end();
	})
};