import { FastifyInstance } from "fastify";
import { registerBuildOnJenkins } from "./build.controller";

async function buildRoutes(server: FastifyInstance) {

    server.post('/', registerBuildOnJenkins)
}


export default buildRoutes;