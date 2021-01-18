const initialState = {
    data:[]
};

const IS_COMPLETE = false; 

const todos = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                data: [
                    ...state.data,
                    {
                        message: action.message,
                        date: action.date,
                        id: action.id,
                        isComplete: IS_COMPLETE
                    }
                ]
            }
        case 'DELETE_TODO':
            const todos = state.data.filter((todo) => todo.id !== action.id)
            return {
                ...state,
                data: todos
            }
        
        case 'EDIT_TODO':
            const updatedTodos = state.data.map((todo) => {
                if(todo.id === action.id) {
                    todo.message = action.message;
                    todo.date = action.date;
                }
                return todo;
            })

            return {
                ...state,
                data: updatedTodos
            }

        case 'UPDATE_STATUS':
            const updatedStatus = state.data.map((todo) => {
                if(todo.id === action.id) {
                    todo.isComplete = action.isComplete;
                }
                return todo;
            })

            return {
                ...state,
                data: updatedStatus
            }
            
        default:
            return state
    }
}

export default todos;