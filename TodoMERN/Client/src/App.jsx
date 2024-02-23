import { useState } from 'react'
import './App.css'
import { Provider } from 'react-redux';
import { store } from './Store/store';
import Todo from './components/Todo';

function App() {
  

  return (
    <>
    <Provider store={store}>
      <Todo />
    </Provider>
    </>
  )
}

export default App
