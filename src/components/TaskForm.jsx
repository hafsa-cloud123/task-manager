import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) {
      setError("Write a task before adding it.");
      return;
    }
    onAdd(value);
    setText("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="task-form">
        <input
          type="text"
          value={text}
          className={error ? "invalid" : ""}
          placeholder="What needs doing?"
          aria-label="New task"
          onChange={(e) => {
            setText(e.target.value);
            setError("");
          }}
        />
        <button type="submit">Add task</button>
      </div>
      <p className="form-error" role="alert">{error}</p>
    </form>
  );
}
