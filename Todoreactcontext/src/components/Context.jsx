import { createContext, useReducer,useEffect, useContext } from "react";
import reducer from "./reducer"

export const AppContext = createContext();
function local() {

    try {
        const storedTodo = JSON.parse(localStorage.getItem("todoreact"));
        return Array.isArray(storedTodo) ? storedTodo : [];
    } catch (error) {
        console.error("Error parsing stored todo:", error);
        return [];
    }
}

let initialState = {
    input: '',
    todo: local(),
    toggle: true,
    editcheck: null,
    check: '',
    checkToggle: false,

}
function AppProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)


    function handleSubmit(e) {
        e.preventDefault();
        dispatch({ type: 'HANDLE_SUBMIT' });
    }

    function handleChange(e) {
        let value = e.target.value;
        dispatch({ type: 'HANDLE_CHANGE', payload: value });
    }

    function handleDelete(id) {

        dispatch({ type: 'HANDLE_DELETE', payload: id });
    }

    function handleEdit(item, id) {
        dispatch({ type: 'HANDLE_EDIT', payload: { item, id } });
    }

    function handleCheckbox(id) {
        dispatch({ type: 'HANDLE_CHECKBOX', payload: id });
    }
    useEffect(() => {
        localStorage.setItem("todoreact", JSON.stringify(state.todo));
    }, [state.todo]);

    return (
        <AppContext.Provider
            value={{
                ...state,
                handleChange,
                handleCheckbox,
                handleDelete,
                handleEdit,
                handleSubmit,

            }}>
            {children}
        </AppContext.Provider>
    )
}
// const useAppContext = () => {
//     return useContext(AppContext);
// };
export default AppProvider




