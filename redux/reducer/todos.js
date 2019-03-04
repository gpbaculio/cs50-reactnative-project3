import {
  SET_FILTER,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILED,
  TOGGLE_COMPLETE_ALL_REQUEST,
  TOGGLE_COMPLETE_ALL_SUCCESS,
  TOGGLE_COMPLETE_ALL_FAILED,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILED,
  EDIT_TODO_REQUEST,
  EDIT_TODO_SUCCESS,
  EDIT_TODO_FAILED,
  TOGGLE_TODO_REQUEST,
  TOGGLE_TODO_SUCCESS,
  TOGGLE_TODO_FAILED,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILED,
  CLEAR_COMPLETED_REQUEST,
  CLEAR_COMPLETED_SUCCESS,
  CLEAR_COMPLETED_FAILED,
  LOGOUT_USER
} from '../types';

initialState = {
  filter: 'All',
  todoIds: [],
  todos: {},
  error: null,
  loading: {
    fetchTodos: false,
    toggleAll: false,
    addTodo: false,
    editTodo: false,
    toggleTodo: false,
    deleteTodo: false,
    clearCompleted: false
  },
  endReached: false
};

const todos = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGOUT_USER:
      return {
        ...initialState
      };
    case SET_FILTER:
      return { ...state, filter: payload.filter };
    case FETCH_TODOS_REQUEST:
      return { ...state, loading: { ...state.loading, fetchTodos: true } };
    case FETCH_TODOS_SUCCESS:
      let endReached = false;
      if (!payload.todoIds.length) {
        endReached = true;
      }
      return {
        ...state,
        todos: { ...state.todos, ...payload.todos },
        todoIds: [...state.todoIds, ...payload.todoIds],
        loading: { ...state.loading, fetchTodos: false },
        endReached
      };
    case FETCH_TODOS_FAILED:
      return {
        ...state,
        loading: { ...state.loading, fetchTodos: false },
        error: payload.error
      };
    case TOGGLE_COMPLETE_ALL_REQUEST:
      return { ...state, loading: { ...state.loading, toggleAll: true } };
    case TOGGLE_COMPLETE_ALL_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, toggleAll: false },
        todos: {
          ...state.todos,
          ...payload.updatedTodos
        }
      };
    case TOGGLE_COMPLETE_ALL_FAILED:
      return {
        ...state,
        loading: { ...state.loading, toggleAll: false },
        error: payload.error
      };
    case ADD_TODO_REQUEST:
      return { ...state, loading: { ...state.loading, addTodo: true } };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: {
          [payload.todo.id]: { ...payload.todo },
          ...state.todos
        },
        todoIds: [payload.todo.id, ...state.todoIds],
        loading: { ...state.loading, addTodo: false }
      };
    case ADD_TODO_FAILED:
      return {
        ...state,
        error: payload.error,
        loading: { ...state.loading, addTodo: false }
      };
    case EDIT_TODO_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, editTodo: true }
      };
    case EDIT_TODO_SUCCESS:
      return {
        ...state,
        todos: {
          ...state.todos,
          [payload.todo.id]: { ...payload.todo }
        },
        loading: { ...state.loading, editTodo: false }
      };
    case EDIT_TODO_FAILED:
      return {
        ...state,
        error: payload.error,
        loading: { ...state.loading, editTodo: false }
      };
    case TOGGLE_TODO_REQUEST:
      return {
        ...state,
        todos: {
          ...state.todos,
          [payload.id]: {
            ...state.todos[payload.id],
            complete: payload.complete
          }
        },
        loading: { ...state.loading, toggleTodo: true }
      };
    case TOGGLE_TODO_SUCCESS:
      return {
        ...state,
        todos: {
          ...state.todos,
          [payload.todo.id]: { ...payload.todo }
        },
        loading: { ...state.loading, toggleTodo: false }
      };
    case TOGGLE_TODO_FAILED:
      return {
        ...state,
        todos: {
          ...state.todos,
          [payload.id]: {
            ...state.todos[payload.id],
            complete: !payload.complete
          }
        },
        error: payload.error,
        loading: { ...state.loading, toggleTodo: false }
      };
    case DELETE_TODO_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, deleteTodo: true }
      };
    case DELETE_TODO_SUCCESS:
      const { deletedId } = payload;
      const { deletedId: removeProp, ...todos } = state.todos;
      const todoIds = state.todoIds.filter(id => id !== deletedId);
      return {
        ...state,
        todos,
        todoIds,
        loading: { ...state.loading, deleteTodo: false }
      };
    case DELETE_TODO_FAILED:
      return {
        ...state,
        error: payload.error,
        loading: { ...state.loading, deleteTodo: false }
      };
    case CLEAR_COMPLETED_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, clearCompleted: true }
      };
    case CLEAR_COMPLETED_SUCCESS:
      return {
        ...state,
        todos: payload.todos,
        todoIds: payload.todoIds,
        loading: { ...state.loading, clearCompleted: false }
      };
    case CLEAR_COMPLETED_FAILED:
      return {
        ...state,
        error: payload.error,
        loading: { ...state.loading, clearCompleted: false }
      };
    default:
      return state;
  }
};

export default todos;
