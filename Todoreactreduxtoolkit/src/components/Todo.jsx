import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleSubmit, handleChange, handleDelete, handleEdit, handleCheckbox } from '../Store/todoSlice';

const Todo = () => {
  const dispatch = useDispatch();
  const todo = useSelector(state => state.todo.todo);
  const toggle = useSelector(state => state.todo.toggle);
  const input = useSelector(state => state.todo.input);
 

  const onSubmit = e => {
    e.preventDefault();
    dispatch(handleSubmit());
  };

  const onChange = e => {
    dispatch(handleChange(e.target.value));
  };

  return (
    <>
      <h1>Todo List</h1>
      <form className="addForm" onSubmit={onSubmit}>
        <input
          type="text"
          id="item"
          value={input}
          onChange={onChange}
          placeholder="Enter todo"
        />
        <input
          type="submit"
          id="submit"
          value={toggle?"Submit":'Edit'}
        />
      </form>
      <ul id="items">
        {todo && todo.length > 0 ? (
          todo.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => dispatch(handleCheckbox(index))}
              />
              <span className={item.checked ? 'checked' : ''}>
                {item.text}
              </span>
              <button className="delete"onClick={() => dispatch(handleDelete(index))}>
                Delete
              </button>
              <button className="edit"onClick={() => dispatch(handleEdit({ item, id: index }))}>
                Edit
              </button>
            </li>
          ))
        ) : (
          <li>No todos</li>
        )}
      </ul>
    </>
  );
};

export default Todo;
