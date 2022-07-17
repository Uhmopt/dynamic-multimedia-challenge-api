const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api", routes);

app
  .use(express.static(path.resolve(__dirname, "build")))
  .get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });

const start = () => {
  app.listen({ port: PORT }, () => {
    console.log(`🚀  Server is ready port: ${PORT}`);
  });
};

start();
