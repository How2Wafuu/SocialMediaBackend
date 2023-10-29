const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");
const auth = require("../middleware/authJWT");






router.route("/posts/test").get(postsController.testRoute);
router.route("/posts/create").post(auth.verifyToken,postsController.createPosts);
router.route("/posts/getAll").get(auth.verifyToken,postsController.getAllPosts);


module.exports = router;