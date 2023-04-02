import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export const Todolist = () => {
  const [todoData, settodoData] = useState(null);
  const {userId} = useContext(AuthContext);
  const fetchTodoData = async () => {
    const resp = await axios.post("/gettodos",{userId:userId});
    // console.log(resp);
    
    // if No todos are there please dont set the values
    if (resp.data.todos.length > 0) {
      settodoData(resp.data.todos);
    }};

  useEffect(() => { fetchTodoData(); }, [todoData]);

  // EDIT
  const handleEdit = async (todo) => {
    const title = prompt("New title name");

    if (!title) {
      alert("Please Enter title");
    } else {
      await axios.put(`/edittitle/${todo._id}`, {
        Title: title,
      });
      // console.log(resp);
    }
  };
  // Add Task
  const handleAdd = async (todo) => {
    const task = prompt("Enter New Task");
    await axios.put(`/addtask/${todo._id}`,{Task:task})

    // console.log(resp);
  }
  // DELETE
  const handleDelete = async (todoId) => {
  await axios.delete(`/deletetodo/${todoId}`);
  };
  // Deletetask
  const taskDelete = async(todo) => {
    const tasknumber = prompt("Enter task number","0");
    await axios.put(`/deletetask/${todo._id}/${tasknumber}`)
  }

  
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
              {todoData && todoData.map((todo) => (
                  <tr>
                    <td> <button onClick={() => handleDelete(todo._id)} > Delete  </button> </td>
                    <td> <button onClick={() => handleEdit(todo)} > Edit </button> </td>
                    <td className="px-4 py-3 ">{todo.Title}</td>
                    <td className="px-4 py-3 ">{todo.Task.map(subtask => (<li>{subtask}</li>))}</td>
                    
                    <td className="px-4 py-3">{todo.Task.length}</td>  
                    <td> <button onClick={() => handleAdd(todo)}> Add task </button> </td>
                    <td> <button onClick={() => taskDelete(todo)}> Task No. </button> </td>
                    <td className="px-4 py-3 ">{todo.updatedAt}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
  );
};
