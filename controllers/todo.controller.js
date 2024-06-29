const todos = [];

const getTodos = (req, res) => {
  res.status(200).json(todos);
};

const getTodoAtIndex = (req, res) => {
  const { index } = req.params;

  const todoIndex = parseInt(index);

  if (isNaN(todoIndex) || todos.length < todoIndex || todoIndex < 0) {
    res.status(400).json({ error: "cannot get todo at this index" });
  } else {
    res.status(200).json({ todo: todos[index] });
  }
};

const addTodo = (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    res.status(400).json({ error: "missing todo" });
  } else {
    todos.push(todo);
    res.status(200).json(todos);
  }
};

const updateTodoAtIndex = (req, res) => {
  const { todo } = req.body;
  const { index } = req.params;

  const todoIndex = parseInt(index);

  if (isNaN(todoIndex) || todos.length < todoIndex || todoIndex < 0) {
    res.status(400).json({ error: "cannot update todo at this index" });
  } else if (!todo) {
    res.status(400).json({ error: "missing todo" });
  } else {
    todos[index] = todo;
    res.status(200).json(todos);
  }
};

const deleteTodoAtIndex = (req, res) => {
  const { index } = req.params;

  const todoIndex = parseInt(index);

  if (isNaN(todoIndex) || todos.length < todoIndex || todoIndex < 0) {
    res.status(400).json({ error: "index is invalid" });
  } else {
    todos.splice(todoIndex, 1);
    res.status(200).json({ message: "todo removed", data: todos });
  }
};

module.exports = {
  getTodos,
  getTodoAtIndex,
  addTodo,
  updateTodoAtIndex,
  deleteTodoAtIndex,
};
