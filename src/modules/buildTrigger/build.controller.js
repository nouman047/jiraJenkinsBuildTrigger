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
function registerBuildOnJenkins(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = request.body;
            if (body) {
                console.log(body);
                const axiosInstance = axios_1.default.create({
                    httpsAgent: new https_1.default.Agent({ rejectUnauthorized: false }) // This line tells Axios to ignore SSL certificate verification
                });
                const triggerJob = yield axiosInstance.get("https://182.180.172.81/generic-webhook-trigger/invoke?token=thisiscodeautomationaisecretkeyforjenkinjobs");
                console.log(triggerJob.data);
                return reply.code(200).send(`${triggerJob.data.message}. \nJob Data: ${JSON.stringify(triggerJob.data.jobs)}`);
            }
            else {
                return reply.code(415).send("Body must be included in this request");
            }
        }
        catch (error) {
            return reply.code(500).send(error);
        }
    });
}
exports.registerBuildOnJenkins = registerBuildOnJenkins;
