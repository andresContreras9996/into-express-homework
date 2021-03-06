const express = require("express");
const { body, validationResult, check } = require("express-validator");
const BookResources = express.Router();

const { BookControllers } = require("../controllers");

BookResources.get("/:guid", BookControllers.getByGUID);
BookResources.get("/", BookControllers.getForParams);

//TODO all the values  and array like in tags
BookResources.post(
  "/",
  body(["author", "title"]).isString(),
  body("publicationYear").isInt({
    min: 1455,
  }),
  body(["title", "publicationYear", "author", "tags"]).notEmpty(),
  check('tags.*').isString(),
  BookControllers.createBook
);

BookResources.put(
  "/:guid",
  body(["author", "title"]).isString(),
  body("publicationYear").isInt({
    min: 1455,
  }),
  body(["title", "publicationYear", "author", "tags"]).notEmpty(),
  check('tags.*').isString().notEmpty(),
  BookControllers.updateBook
);

BookResources.delete("/:guid", BookControllers.deleteBook);

module.exports = BookResources;
