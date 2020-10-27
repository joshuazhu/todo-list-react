import React, { useContext, useReducer, useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { TodosContext } from './context';
import { todoReducer } from './reducer';
import { TodoForm } from './components/TodoForm';

export default function App() {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <div>
      <TodosContext.Provider value={{ state, dispatch }}>
        <TodoForm />
        <TodoList />
      </TodosContext.Provider>
    </div>
  )
}
