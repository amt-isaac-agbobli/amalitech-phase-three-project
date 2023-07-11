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
exports.uploadFilePage = exports.getFileStatsByIdController = exports.getFileStatsController = exports.sendEmailController = exports.downloadFileController = exports.getFileByIdController = exports.getFilesController = exports.uploadFileController = void 0;
const express_validator_1 = require("express-validator");
const fileServices = __importStar(require("../services/file.service"));
/**
 * @desc Controller for File Uploading
 * @access Private
 * @route POST /api/v1/files/upload
 * */
const uploadFileController = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description } = req.body;
        const user = req.token;
        const id = parseInt(user.id);
        if (req.file) {
            /*const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'auto',
                folder: 'files',
            }); */
            const file = await fileServices.uploadFile({
                title,
                description,
                file_path: req.file.path,
            }, id);
            res.status(201).json({
                message: "File uploaded successfully",
                file
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.uploadFileController = uploadFileController;
/**
 * @desc Controller for for Displaying Files
 * @access Private
 * @route GET /api/v1/files
 * */
const getFilesController = async (req, res, next) => {
    try {
        const url = `${req.protocol}://${req.get('host')}/api/v1/files/download/`;
        const files = (await fileServices.getFiles()).map(file => {
            return {
                id: file.id,
                title: file.title,
                description: file.description,
                "Download Url": url + file.id
            };
        });
        return res.status(200).json(files);
    }
    catch (error) {
        next(error);
    }
};
exports.getFilesController = getFilesController;
/**
 * @desc Controller for for Displaying File by ID
 * @access Private
 * @route GET /api/v1/files
 * */
const getFileByIdController = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const url = `${req.protocol}://${req.get('host')}/api/v1/files/download/`;
        const id = parseInt(req.params.id);
        const file = await fileServices.getFile(id);
        return res.status(200).json({
            file,
            "Download URL": url + id
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getFileByIdController = getFileByIdController;
/**
 * @desc Controller for for Downloading File
 * @access Private
 * @route GET /api/v1/files/download/:id
 * */
const downloadFileController = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const file = await fileServices.downloadFile(id);
        if (!file) {
            return res.status(404).json({
                message: "File not found"
            });
        }
        const fileUrl = file.file_path;
        res.status(200).download(fileUrl);
        const user = req.token;
        const userId = parseInt(user.id);
        await fileServices.saveDownload(id, userId);
    }
    catch (error) {
        next(error);
    }
};
exports.downloadFileController = downloadFileController;
/**
 * @desc Controller for Sending File through Email
 * @access Private
 * @route POST /api/v1/files/email/:id
 * */
const sendEmailController = async (req, res, next) => {
    try {
        const user = req.token;
        const userId = parseInt(user.id);
        const fileId = parseInt(req.params.id);
        await fileServices.sendEmailToUser(fileId, userId);
        await fileServices.saveEmail(fileId, userId);
        return res.status(200).json({
            message: "Email sent successfully"
        });
    }
    catch (error) {
        next(error);
    }
};
exports.sendEmailController = sendEmailController;
/**
 * @desc Controller for Geting Statistics on download and email sent of files
 * @access Private
 * @route GET /api/v1/files/stats
 * */
const getFileStatsController = async (req, res, next) => {
    try {
        const fileStats = await fileServices.getFileStats();
        return res.status(200).json(fileStats);
    }
    catch (error) {
        next(error);
    }
};
exports.getFileStatsController = getFileStatsController;
/**
 * @desc Controller for Geting Statistics on download and email sent of file
 * @access Private
 * @route GET /api/v1/files/stats/:id
 */
const getFileStatsByIdController = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const fileStats = await fileServices.getFileStatsById(id);
        return res.status(200).json(fileStats);
    }
    catch (error) {
        next(error);
    }
};
exports.getFileStatsByIdController = getFileStatsByIdController;
const uploadFilePage = async (req, res, next) => {
    try {
        res.render('admin/upload');
    }
    catch (error) {
        next(error);
    }
};
exports.uploadFilePage = uploadFilePage;
