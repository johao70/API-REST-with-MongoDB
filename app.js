const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookROUTER = express.Router();
const port = process.env.PORT || 3000;

bookROUTER.route('/book')
  .get((req, res) => {
    const { query } = req;
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

app.use('/api', bookROUTER);

app.get('/', (req, res) => {
  res.send('Yo puedo todo');
});

app.get('/yavirac', (req, res) => {
  const response = { saludo: 'Soy Yavirac' };
  res.json(response);
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
