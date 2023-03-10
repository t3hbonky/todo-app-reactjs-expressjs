import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('/api/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (newTodo === '') {
      return;
    }
    const res = await axios.post('/api/todos', { title: newTodo });
    setTodos([...todos, res.data]);
    setNewTodo('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    const updatedTodos = todos.filter((todo) => todo._id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = async (id, title) => {
    await axios.put(`/api/todos/${id}`, { title });
    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, title } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title}{' '}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            <input
              type="text"
              value={todo.title}
              onChange={(e) => updateTodo(todo._id, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default App;
