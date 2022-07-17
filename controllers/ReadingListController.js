const { MSG_TRY_AGAIN } = require("../constants/messages");
const fs = require("fs");
const { jsonParse } = require("../lib/jsonHelper");
const path = require("path");

const formatRow = (row = {}) =>
  row
    ? {
        // existing columns
        ...(row ?? {}),

        // calculated columns
      }
    : row;

const FILE_PATH = path.resolve("./db/database.json");

class ReadingListController {
  async get(req, res) {
    // read file
    const fileContent = fs.readFileSync(FILE_PATH);
    const formatted = jsonParse(fileContent, true);

    // return result
    res.json(formatted.map(formatRow));
  }

  async getOne(req, res) {
    const id = req.params.id;

    // read file
    const fileContent = fs.readFileSync(FILE_PATH);
    const formatted = jsonParse(fileContent, true);

    // return result
    res.json(formatRow(formatted.filter((item) => item?.id === id)));
  }

  async create(req, res) {
    const { title = "", author = "" } = req.body;

    try {
      // read file
      const fileContent = fs.readFileSync(FILE_PATH);
      const formatted = jsonParse(fileContent, true);

      // last item
      const maxId =
        formatted.reduce((ret, cur) => (ret < cur?.id ? cur.id : ret), 0) + 1;

      const newItem = formatRow({ id: maxId, title: title, author: author });

      formatted.push(newItem);

      // write
      fs.writeFileSync(FILE_PATH, JSON.stringify(formatted));

      // return result
      res.status(200).json(newItem);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Request failed, " + MSG_TRY_AGAIN, error });
    }
  }

  async update(req, res) {
    const { id = 0, title = "", author = "" } = req.body;

    try {
      // read file
      const fileContent = fs.readFileSync(FILE_PATH);
      const formatted = jsonParse(fileContent, true);

      const matchIndex = formatted.findIndex((item) => item?.id === id);

      const newItem = formatRow({ id: id, title: title, author: author });

      const newData = [
        ...formatted.slice(0, matchIndex),
        newItem,
        ...formatted.slice(matchIndex + 1),
      ];

      // write
      fs.writeFileSync(FILE_PATH, JSON.stringify(newData));

      // return result
      res.status(200).json(newItem);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Request failed, " + MSG_TRY_AGAIN, error });
    }
  }

  async delete(req, res) {
    const { id = 0, title = "", author = "" } = req.body;

    try {
      // read file
      const fileContent = fs.readFileSync(FILE_PATH);
      const formatted = jsonParse(fileContent, true);

      const matchIndex = formatted.findIndex((item) => item?.id === id);

      const newData = [
        ...formatted.slice(0, matchIndex),
        ...formatted.slice(matchIndex + 1),
      ];

      // write
      fs.writeFileSync(FILE_PATH, JSON.stringify(newData));

      // return result
      res.status(200).json(matchIndex >= 0);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Request failed, " + MSG_TRY_AGAIN, error });
    }
  }
}

module.exports = new ReadingListController();
