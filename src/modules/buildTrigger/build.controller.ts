import axios, { AxiosResponse } from 'axios';
import https from "https";
import { FastifyReply, FastifyRequest } from "fastify";
import { AttachmentSchema, WebhookEventSchema } from "./build.schema";

const urlRegex = /(https?:\/\/[^\s|]+)/;;

export async function registerBuildOnJenkins(
    request: FastifyRequest<{ Body: WebhookEventSchema }>,
    reply: FastifyReply
  ) {
    try {
      const body = request.body;
      if (body && body.webhookEvent === 'comment_created') {
        const str = body.comment.body;
        if (str.includes('build')) {
          const match = str.match(urlRegex);
          if (match && match[0] !== '') {
            const url = match[0];
            const axiosInstance = axios.create({
              httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Consider replacing this with proper SSL certificate validation
            });
  
            // Make a request to Jenkins
            const checkTriggerResponse: AxiosResponse = await axiosInstance.post(
              'https://182.180.172.81/generic-webhook-trigger/invoke?token=thisiscodeautomationaisecretkeyforjenkinjobs',
              {
                URLS_TO_EVALUATE: url,
                ISSUE_KEY: body.issue.key
              }
            );
  
            // Return relevant data to the client
            return reply.code(200).send({
              message: 'Trigger checked successfully',
              data: checkTriggerResponse.data,
            });
          }
        }
      }
  
      // If conditions are not met, send a 404 response
      return reply.code(404).send({ message: 'No action required' });
    } catch (error) {
     
        return reply.code(500).send({ message: 'Internal Server Error' });
      }
    }

// export async function postCommenttoJira(
//   request: FastifyRequest<{Body: AttachmentSchema}>,
//   reply: FastifyReply
// ) {
//     const body = request.body;
//     try {
//         const url = `https://${process.env.JIRA_BASE_URL}/rest/api/3/issue/${body.issueKey}/attachments`;
    
//         // Define the request headers
//         const headers =  {
//             Accept: "application/octet-stream",
//             "Content-Type": "application/octet-stream",
//             "X-Atlassian-Token": "no-check",
//             Authorization:
//               "Basic " +
//               Buffer.from(
//                 `${process.env.JIRA_USER_EMAIL}:${process.env.JIRA_API_TOKEN}`
//               ).toString("base64"),
//           };
//         const data = {
//           filename: body.fileName,
//           content: body.base64Data
//         };
    
//         // Make the POST request
//         const response = await axios.post(url, data, { headers });
    
//         if (response.status === 200) {
//           console.log('Attachment uploaded successfully:', response.data);
//         } else {
//           console.error('Failed to upload attachment:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error uploading attachment:', error);
//       }
//     return reply.send(200);
// }
