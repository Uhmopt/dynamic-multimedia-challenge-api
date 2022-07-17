const readingListController = require("../../controllers/ReadingListController");

module.exports = function (router) {
  router.get("/reading-list", readingListController.get);
  router.post("/reading-list/create", readingListController.create);
  router.post("/reading-list/update", readingListController.update);
  router.get("/reading-list/delete/:id", readingListController.delete);
};
