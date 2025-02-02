import bodyParser from 'body-parser';
import { Application } from 'express';
import * as rfs from 'rotating-file-stream';
import { AppConfig } from '../config/app.config';
import { ENVIRONMENTS } from '../common/constants/environment.constants';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import { setRoutes } from '../routes/routes';

export class ExpressLoader {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  loadMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    const accessLogStream = rfs.createStream(`logs/access.log`, {
      interval: '1d',
      compress: 'gzip',
    });

    if (AppConfig.APP_ENV == ENVIRONMENTS.LOCAL) {
      this.app.use(morgan('tiny'));
    } else {
      this.app.use(morgan('tiny', { stream: accessLogStream }));
    }
    this.app.use(
      cors({
        origin: AppConfig.APP_ALLOWED_ORIGINS,
        credentials: true,
      }),
    );
    this.app.use(passport.initialize());
  }

  loadRoutes() {
    setRoutes(this.app);
  }

  loadAll() {
    this.loadMiddleware();
    this.loadRoutes();
  }
}
