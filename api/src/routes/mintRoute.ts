import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { providers, utils } from 'ethers';
import { MintParams } from '../types/mintTo';
import { mintTo } from '../services/mintTo';

const mintRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: MintParams }>('/', async (request, reply) => {
    const params = request.body;

    if (!params.to || !utils.isAddress(params.to)) {
      return reply
        .status(400)
        .send({ error: `Invalid Ethereum address: ${params.to}` });
    }

    if (!params.uri) {
      return reply.status(400).send({ error: `Invalid uri: ${params.uri}` });
    }

    try {
      const transaction: providers.TransactionResponse = await mintTo(
        params.to,
        params.uri,
      );
      return {
        status: 204,
        data: {
          hash: transaction.hash,
        },
      };
    } catch (error: any) {
      return reply.status(500).send({ error: `${error.message}` });
    }
  });
};

export default mintRoute;
