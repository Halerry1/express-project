const router = require("express").Router();

// import todo controlle
const todoController = require("../controllers/todo.controller");

router.get("/", todoController.getTodos);
router.get("/:index", todoController.getTodoAtIndex);
router.post("/", todoController.addTodo);
router.put("/:index", todoController.updateTodoAtIndex);
router.delete("/:index", todoController.deleteTodoAtIndex);

module.exports = router;
