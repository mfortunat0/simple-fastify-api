import Fastify from "fastify";
import fastifySwagger from "fastify-swagger";
const fastify = Fastify({ logger: true });
import { ToolsRoutes } from "./controllers/ToolController";
fastify.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "fastify-tools-api",
      version: "3",
    },
  },
});
fastify.register(ToolsRoutes);

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000);
  } catch (error) {
    fastify.log.error(error);
  }
};

start();
