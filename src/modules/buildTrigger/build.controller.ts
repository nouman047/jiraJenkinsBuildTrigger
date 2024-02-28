import axios from "axios";
import https from 'https'
import { FastifyReply, FastifyRequest } from "fastify";

export async function registerBuildOnJenkins(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = request.body;
    if (body) {
      console.log(body);
      const axiosInstance = axios.create({
        httpsAgent: new https.Agent({ rejectUnauthorized: false }) // This line tells Axios to ignore SSL certificate verification
    });
      const triggerJob = await axiosInstance.get(
        "https://182.180.172.81/generic-webhook-trigger/invoke?token=thisiscodeautomationaisecretkeyforjenkinjobs"
      );
      console.log(triggerJob.data);
      return reply.code(200).send(`${triggerJob.data.message}. \nJob Data: ${JSON.stringify(triggerJob.data.jobs)}`);
    } else {
      return reply.code(415).send("Body must be included in this request");
    }
  } catch (error) {
    return reply.code(500).send(error);
  }
}
