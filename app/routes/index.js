const router = require("express").Router();
const authJwt = require("../middleware/authJWT");

// If want to use Versioning the API
const api = process.env.apiVersion || "/api";
router.use(`${api}`, require("./users.routes"));

module.exports = router;