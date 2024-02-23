// Todo.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, editTodo, toggleTodo, fetchTodos } from '../Store/todoSlice';

const Todo = () => {
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todo.todos);
//   const input = useSelector(state => state.todo.input);
  const [input, setInput] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    if (input.trim() !== '') {
      dispatch(addTodo({ text: input, checked: false }));
      setInput('');
    }
  };

  const handleDelete = id => {
    dispatch(deleteTodo({ id }));
  };

  const handleEdit = (id, newText) => {
    dispatch(editTodo({ id, newText }));
  };

  const handleToggle = id => {
    dispatch(toggleTodo({ id }));
  };
  const handleChange=(e)=>{
    let id=e.target.value
    setInput(id)
    // dispatch(changeTodo({id}))
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e)=>handleChange(e)}
          placeholder="Enter todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todoList&&todoList>0?
        todoList.map(todo => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => handleToggle(todo._id)}
            />
            <span style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
            <button onClick={() => handleEdit(todo._id, prompt('Enter new text', todo.text))}>
              Edit
            </button>
          </li>
        )):<div>No Todo</div>
    }
      </ul>
    </div>
  );
};

export default Todo;
