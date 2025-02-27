import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskItem = ({ task }) => {
  const { deleteTask } = useContext(TaskContext);

  return (
    <li className="p-2 border-b flex justify-between items-center">
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <small className="text-gray-500">Deadline: {task.deadline}</small>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
