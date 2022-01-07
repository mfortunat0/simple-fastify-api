import Fastify from "fastify";
const fastify = Fastify({ logger: true });
import { ToolsRoutes } from "./controllers/ToolController";
fastify.register(ToolsRoutes);

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000);
  } catch (error) {
    fastify.log.error(error);
  }
};

start();
