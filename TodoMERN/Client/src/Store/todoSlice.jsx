// todoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  const response = await axios.get('/api/todos');
  return response.data;
});

export const addTodo = createAsyncThunk('todo/addTodo', async todo => {
  const response = await axios.post('/api/todos', todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async id => {
  await axios.delete(`/api/todos/${id}`);
  return id;
});

export const editTodo = createAsyncThunk('todo/editTodo', async ({ id, newText }) => {
  const response = await axios.put(`/api/todos/${id}`, { text: newText });
  return response.data;
});

export const toggleTodo = createAsyncThunk('todo/toggleTodo', async id => {
  const response = await axios.patch(`/api/todos/${id}`);
  return response.data;
});

// export const changeTodo = createAsyncThunk('todo/changeTodo', async ({ id, newText }) => {
//   try {
//     // Make an HTTP request to change the todo item
//     const response = await axios.put(`/api/todos/${id}`, { text: newText });
//     // Return the updated todo data
//     return response.data;
//   } catch (error) {
//     // Handle errors
//     throw Error('Failed to change todo item');
//   }
// });

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [], // Ensure that todos is initialized as an array
    status: 'idle',
    error: null,
    input:'',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      // .addCase(changeTodo.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.input = action.payload.id;
      // })
      // .addCase(changeTodo.fulfilled, (state, action) => {
      //   // Handle fulfilled action for changeTodo
      //   // Update the state with the changed todo item
      //   const index = state.todos.findIndex(todo => todo._id === action.payload._id);
      //   if (index !== -1) {
      //     state.todos[index] = action.payload;
      //   }
      // })
      // .addCase(changeTodo.rejected, (state, action) => {
      //   // Handle rejected action for changeTodo
      //   // Update the state with the error message
      //   state.error = action.error.message;
      // })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo._id !== action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo._id === action.payload._id);
        if (index !== -1) {
          state.todos[index].text = action.payload.text;
        }
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo._id === action.payload._id);
        if (index !== -1) {
          state.todos[index].checked = !state.todos[index].checked;
        }
      });
  },
});

export default todoSlice.reducer;
