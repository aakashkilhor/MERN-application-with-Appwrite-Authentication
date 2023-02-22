// URL PATH
const express = require("express");
const {
  home,
  createTodo,
  getTodos,
  addtask,
  editTitle,
  deletetodo,
  deletetask,
} = require("../controllers/todoControllers");
const router = express.Router();

router.get("/", home);
router.post("/createtodo", createTodo);
router.get("/gettodos", getTodos);
router.put("/addtask/:id",addtask);
router.put("/deletetask/:id/:n",deletetask);
router.put("/edittitle/:id", editTitle);
router.delete("/deletetodo/:id", deletetodo);
module.exports = router;
