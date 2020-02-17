import * as express from 'express';
import user from './user/userController';
import main from './main/mainController';
import * as bodyParser from 'body-parser';

class App {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use('/', express.static(__dirname));
        this.app.use(express.static(__dirname + '/template'));
        this.app.use(express.static(__dirname + '/reports'));

        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(
            bodyParser.urlencoded({
                limit: '50mb',
                extended: true,
                parameterLimit: 50000
            })
        );
        const setTZ = require('set-tz')
        setTZ('UTC');
        this.app.use(function(req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader(
                'Access-Control-Allow-Methods',
                'GET, POST, OPTIONS, PUT, PATCH, DELETE'
            );

            // Request headers you wish to allow
            res.setHeader(
                'Access-Control-Allow-Headers',
                'X-Requested-With,content-type,x-access-token'
            );
            res.setHeader("Content-Type", "application/json");

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });
        this.app.use(user);
        this.app.use(main);

    }
}

export default new App().app;
