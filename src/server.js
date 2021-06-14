const Hapi = require('hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'], //penerapan cros origin resource sharing pada HAPI
      }
    }
  });

  server.route(routes); //memanggil routes

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
