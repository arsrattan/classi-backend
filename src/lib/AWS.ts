import AWS from "aws-sdk";

const isDev = process.env.NODE_ENV !== 'production';

export default function createDocumentClient(model: "Class" | "User"): AWS.DynamoDB.DocumentClient {
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
