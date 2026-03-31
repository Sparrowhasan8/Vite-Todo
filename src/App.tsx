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

  // ✅ THEME STATE (FIXED)
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const itemsComplete = todos.filter((t: TodoItem) => t.status).length;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ id: newTodo.id, value: event.target.value, status: false });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setTodos([...todos, newTodo]);
    setNewTodo({
      id: todos.length,
      value: "",
      status: false,
    });
  };

  const handleRemoveClick = (_event: React.MouseEvent, id: number) => {
    setTodos(todos.filter((t: TodoItem) => t.id !== id));
  };

  const handleStatusClick = (_event: React.MouseEvent, id: number) => {
    let items = [...todos];
    let index = todos.findIndex((t: TodoItem) => t.id === id);
    items[index].status = !items[index].status;
    setTodos(items);
  };

  return (
    <main>
      {/* ✅ THEME BUTTON (VISIBLE NOW) */}
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <header>
        <h1>React Todo App</h1>
        <h2>Created by Abul Hasan</h2>
        <span>
          Complete: {itemsComplete}/{todos.length}
        </span>
      </header>

      <div className="new-todo">
        <form onSubmit={handleSubmit}>
          <label>Enter a new task</label>
          <div className="new-todo__h">
            <input
              type="text"
              onChange={handleChange}
              value={newTodo.value}
              required
            />
            <button type="submit">+</button>
          </div>
        </form>
      </div>

      <ul className="todos">
        {todos.map((todo: TodoItem) => (
          <li
            className={todo.status ? "todo todo--complete" : "todo"}
            key={todo.id}
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