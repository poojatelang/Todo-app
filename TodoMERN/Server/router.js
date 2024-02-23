const express = require('express');
const Todo = require('./BlogTodo');

const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    checked: req.body.checked || false,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a todo by ID
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT to update a todo by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH to toggle a todo's checked status by ID
router.patch('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.checked = !todo.checked;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
