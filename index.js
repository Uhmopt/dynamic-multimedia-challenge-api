const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");
const { IS_DEVELOPMENT } = require("./config");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api", routes);

if (IS_DEVELOPMENT) {
  app
    .use(express.static(path.resolve(__dirname, "public")))
    .get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "public", "index.html"));
    });

  app.listen({ port: PORT }, () => {
    console.log(`🚀  Server is ready port: ${PORT}`);
  });
}

module.exports = app;
