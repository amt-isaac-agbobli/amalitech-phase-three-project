"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app/app"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
describe('Files Routes', () => {
    it('Upload File', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/files/upload')
            .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
            .send({
            title: 'Test File',
            description: 'This is a test file',
            file: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        });
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('file');
    });
    it('Upload file if the titel is empty', async () => {
        const resporn = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/files/upload')
            .set('Authorization', `Bearer ${process.env.ADMIN_TOKEN}`)
            .send({
            title: '',
            description: 'This is a test file',
            file: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        });
        expect(resporn.statusCode).toEqual(400);
        expect(resporn.body).toHaveProperty('errors', [{
                type: 'field',
                value: '',
                msg: 'Invalid value',
                path: 'title',
                location: 'body'
            }]);
    });
});
