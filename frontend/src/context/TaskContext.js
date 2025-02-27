import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to backend

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    socket.on("loadTasks", (loadedTasks) => {
      console.log("Loaded tasks:", loadedTasks);
      setTasks(loadedTasks);
    });

    socket.on("taskUpdated", (updatedTasks) => {
      console.log("Updated tasks:", updatedTasks);
      setTasks(updatedTasks);
    });

    return () => {
      socket.off("loadTasks");
      socket.off("taskUpdated");
    };
  }, []);

  const addTask = (task) => {
    console.log("Adding task:", task);
    socket.emit("addTask", task);
  };

  const deleteTask = (id) => {
    socket.emit("deleteTask", id);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
