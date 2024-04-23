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
const urlRegex = /https?:\/\/[^\s\]]+/g;
;
function registerBuildOnJenkins(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
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
                    }
                    else if (str.includes("build") && !str.includes("sitemap")) {
                        // const match = str.match(urlRegex);
                        requestBody = {
                            URLS_TO_EVALUATE: url,
                            SITE_MAP_AVAILABLE: false,
                            ISSUE_KEY: body.issue.key,
                        };
                    }
                    else {
                        return;
                    }
                    if (Object.keys(requestBody).length !== 0) {
                        const axiosInstance = axios_1.default.create({
                            httpsAgent: new https_1.default.Agent({ rejectUnauthorized: false }), // Consider replacing this with proper SSL certificate validation
                        });
                        // Make a request to Jenkins
                        const checkTriggerResponse = yield axiosInstance.post("https://182.180.172.81/generic-webhook-trigger/invoke?token=thisiscodeautomationaisecretkeyforjenkinjobs", requestBody);
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
        }
        catch (error) {
            return reply.code(500).send({ message: "Internal Server Error" });
        }
    });
}
exports.registerBuildOnJenkins = registerBuildOnJenkins;
