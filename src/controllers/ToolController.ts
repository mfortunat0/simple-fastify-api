import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { v4 as uuidv4 } from "uuid";

const tool = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};

const getToolsOptions = {
  schema: {
    response: {
      200: {
        type: "array",
        items: tool,
      },
    },
  },
};

const postToolsOptions = {
  schema: {
    response: {
      201: {
        type: "array",
        items: tool,
      },
    },
  },
};

const getToolOptions = {
  schema: {
    response: {
      200: tool,
    },
  },
};

const ToolsRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (err?: Error) => void
) => {
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

  fastify.get("/tools", getToolsOptions, (request, reply) => {
    reply.send(tools);
  });

  fastify.get<{ Params: IToolsRouteParams }>(
    "/tools/:id",
    getToolOptions,
    (request, reply) => {
      const { id } = request.params;
      const tool = tools.find((tool) => tool.id === id);
      reply.send(tool);
    }
  );

  fastify.post<{ Body: IToolsRouteBody }>(
    "/tools",
    postToolsOptions,
    (request, reply) => {
      const { name } = request.body;
      const tool: Tool = {
        name,
        id: uuidv4(),
      };
      tools.push(tool);
      reply.code(201).send(tool);
    }
  );
  done();
};

export { ToolsRoutes };
