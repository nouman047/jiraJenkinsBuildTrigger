import axios, { AxiosResponse } from "axios";
import https from "https";
import { FastifyReply, FastifyRequest } from "fastify";
import { AttachmentSchema, WebhookEventSchema } from "./build.schema";

const urlRegex = /https?:\/\/[^\s\]]+/g;;

export async function registerBuildOnJenkins(
  request: FastifyRequest<{ Body: WebhookEventSchema }>,
  reply: FastifyReply
) {
  try {
    const body = request.body;
    let requestBody = {};
    if (body && body.webhookEvent === "comment_created") {
      const str = body.comment.body;
      const match = [...str.matchAll(urlRegex)];
      const urls = match.map(match => match[0]);
      const joinedUrls = urls.join(",");
      if (match && joinedUrls) {
        const url = joinedUrls;
        if (str.includes("build") && str.includes("sitemap")) {
          requestBody = {
            ISSUE_KEY: body.issue.key,
            SITE_MAP_AVAILABLE: true,
            SITE_MAP_URL: url,
          };
        } else if (str.includes("build") && !str.includes("sitemap")) {
          // const match = str.match(urlRegex);
          requestBody = {
            URLS_TO_EVALUATE: url,
            SITE_MAP_AVAILABLE: false,
            ISSUE_KEY: body.issue.key,
          };
        } else {
          return reply.code(404).send({ message: "No action required" })
        }
        if (Object.keys(requestBody).length !== 0) {
          const axiosInstance = axios.create({
            httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Consider replacing this with proper SSL certificate validation
          });

          // Make a request to Jenkins
          const checkTriggerResponse: AxiosResponse = await axiosInstance.post(
            "https://182.180.172.81/generic-webhook-trigger/invoke?token=thisiscodeautomationaisecretkeyforjenkinjobs",
            requestBody
          );

          // Return relevant data to the client
          return reply.code(200).send({
            message: "Job trigger successfully",
            data: checkTriggerResponse.data,
          });
        }
      }
    }
    // If conditions are not met, send a 404 response
    return reply.code(404).send({ message: "No action required" });
  } catch (error) {
    return reply.code(500).send({ message: "Internal Server Error" });
  }
}
