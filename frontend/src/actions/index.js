import axios from "axios";

import {
    ADD_TODO_STARTED,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    DELETE_TODO_STARTED,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
    GET_TODO_SUCCESS,
    GET_TODO_STARTED,
    GET_TODO_FAILURE,
    GET_VERSION_SUCCESS,
    GET_VERSION_STARTED,
    GET_VERSION_FAILURE,
} from "../consts";

const deleteTodoSuccess = id => ({
    type: DELETE_TODO_SUCCESS,
    payload: { id }
});

const deleteTodoStarted = () => ({
    type: DELETE_TODO_STARTED
});

const deleteTodoFailure = error => ({
    type: DELETE_TODO_FAILURE,
    payload: { error }
});

const addTodoSuccess = todo => ({
    type: ADD_TODO_SUCCESS,
    payload: { ...todo }
});

const addTodoStarted = () => ({
    type: ADD_TODO_STARTED
});

const addTodoFailure = error => ({
    type: ADD_TODO_FAILURE,
    payload: { error }
});

const getTodoSuccess = todo => ({
    type: GET_TODO_SUCCESS,
    payload: { ...todo }
});

const getTodoStarted = () => ({
    type: GET_TODO_STARTED
});

const getTodoFailure = error => ({
    type: GET_TODO_FAILURE,
    payload: { error }
});

const getVersionSuccess = version => ({
    type: GET_VERSION_SUCCESS,
    payload: { ...version }
});

const getVersionStarted = () => ({
    type: GET_VERSION_STARTED
});

const getVersionFailure = error => ({
    type: GET_VERSION_FAILURE,
    payload: { error }
});

const headers = {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
}

export const addTodo = payload => {
    return dispatch => {
        dispatch(addTodoStarted());
        axios
            .post(`http://localhost:8080/save`, {
                content: payload.content,
                name: payload.name,
            }, {headers})
            .then(res => {
                dispatch(addTodoSuccess({ id: res.data, ...payload }));
            })
            .catch(err => {
                dispatch(addTodoFailure(err.message));
            });
    };
};

export const deleteTodo = payload => {
    return dispatch => {
        dispatch(deleteTodoStarted());
        axios
            .delete(`http://localhost:8080/del/${payload}`, {headers})
            .then(res => {
                dispatch(deleteTodoSuccess(payload));
            })
            .catch(err => {
                dispatch(deleteTodoFailure(err.message));
            });
    };
}

export const getTodos = () => {

    return dispatch => {
        dispatch(getTodoStarted());
        axios
            .get(`http://localhost:8080/get`, {headers})
            .then(res => {
                dispatch(getTodoSuccess(res.data));
            })
            .catch(err => {
                dispatch(getTodoFailure(err.message));
            });
    };
}

export const getVersion = () => {
    return dispatch => {
        dispatch(getVersionStarted());
        axios
            .get(`http://localhost:8080/ver`, {headers})
            .then(res => {
                dispatch(getVersionSuccess(res.data));
            })
            .catch(err => {
                dispatch(getVersionFailure(err.message));
            });
    };
}
