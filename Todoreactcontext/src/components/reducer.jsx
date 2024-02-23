const Todoreducer = (state, action) => {
    if (action.type === "HANDLE_SUBMIT") {
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
    }
    if (action.type === "HANDLE_CHANGE") {
        let value = action.payload;
        return {
            ...state,
            input: value,
        };
    }
    if (action.type === "HANDLE_DELETE") {
        let id = action.payload;
        let updatedtodo = state.todo.filter((_, index) => index !== id);
        return {
            ...state,
            todo: updatedtodo,
        };
    }
    if (action.type === "HANDLE_EDIT") {
        let { item, id } = action.payload;
        return {
            ...state,
            input: item.text,
            toggle: false,
            editcheck: id,
        };
    }
    if (action.type === "HANDLE_CHECKBOX") {
        console.log('check')
        let { id } = action.payload;
        let updatedtodo = state.todo.map((item, index) => {
            if (index === id) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
    
        // localStorage.setItem("todoreact", JSON.stringify(updatedtodo));
        return {
            ...state,
            todo: updatedtodo,
            // check:id,
        };
    }
};

export default Todoreducer;