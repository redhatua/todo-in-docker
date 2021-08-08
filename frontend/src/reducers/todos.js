import {
    ADD_TODO_FAILURE,
    ADD_TODO_STARTED,
    ADD_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
    DELETE_TODO_STARTED,
    DELETE_TODO_SUCCESS,
    GET_TODO_FAILURE,
    GET_TODO_STARTED,
    GET_TODO_SUCCESS, GET_VERSION_FAILURE, GET_VERSION_STARTED, GET_VERSION_SUCCESS
} from "../consts";

const initState = {
    loading: false,
    todos: [],
    php: '',
    symfony: '',
    error: null
};

export default function rootReducer(state = initState, action) {
    switch (action.type) {
        case ADD_TODO_STARTED:
            return {
                ...state,
                loading: true
            };
        case ADD_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                todos: [...state.todos, action.payload]
            };
        case ADD_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case DELETE_TODO_STARTED:
            return {
                ...state,
                loading: true
            };
        case DELETE_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                todos: [...state.todos.filter(todo => todo.id !== action.payload.id)]
            };
        case DELETE_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case GET_TODO_STARTED:
            return {
                ...state,
                loading: true,
            }
        case GET_TODO_SUCCESS:
            return {
                ...state,
                todos: [...state.todos, ...action.payload],
                loading: false,
            }
        case GET_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case GET_VERSION_STARTED:
            return {
                ...state,
                loading: true,
            }
        case GET_VERSION_SUCCESS:
            return {
                ...state,
                php: action.payload.php,
                symfony: action.payload.symfony,
                loading: false,
            }
        case GET_VERSION_FAILURE:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}
