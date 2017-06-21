import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as path from 'path';
// import * as responseTime from 'response-time';
import config from './config';
import routes from './routes';

const app = express();

// set up the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set up the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up the cookie parser
app.use(cookieParser());

// serve static content trhough express
// app.use(express.static(path.join(__dirname, 'static')));

// set development tools
// app.use(responseTime);

app.use('/', routes);

// display error
app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.render('error', {
    message: error.message,
    error
  });
});

// serve the request
export default functions.https.onRequest(app);
