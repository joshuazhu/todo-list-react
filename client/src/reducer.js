const todoReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_TODO":
      const toggledTodos = state.todos.map(t => t.id === action.payload.id ?
        {
          ...action.payload,
          complete: !action.payload.complete
        } : t);

      return {
        ...state,
        todos: toggledTodos
      }

    case "REMOVE_TODO":
      const filteredTodos = state.todos.filter(t => t.id !== action.payload.id);

      return {
        ...state,
        todos: filteredTodos
      }

      case "ADD_TODO":
        return {
          ...state,
          todos: [
            ...state.todos,
            action.payload
          ]
        }
    default:
      return state
  }
}

export { todoReducer };