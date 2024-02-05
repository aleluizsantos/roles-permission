import { Router } from "express";
import userController from "./controller/userController";
import sessionController from "./controller/sessionController";
import permissionController from "./controller/permissionController";
import rolesController from "./controller/rolesController";
import productController from "./controller/productController";
import { is } from "./middlewares/permission";

const router = Router();

// USER
router.post("/user", userController.createUser);
router.delete("/user/:id", userController.delete);
router.get("/user", userController.show);

// SESSION
router.post("/session", sessionController.create);

// PERMISSION
router.post("/permissions", permissionController.create);
router.get("/permissions", permissionController.show);

// ROLES
router.post("/roles", rolesController.create);
router.get("/roles", rolesController.show);

//PRODUTOS
router.post("/product", productController.create);
router.get("/product", productController.show);

export default router;
