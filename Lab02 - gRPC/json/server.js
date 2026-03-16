const express = require('express');
const BookSerializer = require('./serializers/book.serializer'); 
const app = express();

app.get('/api/books/:id', (req, res) => {
  const bookData = {
    id: req.params.id,
    title: 'Computer Architecture',
    isbn: '123456789012',
    author: 'Chukiat Worasucheep'
  };

  const jsonApiData = BookSerializer.serialize(bookData);
  
  res.set('Content-Type', 'application/vnd.api+json');
  
  res.send(jsonApiData);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`JSON:API Server is running on http://localhost:${PORT}/api/books/1`);
});