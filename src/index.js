// express file

import express from 'express';
import helmet from 'helmet';
import i18n from 'i18n';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';

import config from '../config';
import * as middleware from './middleware';

const app = express();

const { availableLocals, projectRoot, defaultLanguage } = config;
const { notFound, headerFunction, errorHandler, unauthorizedError, extendedRequestMiddleware } = middleware;

i18n.configure({
  locales: availableLocals,
  directory: path.join(projectRoot, 'src', 'locals'),
  defaultLocale: defaultLanguage,
});

app.use(
  '*',
  cors({
    origin: true,
    methods: ['OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('showStackError', true);

app.all('*', headerFunction);
app.use(i18n.init);
app.use(morgan('tiny'));
app.use(helmet());
app.use(extendedRequestMiddleware);

app.route('/').get(async (req, res, next) =>
  res.status(200).json({
    msg: 'Success',
    status: 200,
    data: {
      message: 'This is test route to check REST API',
    },
  })
);
app.route('/ping').get(async (req, res, next) => {
  try {
    return res.status(200).json({
      msg: 'Success',
      status: 200,
      data: 'Pong',
    });
  } catch (e) {
    console.error(e.message);
    next(e);
  }
});

app.use(unauthorizedError);
app.use(errorHandler);
app.use(notFound);

export default app;
