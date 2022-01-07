import Fastify from "fastify";
const fastify = Fastify({ logger: true });

fastify.get("/items", (request, reply) => {
  reply.send("Hello world");
});

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000);
  } catch (error) {
    fastify.log.error(error);
  }
};

start();
