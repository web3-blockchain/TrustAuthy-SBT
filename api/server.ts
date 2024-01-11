import fastify, { FastifyInstance } from 'fastify';
import mintRoute from './src/routes/mintRoute';

const server: FastifyInstance = fastify({ logger: true });

server.register(mintRoute, { prefix: '/mint' });

const start = async () => {
  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
