const express = require('express');

const app = express();
app.use(express.json()); 

app.set('view engine', 'ejs');
app.set('views', './views');

const books = [
  { id: '1', title: 'Intro to Programming', author: 'A. Student' },
  { id: '2', title: 'Basics of Web', author: 'B. Coder' },
  { id: '3', title: 'Data Structures', author: 'C. Algorithms' }
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'title and author are required' });
  const newId = (books.length + 1).toString();
  const book = { id: newId, title, author };
  books.push(book);
  res.status(201).json(book);
});

app.get('/', (req, res) => {
  res.render('index');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
