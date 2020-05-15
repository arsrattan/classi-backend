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
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var bodyParser = __importStar(require("body-parser"));
var userRoutes_1 = require("../routes/userRoutes");
var classRoutes_1 = require("../routes/classRoutes");
var App = (function () {
    function App() {
        this.app = express_1["default"]();
        this.config();
        this.routes();
    }
    App.prototype.routes = function () {
        this.app.use("/api/classes", new classRoutes_1.ClassRoutes().router);
        this.app.use("/api/users", new userRoutes_1.UserRoutes().router);
    };
    App.prototype.config = function () {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(express_1["default"].json());
        this.app.use(bodyParser.json());
    };
    App.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get("port"), function () {
            console.log(" API is running at http://localhost:%d", _this.app.get("port"));
        });
    };
    return App;
}());
var server = new App();
server.start();
//# sourceMappingURL=app.js.map