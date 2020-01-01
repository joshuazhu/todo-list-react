import React, { useContext, useReducer } from 'react';
import { TodoList } from './components/TodoList';
import { TodosContext } from './context';
import { todoReducer } from './reducer';
import { TodoForm } from './components/TodoForm';
import { Auth0Context } from './context/Auth0Context';

export default function App() {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const useAuth0 = () => useContext(Auth0Context);

  const { isAuthenticated, loginWithRedirect, loading, user } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!isAuthenticated &&
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      }

      {
        isAuthenticated &&
        <TodosContext.Provider value={{ state, dispatch }}>
          <div>Hello {user.name}</div>
          <TodoForm />
          <TodoList />
        </TodosContext.Provider>
      }
    </div>
  )
}