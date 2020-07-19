import * as jwt from "jsonwebtoken";
import { MiddlewareFn, AuthChecker } from "type-graphql";
import { AuthData } from "../entities/AuthData";
import { JWT_SECRET } from "../util/secrets";
import { Context } from "../interfaces/context";

export const userAuthChecker: AuthChecker<Context> = ({ context }) => {
  const token = context.authToken.split(" ")[1]; // Remove 'Bearer'
  try {
    if (jwt.verify(token, JWT_SECRET)) {
      return true;
    }
  } catch (err) {
    throw new Error("Unauthorized!");
  }
  return false;
};

export const isAuth: MiddlewareFn<{ req: any }> = (req, next) => {
  const authHeader = req.context["headers"]["Authorization"];
  if (!authHeader) throw new Error("Not authorized!");
  const token = authHeader.split(" ")[1];
  if (!token || token == "") throw new Error("Not authorized!");
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("Not authorized!");
  }
  if (!decodedToken) throw new Error("Not authorized!");

  return next();
};

export const isCorrectUser: MiddlewareFn<{ req: any }> = (
  { args, context },
  next
) => {
  const authHeader = context["headers"]["Authorization"];
  if (!authHeader) throw new Error("Not authorized!");
  const token = authHeader.split(" ")[1];
  if (!token || token == "") throw new Error("Not authorized!");
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("Not authorized!");
  }
  if (!decodedToken || args["userId"] !== decodedToken.userId)
    throw new Error("Not authorized!");

  return next();
};

export const isCorrectUserFromJson: MiddlewareFn<{ req: any }> = (
  { args, context },
  next
) => {
  const authHeader = context["headers"]["Authorization"];
  if (!authHeader) throw new Error("Not authorized!");
  const token = authHeader.split(" ")[1];
  if (!token || token == "") throw new Error("Not authorized!");
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("Not authorized!");
  }
  let decodedUser =
    args["data"].instructorUserId == null
      ? args["data"].creator
      : args["data"].instructorUserId;
  if (!decodedToken || decodedUser !== decodedToken.userId)
    throw new Error("Not authorized!");

  return next();
};

export const isCorrectUserFromConfirmation: MiddlewareFn<{ req: any }> = (
  { args },
  next
) => {
  const token = args["token"];
  if (!token || token == "") throw new Error("Not authorized!");
  const tokenConent = token.split(":")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(tokenConent, JWT_SECRET);
  } catch (err) {
    throw new Error("Not authorized!");
  }
  if (!decodedToken || decodedToken.userId == null)
    throw new Error("Not authorized!");
  return next();
};

export function getDecodedToken(prefix: string, token: string): AuthData {
  if (!token.startsWith(prefix)) {
    throw new Error("Incorrect token type!");
  }
  const tokenContent = token.split(":")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(tokenContent, JWT_SECRET);
  } catch (err) {
    throw new Error("Not authorized!");
  }
  return decodedToken;
}
