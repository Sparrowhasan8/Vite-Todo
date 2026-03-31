import React, { useState, useEffect } from "react";
import TodoItem from "./@types/TodoItem";
import TodoItemProps from "./@types/TodoItem";
import { useSavedState } from "./hooks/savedState";

const App: React.FC = () => {
  const [todos, setTodos] = useSavedState([], "todos");

  const [newTodo, setNewTodo] = useState<TodoItemProps>({
    id: todos.length > 0 ? todos.length : -1,
    value: "",
    status: false,
  });

  // Theme
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const itemsComplete = todos.filter((t: TodoItem) => t.status).length;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, value: e.target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!newTodo.value.trim()) return;

    setTodos([...todos, newTodo]);
    setNewTodo({
      id: todos.length,
      value: "",
      status: false,
    });
  };

  const handleRemoveClick = (_e: React.MouseEvent, id: number) => {
    setTodos(todos.filter((t: TodoItem) => t.id !== id));
  };

  const handleStatusClick = (_e: React.MouseEvent, id: number) => {
    const updated = todos.map((t: TodoItem) =>
      t.id === id ? { ...t, status: !t.status } : t
    );
    setTodos(updated);
  };

  return (
    <main>
      {/* Theme Toggle */}
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <header>
        <h1>React Todo</h1>
        <h2>by Abul Hasan</h2>
        <span>
          {itemsComplete}/{todos.length} completed
        </span>
      </header>

      <div className="new-todo">
        <form onSubmit={handleSubmit}>
          <label>Add Task</label>
          <div className="new-todo__h">
            <input
              type="text"
              placeholder="Enter task..."
              value={newTodo.value}
              onChange={handleChange}
              required
            />
            <button type="submit">+</button>
          </div>
        </form>
      </div>

      <ul className="todos">
        {todos.map((todo: TodoItem) => (
          <li
            key={todo.id}
            className={todo.status ? "todo todo--complete" : "todo"}
          >
            <span onClick={(e) => handleRemoveClick(e, todo.id)}>
              &times;
            </span>
            <p onClick={(e) => handleStatusClick(e, todo.id)}>
              {todo.value}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;