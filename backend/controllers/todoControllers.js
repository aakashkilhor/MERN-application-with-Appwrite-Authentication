const { Client, Account, ID } = require("appwrite");
// LOGIC, BL

const Todo = require("../models/todoModel");

const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("642016d52afec2866e77");

exports.home = (req, res) => {
  res.send("Hello  Alpha ");
};

exports.signup = async (req, res) => {
  try {
    const account = new Account(client);
    let data = req.body;
    console.log(data);
    const promise = await account.create(
      ID.unique(),
      data.email,
      data.password
    );
    console.log(promise);
    res.status(200).send(promise);
  } catch (error) {
    res.status(error.code).send(error.response);
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const account = new Account(client);

    const promise = await account.createEmailSession(
      req.body.email,
      req.body.password
    );

    res.status(200).send(promise);
  } catch (error) {
    console.log(error.code);
    res.status(error.code).send({ message: "Invalid credentials" });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { Title, Task, userId } = req.body;
    // To check if title exists
    if (!Title) {
      throw new Error("Title is required");
    }
    if(!userId){
      throw new Error("login")
    }
    const todo = await Todo.create({ Title, Task, userId });
    res.status(201).json({
      success: true,
      message: "Todo Created Successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find(req.body);
    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addtask = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      $push: { Task: req.body.Task },
    });
    console.log(req.body);
    res.status(200).json({
      success: true,
      message: "Todo updated Successfully",
    });
  } catch (error) {
    console.log("Element not pushed");
    // success:false
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deletetask = async (req, res) => {
  try {
    let taskNumber = parseInt(req.params.n) - 1;
    const todo = await Todo.findById(req.params.id);
    todo.Task.splice(taskNumber, 1);
    await todo.save();
    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editTitle = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      Title: req.body.Title,
    });
    res.status(200).json({
      success: true,
      message: "Title updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletetodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findByIdAndDelete(todoId);
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
