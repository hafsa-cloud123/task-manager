import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const FILTERS = ["All", "Active", "Completed"];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("tasks"));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch {
      /* storage unavailable (private mode / blocked) - app still works */
    }
  }, [tasks]);

  const addTask = (text) =>
    setTasks((prev) => [{ id: Date.now() + Math.random(), text, completed: false }, ...prev]);

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const clearCompleted = () => setTasks((prev) => prev.filter((t) => !t.completed));

  const completed = tasks.filter((t) => t.completed).length;

  const visible = tasks.filter((t) =>
    filter === "Active" ? !t.completed : filter === "Completed" ? t.completed : true
  );

  return (
    <div className="app">
      <Header total={tasks.length} completed={completed} />
      <main className="board">
        <TaskForm onAdd={addTask} />
        <div className="filters" role="group" aria-label="Filter tasks">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <TaskList
          tasks={visible}
          filter={filter}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
        {completed > 0 && (
          <button className="clear-btn" onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </main>
    </div>
  );
}
