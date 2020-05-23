import AWS from "aws-sdk";
import {Stream} from "stream";

const isDev = process.env.NODE_ENV !== 'production';

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

export async function performUpload(s3: AWS.S3, filename: string, tableName: string): Promise<string> {
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

export async function uploadFileToS3(data: any, picture: Upload, tableName: string): Promise<any> {
  const {filename} = picture
  const S3: AWS.S3 = new AWS.S3({
    accessKeyId: "AKIAQOSR45TLEGYSMGHB",
    secretAccessKey: "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"
  })
  let imageKey: string;
  try {
    imageKey = await performUpload(S3, filename, tableName)
  }
  catch (err) {
    throw new Error('Error uploading profile picture!');
  }
  data['imageKey'] = imageKey;
  return data;
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


