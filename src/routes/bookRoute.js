const express = require('express');

const bookRouter = express.Router();

const { MongoClient, ObjectId } = require('mongodb');

const debug = require('debug')('app:bookRouter');

let books;
bookRouter.route('/')
  .get((req, res) => {
    const connUrl = 'mongodb://localhost:27017';
    const dbName = 'LibraryApp';
    (async function getBooks() {
      let client;
      try {
        client = await MongoClient.connect(connUrl);
        const db = client.db(dbName);
        const collection = await db.collection('books');
        books = await collection.find().toArray();
        client.close();
        res.render('bookListView', {
          books
        });
      } catch (err) {
        debug(err.stack);
      }
    }());
  });

bookRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const connUrl = 'mongodb://localhost:27017';
    const dbName = 'LibraryApp';
    (async function getBooks() {
      let client;
      try {
        client = await MongoClient.connect(connUrl);
        const db = client.db(dbName);
        const collection = await db.collection('books');
        const book = await collection.findOne({ _id: new ObjectId(id) });
        debug(book);
        client.close();
        res.render('bookView', {
          book
        });
      } catch (err) {
        debug(err.stack);
      }
    }());
  });

module.exports = bookRouter;
