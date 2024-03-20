import Fastify from "fastify";
import buildRoutes from "./modules/buildTrigger/build.routes";
import 'dotenv/config'



const server = Fastify()


server.get('/healthcheck', async function() {
    return {status: "Healthy"}
    
})
async function main() {
    server.register(buildRoutes, {prefix: 'api/build'})
    try {
        await server.listen({port: 3000});
        console.log("Server is up and runing")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    
}

main();