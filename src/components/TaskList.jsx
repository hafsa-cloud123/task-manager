import TaskItem from "./TaskItem";

const EMPTY = {
  All: "No tasks yet. Add your first one above.",
  Active: "Nothing left to do. Nice work.",
  Completed: "No completed tasks yet.",
};

export default function TaskList({ tasks, filter, onToggle, onDelete }) {
  if (tasks.length === 0) return <p className="empty">{EMPTY[filter]}</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
