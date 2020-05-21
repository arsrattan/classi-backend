import AWS from "aws-sdk";
import {Stream} from "stream";
import {WritableResponse} from "nodemailer/lib/fetch";

const isDev = process.env.NODE_ENV !== 'production';

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

export async function uploadFileToS3(s3, filename, tableName): Promise<string> {
  const pass = new Stream.PassThrough()
  const params = {
    Bucket: tableName,
    Key: filename,
    Body: pass
  }
  await s3.upload(params, function(err, data) {
    if(err) console.log(err, data)
    console.log(data);
  })
  return filename;
}

export function createDocumentClient(model: "Class" | "User" | "Post"): AWS.DynamoDB.DocumentClient {
  if (isDev) {
    return new AWS.DynamoDB.DocumentClient({
      region: "local",
      endpoint: "http://localhost:8000"
    });
  }
  else {
    return new AWS.DynamoDB.DocumentClient({});
  }
}


