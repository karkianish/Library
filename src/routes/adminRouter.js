const express = require('express');

const { MongoClient } = require('mongodb');

const debug = require('debug')('app:adminRouter');

const adminRouter = express.Router();

const books = [{
  title: 'A Tale Of Two Cities',
  author: 'Tolstoy',
  description: 'some desc'
},
{
  title: 'c# in depth',
  author: 'jon skeet',
  description: 'deep dive into c#'
}];

adminRouter.route('/')
  .get((req, res) => {
    const connUrl = 'mongodb://localhost:27017';
    const dbName = 'LibraryApp';

    (async function insertBooks() {
      let client;
      try {
        client = await MongoClient.connect(connUrl);

        const database = client.db(dbName);

        const result = await database.collection('books').insertMany(books);
        client.close();
        res.json(result);
      } catch (error) {
        debug(error.stack);
      }
    }());
  });

module.exports = adminRouter;
