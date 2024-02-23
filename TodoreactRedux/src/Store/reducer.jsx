
function local() {
  try {
    const storedTodo = JSON.parse(localStorage.getItem("todoreact"));
    return Array.isArray(storedTodo) ? storedTodo : [];
  } catch (error) {
    console.error("Error parsing stored todo:", error);
    return [];
  }
}
const initialState = {
  input: '',
  todo: local(),
  toggle: true,
  editcheck: null,
  check: '',
  checkToggle: false,
};


const todoReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'HANDLE_SUBMIT':
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
          checked: false,
        };
      }
      return {
        ...state,
        todo: updatedTodo,
        toggle: true,
        editcheck: null,
        input: "",
      };
    case 'HANDLE_CHANGE':
      return {
        ...state,
        input: action.payload,
      };
    case 'HANDLE_DELETE':
      return {
        ...state,
        todo: state.todo.filter((_, index) => index !== action.payload),
      };
    case 'HANDLE_EDIT':
      return {
        ...state,
        input: action.payload.item.text,
        toggle: false,
        editcheck: action.payload.id,
      };
    case 'HANDLE_CHECKBOX':
      let updatedtodo = state.todo.map((item, index) => {
        if (index === action.payload) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });

      return {
        ...state,
        todo: updatedtodo,
      };
    default:
      return state;
  }
};

export default todoReducer;
