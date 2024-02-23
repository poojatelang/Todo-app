export const submitTodo = () => ({
    type: 'HANDLE_SUBMIT'
  });
  
  export const changeInput = (value) => ({
    type: 'HANDLE_CHANGE',
    payload: value
  });
  
  export const deleteTodo = (id) => ({
    type: 'HANDLE_DELETE',
    payload: id
  });
  
  export const editTodo = (item, id) => ({
    type: 'HANDLE_EDIT',
    payload: { item, id }
  });
  
  export const toggleCheckbox = (id) => ({
    type: 'HANDLE_CHECKBOX',
    payload: id
});