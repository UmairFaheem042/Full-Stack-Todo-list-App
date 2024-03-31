const express = require("express");
const router = express.Router();
// importing todo Scheme
const todo = require("../models/notes.modules.js");

// get all todos

router.get("/", async (req, res) => {
  try {
    const todos = await todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get todo by single Id
router.get("/:id", async (req, res) => {
  try {
    const todoById = await todo.findById(req.params.id);
    if (!todoById) return res.status(404).json({ message: "Todo not found!" });
    res.json(todoById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create todo
router.post("/", async (req, res) => {
  const createTodo = new todo({
    title: req.body.title,
  });

  try {
    const newTodo = await createTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update todo
router.put("/:id", async (req, res) => {
  try {
    const todoById = await todo.findById(req.params.id);
    if (!todoById) return res.status(404).json({ message: "Todo not found!" });

    if (req.body.title) todoById.title = req.body.title;

    const updatedTodo = await todoById.save();
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete todo
router.delete("/:id", async (req, res) => {
  try {
    const todoById = await todo.findById(req.params.id);
    if (!todoById) return res.json(404).json({ message: "Todo not found" });

    await todoById.deleteOne();
    res.json({ message: "Deleted Todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
