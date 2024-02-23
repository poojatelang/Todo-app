import React, { useContext } from 'react'
import { AppContext } from './Context'

const Todo = () => {
    const {handleChange,handleSubmit,
        handleCheckbox,
        handleDelete,handleEdit,todo
    ,input,toggle}=useContext(AppContext)
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
                                onChange={() => handleCheckbox({id:index})}
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