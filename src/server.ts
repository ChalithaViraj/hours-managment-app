/// <reference path="global.d.ts" />
const cors = require('cors');
import * as express from 'express';
import * as fs from 'fs';
import * as https from 'https';
import * as morgan from 'morgan';
import * as routes from './routes';
import {urlencoded} from 'body-parser';
import {logRequest} from './middleware/request-logger';
import {handleError} from './middleware/error-handler';
import {Authentication} from './middleware/authentication';
import {AppLogger} from './common/logging';
import databaseSetup from "./startup/database";
import passportStartup from "./startup/passport";
// import * as cors from 'cors';

require('dotenv').config();




// console.clear();

const production = process.env.NODE_ENV === "production";
const PORT: any = process.env.PORT || 4000;
// noinspection JSIgnoredPromiseFromCall
databaseSetup();

const app = express();
app.use(logRequest);
app.use(express.json());
app.use(urlencoded({extended: true}));


// noinspection JSIgnoredPromiseFromCall
passportStartup(app);
app.use(morgan('combined'));

if (!production) {
    app.use(cors({
        optionsSuccessStatus: 200,
        origin: '*',
        allowedHeaders: ['Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Authorization, X-Requested-With']
    }));
}

app.use('/api/auth', Authentication.verifyToken);
app.use('/api/auth/admin', Authentication.verifyAdmin);

if (production) {
    https.createServer({
        key: fs.readFileSync(process.env.SERVER_KEY_PATH || 'server.key'),
        cert: fs.readFileSync(process.env.SERVER_CERT_PATH || 'server.cert')
    }, app).listen(PORT, () => {
        AppLogger.info('--> HTTPS Server successfully started at port ' + PORT);
    });
} else {
    app.listen(PORT, () => {
        AppLogger.info('--> Server successfully started at port ' + PORT);
    });
}
routes.initRoutes(app);
app.use(handleError);
app.use(cors());
export default app;
