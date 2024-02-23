import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  input: '',
  todo: local(),
  toggle: true,
  editcheck: null,
  check: '',
  checkToggle: false,
};

function local() {
  try {
    const storedTodo = JSON.parse(localStorage.getItem("todoreact"));
    return Array.isArray(storedTodo) ? storedTodo : [];
  } catch (error) {
    console.error("Error parsing stored todo:", error);
    return [];
  }
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    handleSubmit: state => {
        let updatedTodo;
        if (state.toggle) {
            updatedTodo = [
                ...state.todo,
                { text: state.input, checked: false },
            ];
        } else {
            updatedTodo = [...state.todo];
            updatedTodo[state.editcheck] = {
                text: state.input,
                checked: updatedTodo[state.editcheck].checked,
            };
        }
        localStorage.setItem("todoreact", JSON.stringify(updatedTodo));
        state.todo = updatedTodo;
        state.toggle = true; // Change toggle state to indicate editing or submitting
        state.editcheck = null;
        state.input = "";
    },
    
      
    handleChange: (state, action) => {
      state.input = action.payload;
    },
    handleDelete: (state, action) => {
      state.todo = state.todo.filter((_, index) => index !== action.payload);
      localStorage.setItem("todoreact", JSON.stringify(state.todo));
    },
    handleEdit: (state, action) => {
      state.input = action.payload.item.text;
      state.toggle = false;
      state.editcheck = action.payload.id;
    //   localStorage.setItem("todoreact", JSON.stringify(state));
    },
    handleCheckbox: (state, action) => {
      state.todo = state.todo.map((item, index) => {
        if (index === action.payload) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      localStorage.setItem("todoreact", JSON.stringify(state.todo));
    },
  },
});

export const { handleSubmit, handleChange, handleDelete, handleEdit, handleCheckbox } = todoSlice.actions;

export default todoSlice.reducer;
