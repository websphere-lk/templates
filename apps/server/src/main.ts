import { AppConfig } from './config/app.config';
import { ExpressLoader } from './loaders';
import { HttpServer } from './servers/http.server';

class App {
  private httpServer: HttpServer;

  constructor() {
    this.httpServer = new HttpServer();
    this.loadLoaders();
  }

  private loadLoaders() {
    const expressLoader = new ExpressLoader(this.httpServer.getApp());
    expressLoader.loadAll();
  }

  public startServer(): void {
    const port = AppConfig.APP_PORT;
    this.httpServer.listen(port, () => {
      console.log(`Server Started ✅ (PORT:${port})`);
    });
  }
}

const app = new App();
app.startServer();
