const ADD_TODO = 'ADD_TODO';
export const addTodo = (message, date) => ({
    type: ADD_TODO,
    message,
    date,
    id: Math.random()
});

const DELETE_TODO = 'DELETE_TODO';
export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    id
});

const EDIT_TODO = 'EDIT_TODO';
export const editTodo = (id, message, date) => ({
    type: EDIT_TODO,
    message,
    date,
    id
});

const UPDATE_STATUS = 'UPDATE_STATUS';
export const updateStatus = (id, isComplete) => ({
    type: UPDATE_STATUS,
    id,
    isComplete
});