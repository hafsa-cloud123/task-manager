export default function Header({ total, completed }) {
  const active = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const r = 70;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - percent / 100);

  return (
    <header className="panel">
      <div className="intro">
        <h1>Task Manager</h1>
        <p>Plan it, do it, tick it off.</p>
      </div>

      <div className="ring" role="img" aria-label={`${percent} percent complete`}>
        <svg width="100%" height="100%" viewBox="0 0 168 168">
          <circle className="track" cx="84" cy="84" r={r} />
          <circle
            className="bar"
            cx="84"
            cy="84"
            r={r}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="ring-label">
          <strong>{percent}%</strong>
          <span>done</span>
        </div>
      </div>

      <div className="stats">
        <div className="stat"><b>{total}</b><small>Total</small></div>
        <div className="stat"><b>{active}</b><small>Active</small></div>
        <div className="stat"><b>{completed}</b><small>Done</small></div>
      </div>
    </header>
  );
}
