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
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const globaErrorHandler_1 = require("../middleware/globaErrorHandler");
const admin_route_1 = __importDefault(require("../routes/admin.route"));
const user_route_1 = __importDefault(require("../routes/user.route"));
const file_route_1 = __importDefault(require("../routes/file.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const swaggerDoc = __importStar(require("../swagger/swaggerDoc.json"));
const user_page_routes_1 = __importDefault(require("../routes/user.page.routes"));
const app = (0, express_1.default)();
//View engine setup
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "../views"));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
/**
app.get("/", (req, res) => {
    const title = "Welcome to the file upload API";
    res.render("index" , {title});
}); */
//Routes
app.use('/api/v1/admins/', admin_route_1.default);
app.use('/api/v1/users/', user_route_1.default);
app.use('/api/v1/files/', file_route_1.default);
//Page Routes
app.use('/', user_page_routes_1.default);
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc));
//Error handling middleware
app.use(globaErrorHandler_1.notFound);
app.use(globaErrorHandler_1.errorHandler);
exports.default = app;
