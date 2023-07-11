"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
//Handling Error
const errorHandler = (err, req, res, next) => {
    const status = err.status ? err.status : "Failed";
    const message = err.message;
    const stack = err.stack;
    const statusCode = err.statusCode ? err.statusCode : 500;
    res.status(statusCode).json({
        status,
        message,
        stack
    });
};
exports.errorHandler = errorHandler;
//Not Found Error
const notFound = (req, res, next) => {
    const err = new Error(`You can't find ${req.originalUrl} on the server`);
    next(err);
};
exports.notFound = notFound;
