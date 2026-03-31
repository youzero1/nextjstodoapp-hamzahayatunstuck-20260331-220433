'use client';

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: input.trim(), completed: false },
      ]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h1>Todo App</h1>
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-btn">
            Add
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                ×
              </button>
            </li>
          ))}
        </ul>
        {todos.length === 0 && (
          <p className="empty-state">No tasks yet. Add one above!</p>
        )}
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          max-width: 500px;
        }

        .todo-app {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        h1 {
          font-size: 28px;
          font-weight: 700;
          color: #333;
          margin-bottom: 24px;
          text-align: center;
        }

        .input-group {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }

        .todo-input {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
          transition: border-color 0.2s;
        }

        .todo-input:focus {
          border-color: #667eea;
        }

        .add-btn {
          padding: 12px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .todo-list {
          list-style: none;
        }

        .todo-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 8px;
          transition: all 0.2s;
        }

        .todo-item:hover {
          background: #e9ecef;
        }

        .todo-item.completed .todo-text {
          text-decoration: line-through;
          color: #999;
        }

        .todo-checkbox {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: #667eea;
        }

        .todo-text {
          flex: 1;
          font-size: 16px;
          color: #333;
        }

        .delete-btn {
          width: 28px;
          height: 28px;
          background: #ff6b6b;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
          transition: background 0.2s;
        }

        .delete-btn:hover {
          background: #fa5252;
        }

        .empty-state {
          text-align: center;
          color: #999;
          font-size: 16px;
          padding: 32px 0;
        }
      `}</style>
    </div>
  );
}
