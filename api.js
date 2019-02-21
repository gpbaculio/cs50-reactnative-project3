export default {
  user: {
    login: async ({ email, password }) => {
      try {
        const { token } = await fetch('https://reqres.in/api/login', {
          method: 'post',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        return { token, userId: 1 };
      } catch (e) {
        return null;
      }
    }
  },
  todos: {
    getTodos: async ({ page, userId }) => {
      try {
        const todos = await fetch(
          `http://5c6577a119df280014b626f2.mockapi.io/cs50m/api/users/${userId}/todos?p=${page}&l=10`
        );
        return todos;
      } catch (e) {
        return null;
      }
    },
    editText: async ({ todoId, userId, text }) => {
      try {
        const todo = await fetch(
          `http://5c6577a119df280014b626f2.mockapi.io/cs50m/api/users/${userId}/todos/${todoId}`,
          {
            method: 'post',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
          }
        );
        return todo;
      } catch (e) {
        return null;
      }
    },
    toggleComplete: async ({ todoId, userId, complete }) => {
      try {
        const todo = await fetch(
          `http://5c6577a119df280014b626f2.mockapi.io/cs50m/api/users/${userId}/todos/${todoId}`,
          {
            method: 'post',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ complete })
          }
        );
        return todo;
      } catch (e) {
        return null;
      }
    },
    delete: async ({ todoId, userId }) => {
      try {
        await fetch(
          `http://5c6577a119df280014b626f2.mockapi.io/cs50m/api/users/${userId}/todos/${todoId}`,
          {
            method: 'delete',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }
          }
        );
        return true;
      } catch (e) {
        return false;
      }
    }
  }
};
