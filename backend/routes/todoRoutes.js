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
  login,
  signup
} = require("../controllers/todoControllers");
const router = express.Router();

router.get("/", home);
router.post("/login",login)
router.post("/signup",signup)
router.post("/createtodo", createTodo);
router.post("/gettodos", getTodos);
router.put("/addtask/:id",addtask);
router.put("/deletetask/:id/:n",deletetask);
router.put("/edittitle/:id", editTitle);
router.delete("/deletetodo/:id", deletetodo);
module.exports = router;
