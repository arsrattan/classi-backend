import { Router } from "express";
import ClassController from "../controllers/ClassController";
import { AuthController } from "../controllers/AuthController";

export class ClassRoutes {
  router: Router;
  public classController: ClassController = new ClassController();
  public authController: AuthController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.get("/", this.classController.getAllClasses);
    this.router.get("/:classId", this.classController.getClassById);
    this.router.post(
      "/",
      this.authController.authenticateJWT,
      this.classController.createClass
    );
    this.router.put(
      "/:classId",
      this.authController.authenticateJWT,
      this.classController.updateClassById
    );
    this.router.delete(
      "/:classId",
      this.authController.authenticateJWT,
      this.classController.deleteClassById as any
    );
  }
}
