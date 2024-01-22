// api.ts

const baseURL = 'https://dummyjson.com';

export const fetchTodos = async () => {
  const response = await fetch(`${baseURL}/todos`);
  const data = await response.json();
  return data;
};

interface Todo {
  todo?: string;
  completed: boolean;
  userId: number;
}

interface Login {
  username: string;
  password: string;
}

export const login = async (user: Login) => {
  console.log('user', user);
  const response = await fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const fetchTodo = async (id: number) => {
  const response = await fetch(`${baseURL}/todos/${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const addTodo = async (newTodo: Todo) => {
  const response = await fetch(`${baseURL}/todos/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });
  const data = await response.json();
  return data;
};

export const updateTodo = async (
  id: number,
  updatedTodo: {completed: boolean},
) => {
  const response = await fetch(`${baseURL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTodo),
  });
  const data = await response.json();
  return data;
};

export const deleteTodo = async (id: number) => {
  const response = await fetch(`${baseURL}/todos/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};
