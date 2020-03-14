import React, { useContext, useReducer, useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { TodosContext } from './context';
import { todoReducer } from './reducer';
import { TodoForm } from './components/TodoForm';
import { Auth0Context } from './context/Auth0Context';

export default function App() {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const useAuth0 = () => useContext(Auth0Context);

  const { isAuthenticated, loginWithRedirect, loading, user, getTokenSilently, getIdTokenClaims } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  getTokenSilently().then(token => console.log('token', token))
  getIdTokenClaims().then(token => console.log('token', token))

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
