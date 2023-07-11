"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileStatsById = exports.getFileStats = exports.saveEmail = exports.sendEmailToUser = exports.saveDownload = exports.downloadFile = exports.getFile = exports.getFiles = exports.uploadFile = void 0;
const db_server_1 = require("../config/db.server");
const send_email_1 = require("../utils/send.email");
const uploadFile = async (file, adminId) => {
    const { title, description, file_path } = file;
    return await db_server_1.db.file.create({
        data: {
            title,
            description,
            file_path,
            adminId
        }
    });
};
exports.uploadFile = uploadFile;
const getFiles = async () => {
    return await db_server_1.db.file.findMany({
        select: {
            id: true,
            title: true,
            description: true,
        }
    });
};
exports.getFiles = getFiles;
const getFile = async (id) => {
    const file = await db_server_1.db.file.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            description: true,
        }
    });
    if (!file) {
        throw new Error('File Does Not Exist');
    }
    return file;
};
exports.getFile = getFile;
const downloadFile = async (id) => {
    const file = await db_server_1.db.file.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            description: true,
            file_path: true
        }
    });
    if (!file) {
        throw new Error('File Does Not Exist');
    }
    return file;
};
exports.downloadFile = downloadFile;
const saveDownload = async (fileId, userId) => {
    return await db_server_1.db.download.create({
        data: {
            fileId,
            userId
        }
    });
};
exports.saveDownload = saveDownload;
const sendEmailToUser = async (fileId, userId) => {
    try {
        const file = await db_server_1.db.file.findUnique({ where: { id: fileId } });
        const user = await db_server_1.db.user.findUnique({ where: { id: userId } });
        if (!file || !user)
            throw new Error('File or User Not Found');
        const { email } = user;
        const { title, description, file_path } = file;
        const filename = file_path.split("\\")[1];
        const mailOptions = {
            from: 'File Sharing App',
            to: email,
            subject: 'File Shared',
            html: `<h1>${title}</h1><br><p>${description}</p>
                    <p><br>Atttached is the file you requested<br><br>Regards<br>File Sharing App</p>`,
            attachments: [
                {
                    filename,
                    path: file_path,
                },
            ],
        };
        (0, send_email_1.sendEmail)(mailOptions);
    }
    catch (error) {
        throw error;
    }
};
exports.sendEmailToUser = sendEmailToUser;
const saveEmail = async (fileId, userId) => {
    return await db_server_1.db.email.create({
        data: {
            fileId,
            userId
        }
    });
};
exports.saveEmail = saveEmail;
const getFileStats = async () => {
    try {
        const files = await db_server_1.db.file.findMany({
            select: {
                id: true,
                title: true,
                emails: {
                    select: {
                        id: true,
                    },
                },
                downloads: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        const fileStats = files.map((file) => ({
            Id: file.id,
            Title: file.title,
            "Number Of Emails": file.emails.length,
            "Number Of Downloads": file.downloads.length,
        }));
        return fileStats;
    }
    catch (error) {
        throw error;
    }
};
exports.getFileStats = getFileStats;
const getFileStatsById = async (id) => {
    try {
        const file = await db_server_1.db.file.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                emails: {
                    select: {
                        id: true,
                    },
                },
                downloads: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        if (!file)
            throw new Error("File Does Not Exist");
        const fileStats = {
            Id: file.id,
            Title: file.title,
            "Number Of Emails": file.emails.length,
            "Number Of Downloads": file.downloads.length,
        };
        return fileStats;
    }
    catch (error) {
        throw error;
    }
};
exports.getFileStatsById = getFileStatsById;
