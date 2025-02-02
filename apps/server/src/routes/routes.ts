import { Application, Router } from 'express';
import { HTTPSTATUS } from '@workspace/types/enums/common';
import { cb, cbError } from '../common/handler/handler';
import { AppConfig } from '../config/app.config';
import { ERRORS } from '../common/constants';

export function setRoutes(app: Application) {
  const apiRouter = Router();

  app.use('/health', (req, res) => {
    return cb(HTTPSTATUS.OK, res, {
      status: 'OK',
      version: AppConfig.APP_VERSION,
    });
  });

  app.use('/api', apiRouter);

  app.use((req,res)=>{
    return cbError(res, HTTPSTATUS.NOT_FOUND, ERRORS.API_NOT_FOUND, { endPoint: req.path });

  })
}
