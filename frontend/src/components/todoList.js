import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import {BASE_URL} from '../config/config'

export const Todolist = () => {
  const [todoData, settodoData] = useState(null);
  const [update, setupdate] = useState(false);

  const { refreshTodolist } = useContext(AuthContext);
  
  const fetchTodoData = async () => {
    const userId = localStorage.getItem('userId');
    const resp = await axios.post(`${BASE_URL}/gettodos`, { userId: userId });
    setupdate(false);
    // if No todos are there please dont set the values
    if (resp.data.todos.length > 0) {
      settodoData(resp.data.todos);
    }
  };

  useEffect(() => {
    fetchTodoData();
  }, [update, refreshTodolist]);

  // EDIT
  const handleEdit = async (todo) => {
    const title = prompt("New title name");
    if (!title) {
      alert("Please Enter title");
    } else {
      await axios.put(`${BASE_URL}/edittitle/${todo._id}`, {
        Title: title,
      });
      setupdate(true);
    }
  };

  // Add Task
  const handleAdd = async (todo) => {
    const task = prompt("Enter New Task");
    await axios.put(`${BASE_URL}/addtask/${todo._id}`, { Task: task });
    setupdate(true);
  };

  // DELETE
  const handleDelete = async (todoId) => {
    await axios.delete(`${BASE_URL}/deletetodo/${todoId}`);
    setupdate(true);
  };

  // Deletetask
  const taskDelete = async (todo) => {
    const tasknumber = prompt("Enter task number", "0");
    await axios.put(`${BASE_URL}/deletetask/${todo._id}/${tasknumber}`);
    setupdate(true);
  };

  return (
    <div>
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th>Delete</th>
            <th>Edit</th>
            <th>Title</th>
            <th>Task</th>
            <th>No. of tasks</th>
            <th>Add task</th>
            <th>Delete task</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {todoData &&
            todoData.map((todo) => (
              <tr>
                <td>
                  {" "}
                  <button onClick={() => handleDelete(todo._id)}>
                    {" "}
                    Delete{" "}
                  </button>{" "}
                </td>
                <td>
                  {" "}
                  <button onClick={() => handleEdit(todo)}> Edit </button>{" "}
                </td>
                <td className="px-4 py-3 ">{todo.Title}</td>
                <td className="px-4 py-3 ">
                  {todo.Task.map((subtask) => (
                    <li>{subtask}</li>
                  ))}
                </td>

                <td className="px-4 py-3">{todo.Task.length}</td>
                <td>
                  {" "}
                  <button onClick={() => handleAdd(todo)}>
                    {" "}
                    Add task{" "}
                  </button>{" "}
                </td>
                <td>
                  {" "}
                  <button onClick={() => taskDelete(todo)}>
                    {" "}
                    Task No.{" "}
                  </button>{" "}
                </td>
                <td className="px-4 py-3 ">{todo.updatedAt}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
