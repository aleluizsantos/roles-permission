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
router.post(
  "/permissions",
  is(["ROLE_ADMIN"], ["CREATE"]),
  permissionController.create
);
router.get(
  "/permissions",
  is(["ROLE_ADMIN"], ["VIEW"]),
  permissionController.show
);

// ROLES
router.post("/roles", is(["ROLE_ADMIN"], ["CREATE"]), rolesController.create);
router.get("/roles", is(["ROLE_ADMIN"], ["VIEW"]), rolesController.show);

//PRODUTOS
router.post("/product", productController.create);
router.get("/product", productController.show);

export default router;
