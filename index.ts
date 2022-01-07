import Fastify from "fastify";
const fastify = Fastify({ logger: true });
import { v4 as uuidv4 } from "uuid";

type Tool = {
  id: string;
  name: string;
};

interface IToolsRouteParams {
  id: string;
}

interface IToolsRouteBody {
  name: string;
}

const tools: Tool[] = [];

fastify.get("/tools", (request, reply) => {
  reply.send(tools);
});

fastify.get<{ Params: IToolsRouteParams }>("/tools/:id", (request, reply) => {
  const { id } = request.params;
  const tool = tools.find((tool) => tool.id === id);
  reply.send(tool);
});

fastify.post<{ Body: IToolsRouteBody }>("/tools", (request, reply) => {
  const { name } = request.body;
  const tool: Tool = {
    name,
    id: uuidv4(),
  };
  tools.push(tool);
  reply.send(tool);
});

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000);
  } catch (error) {
    fastify.log.error(error);
  }
};

start();
