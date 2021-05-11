// Modules
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// Path to users.json
const p = path.join(path.dirname(require.main.filename), 'data', 'books.json');

module.exports = class Book{
  constructor(data){
    const {title, author,publicationYear,tags} = data;
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.tags = tags;
    this.guid=uuid.v4();
  }

  //save book
  save() {
    // We read the file everytime we need to modify it
    fs.readFile(p, (err, data) => {
      let books = [];
      if (!err) {
        books = JSON.parse(data);
      }
      books.push(this);
      // Write the file
      fs.writeFile(p, JSON.stringify(books), (err) => console.log(err));
    })
  }

  //return guid of book
  getGuid() {
    return this.guid;
  }
  static update(books) {
    fs.writeFile(p, JSON.stringify(books), (err) => console.log(err));
  }

  //get all books
  static getAll(cb){
    fs.readFile(p,(err,data)=>{
      let books = [];
      if(!err){
        books = JSON.parse(data);
      }
      cb(books);
    });
  }
  
}