const Router = require("express");
const router = new Router();

require("./routes/reading-list")(router);

module.exports = router;
