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
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDashboard = exports.adminLoginPage = exports.getAdmin = exports.loginAdmin = exports.registerAdmin = void 0;
const AdminService = __importStar(require("../services/admin.service"));
const express_validator_1 = require("express-validator");
const helper_1 = require("../utils/helper");
/**
 * @desc Controller for Admin Registration
 * @access Public
 * @route POST /api/v1/admins/sign-up
 * */
const registerAdmin = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const admin = await AdminService.registerAdmin(req.body);
        return res.status(201).json({ admin });
    }
    catch (error) {
        next(error);
    }
};
exports.registerAdmin = registerAdmin;
/**
 * @desc Controller for Admin Sign in
 * @access Public
 * @route POST /api/v1/admins/sign-in
 * */
const loginAdmin = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }
        const admin = await AdminService.loginAdmin(password, email);
        const token = await (0, helper_1.generateToken)(admin.id, admin.email, admin.role.toString());
        return res.status(200).json({
            Token: token
        });
    }
    catch (error) {
        next(error);
    }
};
exports.loginAdmin = loginAdmin;
const getAdmin = async (req, res, next) => {
    try {
        const admin = await AdminService.getAdmin(Number(req.params.id));
        return res.status(200).json({ admin });
    }
    catch (error) {
        next(error);
    }
};
exports.getAdmin = getAdmin;
const adminLoginPage = async (req, res, next) => {
    try {
        res.render('admin/index');
    }
    catch (error) {
        next(error);
    }
};
exports.adminLoginPage = adminLoginPage;
const adminDashboard = async (req, res, next) => {
    try {
        res.render('admin/dashboard');
    }
    catch (error) {
        next(error);
    }
};
exports.adminDashboard = adminDashboard;
