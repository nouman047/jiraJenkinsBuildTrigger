"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBuildOnJenkins = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const urlRegex = /(https?:\/\/[^\s]+)/;
function registerBuildOnJenkins(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = request.body;
            if (body && body.webhookEvent === 'comment_created') {
                const str = body.comment.body;
                if (str.includes('build')) {
                    const match = str.match(urlRegex);
                    if (match && match[0] !== '') {
                        const url = match[0];
                        const axiosInstance = axios_1.default.create({
                            httpsAgent: new https_1.default.Agent({ rejectUnauthorized: false }), // Consider replacing this with proper SSL certificate validation
                        });
                        // Make a request to Jenkins
                        const checkTriggerResponse = yield axiosInstance.post('https://182.180.172.81/generic-webhook-trigger/invoke?token=thisiscodeautomationaisecretkeyforjenkinjobs', {
                            URLS_TO_EVALUATE: url,
                            ISSUE_KEY: body.issue.key
                        });
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
        }
        catch (error) {
            return reply.code(500).send({ message: 'Internal Server Error' });
        }
    });
}
exports.registerBuildOnJenkins = registerBuildOnJenkins;
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
