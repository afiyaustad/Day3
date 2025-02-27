import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useTheme } from "../context/ThemeContext";

const socket = io("http://localhost:5000");

const TaskDashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [assignee, setAssignee] = useState("");

  useEffect(() => {
    socket.on("loadTasks", (loadedTasks) => setTasks(loadedTasks));
    socket.on("taskUpdated", (updatedTasks) => setTasks(updatedTasks));
    socket.on("notification", (message) => alert(`🔔 Notification: ${message}`));

    return () => {
      socket.off("loadTasks");
      socket.off("taskUpdated");
      socket.off("notification");
      socket.disconnect();
    };
  }, []);

  const addTask = () => {
    if (newTask.trim() !== "" && assignee.trim() !== "") {
      const task = { id: Date.now(), title: newTask, assignee };
      socket.emit("addTask", task);
      setTasks((prevTasks) => [...prevTasks, task]); 
      setNewTask("");
      setAssignee("");
    }
  };

  const deleteTask = (id) => {
    socket.emit("deleteTask", id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); 
  };

  return (
    <div className={`min-h-screen p-4 transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>

        <button onClick={toggleTheme} className="p-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition">
          {theme === "light" ? "Dark Mode 🌙" : "Light Mode ☀️"}
        </button>
      </div>

      <div className="flex gap-2 mt-4">
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task" className="p-2 border rounded w-1/3" />
        <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)}
          placeholder="Task Assignee" className="p-2 border rounded w-1/3" />
        <button onClick={addTask} className="p-2 bg-blue-500 text-white rounded w-1/5">Add Task</button>
      </div>

      {/* ✅ Table with Proper Borders */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border border-gray-600 dark:border-gray-400 border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 border border-gray-600 dark:border-gray-400">
              <th className="border border-gray-600 dark:border-gray-400 p-2">Task</th>
              <th className="border border-gray-600 dark:border-gray-400 p-2">Assignee</th>
              <th className="border border-gray-600 dark:border-gray-400 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border border-gray-600 dark:border-gray-400">
                <td className="border border-gray-600 dark:border-gray-400 p-2">{task.title}</td>
                <td className="border border-gray-600 dark:border-gray-400 p-2">{task.assignee}</td>
                <td className="border border-gray-600 dark:border-gray-400 p-2">
                  <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:underline">Delete ❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TaskDashboard;
