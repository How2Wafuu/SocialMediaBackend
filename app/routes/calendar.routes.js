const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calendar.controller");
// const auth = require("../middleware/authJWT");


router.route("/calendar/test").get(calendarController.testRoute);
router.route("/calendar/create").post(calendarController.createAppointment);
router.route("/calendar/get/:date").get(calendarController.getAppointment);
router.route("/calendar/getAll").get(calendarController.getAllAppointment);
router.route("/calendar/delete").delete(calendarController.deleteAppointment);

module.exports = router;