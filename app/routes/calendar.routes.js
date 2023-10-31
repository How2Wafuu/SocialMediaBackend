const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calendar.controller");


router.route("/calendar/test").get(calendarController.testRoute);
router.route("/calendar/create").post(calendarController.createAppointment);
router.route("/calendar/get").get(calendarController.getAppointment);
router.route("/calendar/getAll").get(calendarController.getAllAppointment);
router.route("/calendar/delete").post(calendarController.deleteAppointment);

module.exports = router;