module.exports = () => {
  const express = require("express");
  const bodyParser = require("body-parser");
  const path = require("path");
  const jwt = require("jsonwebtoken");
  const expressJWT = require("express-jwt");
  const config = require("./config.json");
  const app = express();
  const { logMessage } = require("./helpers/logMessages");
  const webPath = path.join(__dirname, "web");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/", express.static(webPath));

  app.use(
    expressJWT({ secret: config.web.secret }).unless({
      path: ["/", "/login", "/is-logged", "/settings"]
    })
  );

  app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.status(401).send(err);
    } else {
      next(err);
    }
  });

  app.get("/", (req, res) => {
    res.sendFile(path.join(webPath, "index.html"));
  });

  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username == config.web.username && password == config.web.password) {
      let token = jwt.sign({ username, password }, config.web.secret);
      res.json({
        success: true,
        err: null,
        token
      });
    } else {
      res.status(401).json({
        success: false,
        token: null,
        err: "Username or password is incorrect"
      });
    }
  });

  app.get("/is-logged", (req, res) => {
    res.json({ status: "success" });
  });

  app.get("/settings", (req, res) => {
    res.sendFile(path.join(webPath, "settings.html"));
  });

  app.post("/config", (req, res) => {
    res.json(config);
  });

  app.post("/settings", (req, res) => {});

  app.listen(config.web.port, () => logMessage("Web started"));
};
