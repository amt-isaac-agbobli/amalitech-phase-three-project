"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const option = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'File Server API',
            version: '1.0.0',
            description: 'A API for file server',
            contact: {
                name: 'Agbobli Isaac'
            },
        },
        servers: [
            {
                url: 'http://localhost:8000/api/v1/',
                description: 'Development server',
            }
        ],
    },
    apis: ['./src/routes/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(option);
exports.default = swaggerSpec;
