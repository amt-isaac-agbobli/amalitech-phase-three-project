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
const express_1 = __importDefault(require("express"));
const fileController = __importStar(require("../controllers/file.controllers"));
const authorization_1 = require("../middleware/authorization");
const multer_1 = __importDefault(require("../config/multer"));
const express_validator_1 = require("express-validator");
const fileRouter = express_1.default.Router();
//Admin Route
fileRouter.get('/stats', authorization_1.isLogin, authorization_1.isAdmin, fileController.getFileStatsController);
fileRouter.get('/stats/:id', authorization_1.isLogin, authorization_1.isAdmin, fileController.getFileStatsByIdController);
fileRouter.post('/upload', authorization_1.isLogin, authorization_1.isAdmin, multer_1.default.single('file'), (0, express_validator_1.body)("title").isString(), (0, express_validator_1.body)("description").isString(), fileController.uploadFileController);
//User Route
fileRouter.get('/', fileController.getFilesController);
fileRouter.get('/:id', authorization_1.isLogin, fileController.getFileByIdController);
fileRouter.get('/download/:id', authorization_1.isLogin, fileController.downloadFileController);
fileRouter.post('/email/:id', authorization_1.isLogin, fileController.sendEmailController);
exports.default = fileRouter;
