const reducers = (state, action) => {
   switch (action.type) {
      case 'TODO':
         return {
            ...state,
            todos: {
               ...state.todos,
               todo: [action.payload, ...state.todos.todo],
            },
         }
      case 'IN_PROGRESS':
         return {
            ...state,
            todos: {
               ...state.todos,
               in_progress: [action.payload, ...state.todos.in_progress],
            },
         }
      case 'DONE':
         return {
            ...state,
            todos: {
               ...state.todos,
               done: [action.payload, ...state.todos.done],
            },
         }
      case 'CLEAR_TODOS':
         return {
            ...state,
            todos: {
               todo: [],
               in_progress: [],
               done: [],
            },
         }
      case 'EDIT_TODO':
         return {
            ...state,
            isEditing: true,
            editingTodo: action.payload,
         }
      case 'EXIT_EDITING': {
         return {
            ...state,
            isEditing: false,
            editingTodo: {},
         }
      }
      default:
         return state
   }
}

export default reducers
