const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http").createServer(app);

const whitelist = ["http://localhost:5173", "http://localhost:3000"]

app.set("trust proxy", true);
app.use(cors({
  origin: process.env.FRONTEND_URL,
  // function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   }
  //   else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["X-Requested-With", "content-type"],
  credentials: true
}));
app.use(bodyParser.json({ limit: "512mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "512mb", extended: true }));


app.get("/", (req, res) => {
  console.log("This NodeJS Server run at port: " + PORT);
  res.json({ message: "NodeJS API" });
});

// set port, listen for requests
const PORT = process.env.PORT || 3005; // Production 3005
app.listen(PORT, () => {
  console.log("This NodeJS Server run at port: " + PORT);
});

require("./app/routes/main.routes")(app);

// export static for public folder
app.use("/api/public", express.static("./app/public"));
app.use(require("./app/routes"));