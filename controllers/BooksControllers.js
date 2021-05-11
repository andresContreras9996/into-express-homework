const { Book } = require("../models");
const { validationResult } = require('express-validator');

// Fecth book by guid
const getByGUID = (req, res) => {
  const { guid } = req.params;
  Book.getAll((books) => {
    const book = books.find((ent) => ent.guid === guid);
    if (book) {
      res.send(book);
    } else {
      res.status(404).send({
        message: "Ups!!! book not found.",
      });
    }
  });
};

const createBook = (req, res) => {
  const { body } = req;
  // Create new instance
  const newBook = new Book(body);
  //validations
  const validator = validationResult(req);
  if(validator.errors.length!==0){
    return res.send({
      message: "invalid data",
      error:validator.errors,
    });
  } 
  //title, year and author not the same
  Book.getAll((books) => {
    const book = books.find(
      (ent) =>
        ent.author === newBook.author &&
        ent.publicationYear === newBook.publicationYear &&
        ent.title === newBook.title
    );
    if (book) {
      res.send({
        message: "book already in data",
      });
    } else {
      // Save in db
      newBook.save();
      res.send({
        message: "User successfully created!!!",
        guid: newBook.getGuid(),
      });
    }
  });
};

const filterAuthor=(author,arr)=>{
  if(author!==undefined){
    let result =arr.filter(element=>element.author===author);
    return result;
  }
  return arr;
}
const filterTitle=(title,arr)=>{
  if(title!==undefined){
    let result =arr.filter(element=>element.title===title);
    return result;
  }
  return arr;
}

const filterYear=(year,arr)=>{
  if(year!==undefined){
    let result =arr.filter(element=>element.publicationYear==year);
    return result;
  }
  return arr;
}
//TODO CHECK HOW TO SEND ARRAYS
const getForParams=(req,res)=>{
  const {author,publicationYear,title,tags}=req.query;
  //Book.getAll
  Book.getAll((books)=>{
    let byAuthor=filterAuthor(author,books);
    let byTitle=filterTitle(title,byAuthor);
    let filtered=filterYear(publicationYear,byTitle);
    res.send({
      values:filtered
    })
  })
}

//delete book
const deleteBook=(req,res)=>{
  const { guid } = req.params;
  // Read all user
  Book.getAll((books) => {
    // Filter by guid
    const bookIdx = books.findIndex(ent => ent.guid === guid);

    if (bookIdx !== -1) {
      books.splice(bookIdx, 1);
      Book.update(books);
      res.send({
        message: 'Book successfully deleted!!!',
      });
    } else {
      res.status(404).send({
        message: 'Ups!!! Book not found.',
      });
    }
  });
}

const updateBook =(req,res)=>{
  const { params: { guid }, body } = req;
  // Read all user
  Book.getAll((books) => {
    // Filter by guid
    const book = books.find(ent => ent.guid === guid);

    if (book) {
      Object.assign(book, body);
      Book.update(books);
      res.send({
        message: 'Book successfully updated!!!',
      });
    } else {
      res.status(404).send({
        message: 'Ups!!! Book not found.',
      });
    }
  });
}

module.exports = {
  getByGUID,
  createBook,
  getForParams,
  deleteBook,
  updateBook
};
