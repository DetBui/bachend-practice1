import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from './app.module';

// set +H truoc khi chay

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
});
bootstrap.init().then(async (app) => {
  try {
    // init your app
    await app.init();
    // boot the cli
    await bootstrap.boot();
    process.exit(0);
  } catch (e) {
    console.log('exit');
    process.exit(1);
  }
});
