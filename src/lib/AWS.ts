import AWS from "aws-sdk";
import {Stream} from "stream";

const isLocal = process.env.NODE_ENV == 'local';
const key = process.env.AWS_ACCESS_KEY_ID;
const secret = process.env.AWS_SECRET_ACCESS_KEY;

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
    accessKeyId: key,
    secretAccessKey: secret
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

export function createDocumentClient(model: "Class" | "Post" | "Registration" | "Group"): AWS.DynamoDB.DocumentClient {
  if (!isLocal) {
    return new AWS.DynamoDB.DocumentClient({
      region: "us-east-1",
    });
  }
  else {
    return new AWS.DynamoDB.DocumentClient({});
  }
}


