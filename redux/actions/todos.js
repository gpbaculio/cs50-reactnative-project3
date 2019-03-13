import { schema, normalize } from 'normalizr';
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
  EDIT_TODO_REQUEST,
  EDIT_TODO_SUCCESS,
  EDIT_TODO_FAILED,
  TOGGLE_TODO_REQUEST,
  TOGGLE_TODO_SUCCESS,
  TOGGLE_TODO_FAILED,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_REQUEST,
  DELETE_TODO_FAILED,
  CLEAR_COMPLETED_REQUEST,
  CLEAR_COMPLETED_SUCCESS,
  CLEAR_COMPLETED_FAILED
} from '../types';

const todo = new schema.Entity('todos');

export default {
  fetchTodos: page => async (dispatch, getState) => {
    const { id } = getState().user;
    dispatch({ type: FETCH_TODOS_REQUEST });
    await fetch(
      `http://5c6577a119df280014b626f2.mockapi.io/cs50m/api/users/${id}/todos?sortBy=createdAt&order=desc&l=10&p=${page}`
    )
      .then(({ _bodyInit }) => JSON.parse(_bodyInit))
      .then(res => {
        const {
          result: todoIds,
          entities: { todos }
        } = normalize(res, [todo]);
        dispatch({
          type: FETCH_TODOS_SUCCESS,
          payload: { todos, todoIds }
        });
      })
      .catch(error =>
        dispatch({ type: FETCH_TODOS_FAILED, payload: { error } })
      );
  },
  toggleCompleteAll: complete => async (dispatch, getState) => {
    dispatch({ type: TOGGLE_COMPLETE_ALL_REQUEST });
    const {
      todos: { todos, todoIds }
    } = getState();
    const ids = todoIds
      .map(id => todos[id])
      .filter(todo => todo.complete !== complete)
      .map(({ id }) => id);

    try {
      const { id } = getState().user;
      const updatedTodos = await Promise.all(
        ids.map(async todoId => {
          return await fetch(
            `http://5c6577a119df280014b626f2.mockapi.io/cs50m/api/users/${id}/todos/${todoId}`,
            {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ complete })
            }
          ).then(({ _bodyInit }) => JSON.parse(_bodyInit));
        })
      );
      const {
        entities: { todos }
      } = normalize(updatedTodos, [todo]);
      dispatch({
        type: TOGGLE_COMPLETE_ALL_SUCCESS,
        payload: { updatedTodos: todos }
      });
    } catch (error) {
      dispatch({ type: TOGGLE_COMPLETE_ALL_FAILED, payload: { error } });
    }
  },
  addTodo: text => async (dispatch, getState) => {
    const { id } = getState().user;
    dispatch({ type: ADD_TODO_REQUEST });
    await fetch(
      `http://5c6577a119df280014b626f2.mockapi.io/cs50m/api/users/${id}/todos`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, complete: false })
      }
    )
      .then(({ _bodyInit }) => JSON.parse(_bodyInit))
      .then(todo => {
        dispatch({ type: ADD_TODO_SUCCESS, payload: { todo } });
      })
      .catch(error => {
        dispatch({ type: LOGIN_FAILED, payload: { error } });
      });
  },
  editTodo: ({ text, id }) => async (dispatch, getState) => {
    dispatch({ type: EDIT_TODO_REQUEST });
    const { id: userId } = getState().user;
    await fetch(
      `http://5c6577a119df280014b626f2.mockapi.io/cs50m/api/users/${userId}/todos/${id}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      }
    )
      .then(({ _bodyInit }) => JSON.parse(_bodyInit))
      .then(todo => {
        dispatch({ type: EDIT_TODO_SUCCESS, payload: { todo } });
      })
      .catch(error => {
        dispatch({ type: EDIT_TODO_FAILED, payload: { error } });
      });
  },
  toggleTodo: ({ id, complete }) => async (dispatch, getState) => {
    dispatch({ type: TOGGLE_TODO_REQUEST, payload: { id, complete } });
    const { id: userId } = getState().user;
    await fetch(
      `http://5c6577a119df280014b626f2.mockapi.io/cs50m/api/users/${userId}/todos/${id}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ complete })
      }
    )
      .then(({ _bodyInit }) => JSON.parse(_bodyInit))
      .then(todo => {
        dispatch({ type: TOGGLE_TODO_SUCCESS, payload: { todo } });
      })
      .catch(error => {
        dispatch({
          type: TOGGLE_TODO_FAILED,
          payload: { error, id, complete }
        });
      });
  },
  deleteTodo: id => async (dispatch, getState) => {
    dispatch({ type: DELETE_TODO_REQUEST });
    const { id: userId } = getState().user;
    await fetch(
      `http://5c6577a119df280014b626f2.mockapi.io/cs50m/api/users/${userId}/todos/${id}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(({ _bodyInit }) => JSON.parse(_bodyInit))
      .then(({ id }) => {
        dispatch({ type: DELETE_TODO_SUCCESS, payload: { deletedId: id } });
      })
      .catch(error => {
        dispatch({ type: DELETE_TODO_FAILED, payload: { error } });
      });
  },
  clearCompleted: () => async (dispatch, getState) => {
    const {
      todos: { ...todos },
      todoIds
    } = getState().todos;
    const completedIds = todoIds
      .map(id => todos[id])
      .filter(({ complete }) => complete)
      .map(({ id }) => id);
    completedIds.forEach(id => {
      delete todos[id];
    });
    const activeIds = Object.keys(todos).map(id => todos[id].id);
    dispatch({ type: CLEAR_COMPLETED_REQUEST });
    try {
      await Promise.all(
        completedIds.map(async todoId => {
          return await fetch(
            `http://5c6577a119df280014b626f2.mockapi.io/cs50m/api/users/1/todos/${todoId}`,
            {
              method: 'DELETE',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            }
          ).then(({ _bodyInit }) => JSON.parse(_bodyInit));
        })
      );
      dispatch({
        type: CLEAR_COMPLETED_SUCCESS,
        payload: { todos, todoIds: activeIds }
      });
    } catch (error) {
      dispatch({ type: CLEAR_COMPLETED_FAILED, payload: { error } });
    }
  },
  setFilter: filter => dispatch => {
    dispatch({ type: SET_FILTER, payload: { filter } });
  }
};
