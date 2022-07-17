const readingListController = require("../../controllers/ReadingListController");

module.exports = function (router) {
  router.get("/box", readingListController.get);
  router.post("/box/create", readingListController.create);
  router.post("/box/update", readingListController.update);
  router.get("/box/delete/:id", readingListController.delete);
};
