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
const otpController = __importStar(require("../controllers/otp.controllers"));
const express_validator_1 = require("express-validator");
const authorization_1 = require("../middleware/authorization");
const userRouter = express_1.default.Router();
userRouter.post('/sign-up', (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isStrongPassword(), userController.userReigister);
userRouter.post('/sign-in', (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isStrongPassword(), userController.userLogin);
userRouter.get('/profile', authorization_1.isLogin, userController.userProfile);
userRouter.post("/request-otp", (0, express_validator_1.body)("email").isEmail(), otpController.requestOtpController);
userRouter.post('/verify', (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("opt"), otpController.verifyEmailController);
userRouter.post('/forget-password', (0, express_validator_1.body)("email").isEmail(), otpController.forgetPasswordOtpController);
userRouter.post('/reset-password', (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("opt"), (0, express_validator_1.body)("password").isStrongPassword(), otpController.resetPasswordController);
exports.default = userRouter;
