import AWS from "aws-sdk";
import config from "config";

export default function createDocumentClient(
  model: "Class" | "User"
): AWS.DynamoDB.DocumentClient {
  AWS.config.update({
    region: config.get(`${model}.AWS.region`),
  });
  const documentClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: config.get(`${model}.AWS.apiVersion`),
  });
  return documentClient;
}
