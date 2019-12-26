import React, { useContext, useReducer } from 'react';
import { TodoList } from './components/TodoList';
import { TodosContext } from './context';
import { todoReducer } from './reducer';
import { TodoForm } from './components/TodoForm';


export default function App() {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  )
}