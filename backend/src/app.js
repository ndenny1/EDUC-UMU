const config = require('./config/index');
const dotenv = require('dotenv');
const log = require('npmlog');
const morgan = require('morgan');
const session = require('express-session');
const express = require('express');
const passport = require('passport');
dotenv.config();

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const OidcStrategy = require('passport-openidconnect').Strategy;

const utils = require('./components/utils');
const authRouter = require('./routes/auth');
const mainRouter = require('./routes/api');

const apiRouter = express.Router();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(morgan(config.get('server:morganFormat')));

app.use(session({
  secret: config.get('oidc:clientSecret'),
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


log.level = config.get('server:logLevel');
log.addLevel('debug', 1500, {
  fg: 'cyan'
});

log.debug('Config', utils.prettyStringify(config));


passport.serializeUser((user, next) => next(null, user));
passport.deserializeUser((obj, next) => next(null, obj));

// GetOK Base API Directory
apiRouter.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [
      '/api/auth',
      '/api/main'
    ],
    versions: [
      1
    ]
  });
});

app.use(/(\/getok)?(\/api)?/, apiRouter);

apiRouter.use('/auth', authRouter);
apiRouter.use('/main', mainRouter);

app.use((err, _req, res, next) => {
  log.error(err.stack);
  res.status(500).json({
    status: 500,
    message: 'Internal Server Error: ' + err.stack.split('\n', 1)[0]
  });
  next();
});

// Handle 404
/*
app.use((_req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Page Not Found'
  });
});
*/

// Prevent unhandled errors from crashing application
process.on('unhandledRejection', err => {
  log.error(err.stack);
});
//The following variable can be used to test connections to the database (probably shouldn't test queries though)
module.exports = app;