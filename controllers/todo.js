const Todo = require("../models/todo");

exports.getAllTodo = async (req, res) => {
  await Todo.find()
    .sort({ createdAt: -1 })
    .then((todos) => res.json(todos))
    .catch((err) =>
      res.status(404).json({ message: "Todo not found", error: err.message })
    );
};

exports.getSearchTodo = async (req, res) => {
  await Todo.find({
    $or: [
      { title: { $regex: req.params.key } },
      { description: { $regex: req.params.key } },
    ],
  })
    .sort({ createdAt: -1 })
    .then((todo) => res.json(todo))
    .catch((err) =>
      res.status(404).json({ message: "Todo not found", error: err.message })
    );
};

exports.getOneTodo = async (req, res) => {
  await Todo.findById(req.params.id)
    .then((todo) => res.json(todo))
    .catch((err) =>
      res.status(404).json({ message: "Todo not found", error: err.message })
    );
};

exports.postCreateTodo = async (req, res) => {
  await Todo.create(req.body)
    .then((data) => res.json({ message: "Todo added successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to add todo", error: err.message })
    );
};

exports.putUpdateTodo = async (req, res) => {
  await Todo.findByIdAndUpdate(req.params.id, req.body)
    .then(
      async (data) => await res.json({ message: "updated successfully", data })
    )
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update todo", error: err.message })
    );
};

exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndRemove(req.params.id, req.body)
    .then((data) => res.json({ message: "todo deleted successfully", data }))
    .catch((err) =>
      res.status(404).json({ message: "book not found", error: err.message })
    );
};
