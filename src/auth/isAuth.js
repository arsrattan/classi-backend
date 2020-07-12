"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecodedToken = exports.isCorrectUserFromConfirmation = exports.isCorrectUserFromJson = exports.isCorrectUser = exports.isAuth = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const secrets_1 = require("../util/secrets");
exports.isAuth = (req, next) => {
    const authHeader = req.context['headers']['Authorization'];
    if (!authHeader)
        throw new Error('Not authorized!');
    const token = authHeader.split(' ')[1];
    if (!token || token == '')
        throw new Error('Not authorized!');
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, secrets_1.JWT_SECRET);
    }
    catch (err) {
        throw new Error('Not authorized!');
    }
    if (!decodedToken)
        throw new Error('Not authorized!');
    return next();
};
exports.isCorrectUser = ({ args, context }, next) => {
    const authHeader = context['headers']['Authorization'];
    if (!authHeader)
        throw new Error('Not authorized!');
    const token = authHeader.split(' ')[1];
    if (!token || token == '')
        throw new Error('Not authorized!');
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, secrets_1.JWT_SECRET);
    }
    catch (err) {
        throw new Error('Not authorized!');
    }
    if (!decodedToken || args['userId'] !== decodedToken.userId)
        throw new Error('Not authorized!');
    return next();
};
exports.isCorrectUserFromJson = ({ args, context }, next) => {
    const authHeader = context['headers']['Authorization'];
    if (!authHeader)
        throw new Error('Not authorized!');
    const token = authHeader.split(' ')[1];
    if (!token || token == '')
        throw new Error('Not authorized!');
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, secrets_1.JWT_SECRET);
    }
    catch (err) {
        throw new Error('Not authorized!');
    }
    let decodedUser = (args['data'].instructorUserId == null)
        ? args['data'].creator
        : args['data'].instructorUserId;
    if (!decodedToken || decodedUser !== decodedToken.userId)
        throw new Error('Not authorized!');
    return next();
};
exports.isCorrectUserFromConfirmation = ({ args }, next) => {
    const token = args['token'];
    if (!token || token == '')
        throw new Error('Not authorized!');
    const tokenConent = token.split(":")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(tokenConent, secrets_1.JWT_SECRET);
    }
    catch (err) {
        throw new Error('Not authorized!');
    }
    if (!decodedToken || decodedToken.userId == null)
        throw new Error('Not authorized!');
    return next();
};
function getDecodedToken(prefix, token) {
    if (!token.startsWith(prefix)) {
        throw new Error('Incorrect token type!');
    }
    const tokenContent = token.split(":")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(tokenContent, secrets_1.JWT_SECRET);
    }
    catch (err) {
        throw new Error('Not authorized!');
    }
    return decodedToken;
}
exports.getDecodedToken = getDecodedToken;
//# sourceMappingURL=isAuth.js.map