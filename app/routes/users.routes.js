const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const authJWT = require("../middleware/authJWT");

router.route("/users/test").get(usersController.testRoute);
router.route("/users/createUser").post(usersController.createUser);
router.route("/users/login").post(usersController.Login);
router.route("/users/getData").get(authJWT.verifyToken,usersController.getData);


module.exports = router;