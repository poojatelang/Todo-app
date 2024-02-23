
import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  submitTodo,
  changeInput,
  toggleCheckbox,
  deleteTodo,
  editTodo,
} from '../Store/action';


// function local() {

//     try {
//         const storedTodo = JSON.parse(localStorage.getItem("todoreact"));
//         return Array.isArray(storedTodo) ? storedTodo : [];
//     } catch (error) {
//         console.error("Error parsing stored todo:", error);
//         return [];
//     }
//   }
const Todo = () => {
    const input = useSelector((state) => state.input);
  const todo = useSelector((state) => state.todo);
  const toggle = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("todoreact", JSON.stringify(todo));
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitTodo());
  };

  const handleChange = (e) => {
    let value = e.target.value;
    dispatch(changeInput(value));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (item, id) => {
    dispatch(editTodo(item, id));
  };

  const handleCheckbox = (id) => {
    dispatch(toggleCheckbox(id));
  };

  return (
    <>
            <h1>Todo List</h1>
            <form className="addForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="item"
                    value={input}
                    onChange={handleChange}
                    placeholder="Enter todo"
                />
                <input
                    type="submit"
                    id="submit"
                    value={toggle ? "Submit" : "Edit"}
                />
            </form>
            <ul id="items">
                {todo && todo.length > 0 ? (
                    todo.map((item, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => handleCheckbox(index)}
                            />
                            <span className={item.checked ? 'checked' : ''}>
                                {item.text}
                            </span>
                            <button onClick={() => handleDelete(index)}>
                                Delete
                            </button>
                            <button onClick={() => handleEdit(item, index)}>
                                Edit
                            </button>
                        </li>
                    ))
                ) : (
                    <li>No todos</li>
                )}
            </ul>
        </>
  )
}

export default Todo