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
const userController = __importStar(require("../controllers/user.controllers"));
const adminController = __importStar(require("../controllers/admin.controllers"));
const fileController = __importStar(require("../controllers/file.controllers"));
const userPageRouter = express_1.default.Router();
userPageRouter.get('/', userController.indexPage);
userPageRouter.get('/login', userController.userLoginPage);
userPageRouter.get('/register', userController.userRegisterPage);
userPageRouter.get('/forget-password', userController.forgetPasswordPage);
userPageRouter.get('/reset-password', userController.resetPasswordPage);
userPageRouter.get('/dashboard', userController.dashboardPage);
userPageRouter.get('/profile', userController.profilePage);
userPageRouter.get('/verify', userController.verifyPage);
userPageRouter.get('/file/:id', userController.filePage);
userPageRouter.get('/admin', adminController.adminLoginPage);
userPageRouter.get('/admin/dashboard', adminController.adminDashboard);
userPageRouter.get('/admin/upload', fileController.uploadFilePage);
exports.default = userPageRouter;
