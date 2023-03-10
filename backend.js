const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const todoSchema = new mongoose.Schema({
  title: String,
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const { title } = req.body;
  const todo = new Todo({ title });
  const savedTodo = await todo.save();
  res.json(savedTodo);
});

app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  await Todo.findByIdAndUpdate(id, { title });
  res.json({ message: 'Todo updated successfully' });
});

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: 'Todo deleted successfully' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
