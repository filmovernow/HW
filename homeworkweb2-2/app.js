const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const app = express();
const port = 8000;

app.use(express.json()); 
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let books = [
  { id: 1, name: "Clean Code", category: "Programming", price: 450, stock: 12 },
  { id: 2, name: "JavaScript: The Good Parts", category: "Programming", price: 380, stock: 8 },
  { id: 3, name: "Atomic Habits", category: "Self-Help", price: 320, stock: 20 },
  { id: 4, name: "Deep Work", category: "Self-Help", price: 350, stock: 15 },
  { id: 5, name: "Rich Dad Poor Dad", category: "Finance", price: 290, stock: 25 },
  { id: 6, name: "The Psychology of Money", category: "Finance", price: 340, stock: 18 },
  { id: 7, name: "Harry Potter and the Sorcerer's Stone", category: "Novel", price: 420, stock: 10 },
  { id: 8, name: "The Hobbit", category: "Fantasy", price: 390, stock: 9 },
  { id: 9, name: "Sapiens: A Brief History of Humankind", category: "History", price: 480, stock: 7 },
  { id: 10, name: "Thinking, Fast and Slow", category: "Psychology", price: 460, stock: 6 }
];
let counter = 11;
app.get('/books', (req, res) => {
    const bookList = books.map(book => {
        return {
            id: book.id,
            name: book.name,
            category: book.category,
            priceDisplay: `฿${book.price}`
        };
    });
    res.json(bookList);
});
app.post('/books', (req, res) => {
    let newBook = req.body;

    if (!newBook.name || !newBook.price) {
        return res.status(400).json({ message: "Name and Price are required" });
    }

    newBook.id = counter++;
    books.push(newBook);

    res.status(201).json({
        message: "Book added to inventory",
        data: newBook
    });
});
app.get('/price', (req, res) => {
    const { order = 'asc' } = req.query;

    const result = [...books].sort((a, b) => {
        return order === 'desc'
            ? Number(b.price) - Number(a.price)
            : Number(a.price) - Number(b.price);
    });

    res.json(result);
});
app.get('/books/search/:name', (req, res) => {
    let keyword = req.params.name.toLowerCase();

    let result = books.filter(b =>
        b.name.toLowerCase().includes(keyword)
    );

    if (result.length === 0) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(result);
});
app.get('/books/:id', (req, res) => {
    let id = Number(req.params.id);
    let book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
});
app.put('/books/:id', (req, res) => {
    let id = Number(req.params.id);
    let updateData = req.body;
    let index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books[index].name = updateData.name || books[index].name;
    books[index].category = updateData.category || books[index].category;
    books[index].price = updateData.price || books[index].price;
    books[index].stock = updateData.stock || books[index].stock;

    res.json({
        message: "Update book complete",
        data: books[index]
    });
});
app.delete('/books/:id', (req, res) => {
    let id = Number(req.params.id);
    let index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books.splice(index, 1);

    res.status(204).json({
        message: "Deleted book from inventory successfully",
        indexDeleted: index
    });
});
app.listen(port, () => {
    console.log(`Book Store API & Docs is running:`);
    console.log(`- API: http://localhost:${port}`);
    console.log(`- Docs: http://localhost:${port}/api-docs`);
});