import * as fs from 'fs';
import * as soap from 'soap';
import * as express from 'express';
import * as bodyParser from 'body-parser';

const app: express.Application = express();
app.use(bodyParser.raw({ type: () => true, limit: '5mb' }));
const xml = fs.readFileSync('service.wsdl', 'utf8');

const service = {
	HelloService: {
		Hello_PortType: {
			// This is how to define an asynchronous function with a Promise.
			sayHello: function (args, callback) {
				console.log(args);
				// do some work
				callback({
					greeting: 'hello ' + args.firstName,
				});
			},
		},
	},
};

app.listen(8001, () => {
	soap.listen(app, '/wsdl', service, xml, () => {
		console.log('server initialized');
	});
});
