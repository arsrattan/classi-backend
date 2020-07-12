"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocumentClient = exports.uploadFileToS3 = exports.performUpload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const stream_1 = require("stream");
const isLocal = process.env.NODE_ENV == 'local';
const key = process.env.AWS_ACCESS_KEY_ID;
const secret = process.env.AWS_SECRET_ACCESS_KEY;
async function performUpload(s3, filename, tableName) {
    const pass = new stream_1.Stream.PassThrough();
    const params = {
        Bucket: tableName,
        Key: filename,
        Body: pass
    };
    await s3.upload(params, function (err, data) {
        if (err)
            console.log(err, data);
        console.log(data);
    });
    return filename;
}
exports.performUpload = performUpload;
async function uploadFileToS3(data, picture, tableName) {
    const { filename } = picture;
    const S3 = new aws_sdk_1.default.S3({
        accessKeyId: key,
        secretAccessKey: secret
    });
    let imageKey;
    try {
        imageKey = await performUpload(S3, filename, tableName);
    }
    catch (err) {
        throw new Error('Error uploading profile picture!');
    }
    data['imageKey'] = imageKey;
    return data;
}
exports.uploadFileToS3 = uploadFileToS3;
function createDocumentClient(model) {
    if (!isLocal) {
        return new aws_sdk_1.default.DynamoDB.DocumentClient({
            region: "us-east-1",
        });
    }
    else {
        return new aws_sdk_1.default.DynamoDB.DocumentClient({});
    }
}
exports.createDocumentClient = createDocumentClient;
//# sourceMappingURL=AWS.js.map