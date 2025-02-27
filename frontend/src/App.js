import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import TaskDashboard from "./components/TaskDashboard";

function App() {
  return (
    <ThemeProvider>
      <div className="p-4">
        <TaskDashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
