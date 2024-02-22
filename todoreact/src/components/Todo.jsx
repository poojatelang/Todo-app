import React, { useState, useEffect } from 'react';

const Todo = () => {
    const [input, setInput] = useState('');
    const [todo, setTodo] = useState(() => {
        try {
            const storedTodo = JSON.parse(localStorage.getItem("todoreact"));
            return Array.isArray(storedTodo) ? storedTodo : [];
        } catch (error) {
            console.error("Error parsing stored todo:", error);
            return [];
        }
    });
    const [toggle, setToggle] = useState(true);
    const [editIndex, setEditIndex] = useState(null);
    const [check, setCheck] = useState('');
    const [checkToggle, setCheckToggle] = useState(false);

    useEffect(() => {
        localStorage.setItem("todoreact", JSON.stringify(todo));
    }, [todo]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.trim()) return;
        if (toggle) {
            setTodo([...todo, { text: input, checked: false }]);
        } else {
            let updatedTodo = [...todo];
            updatedTodo[editIndex] = { text: input, checked: false };
            setTodo(updatedTodo);
            setToggle(true);
            setEditIndex(null);
        }
        setInput('');
    }

    function handleChange(e) {
        setInput(e.target.value);
    }

    function handleDelete(id) {
        setTodo(todo.filter((_, index) => index !== id));
    }

    function handleEdit(item, id) {
        setInput(item);
        setToggle(false);
        setEditIndex(id);
    }

    function handleCheckbox(id) {
        setCheck(id);
        setCheckToggle(!checkToggle);
        setTodo(todo.map((item, index) => {
            if (index === id) {
                return { ...item, checked: !item.checked };
            }
            return item;
        }));
    }

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
                                onChange={() => handleCheckbox(index)}
                            />
                            <span className={item.checked ? 'checked' : ''}>
                                {item.text}
                            </span>
                            <button onClick={() => handleDelete(index)}>
                                Delete
                            </button>
                            <button onClick={() => handleEdit(item.text, index)}>
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
