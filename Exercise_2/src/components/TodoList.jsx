const initialTasks = [
  { id: 1, task: "Learn React Basics" },
  { id: 2, task: "Understand JSX" },
  { id: 3, task: "Practice useState" },
  { id: 4, task: "Build a Todo App" },
];

function TodoList() {
  return (
    <section className="section">
      <h2 className="section-title">✅ Todo List</h2>

      <ul className="todo-list">
        {initialTasks.map((item) => (
          <li key={item.id} className="todo-item">
            <span className="todo-task">📌 {item.task}</span>
            <button className="btn btn-danger btn-sm">🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
