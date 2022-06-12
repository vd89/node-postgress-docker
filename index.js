import app from './src';
import config from './config';

const { port } = config;

(async () => {
  console.info('Starting the Server .......');
  await app.listen(port, () => {
    try {
      console.info(`Express -> server is running on  http://localhost:${port}`);
    } catch (e) {
      console.error('Express -> ', e.message);
    }
  });
  console.info(`App has Started `);
})();
