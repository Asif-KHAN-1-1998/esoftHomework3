import React, { useReducer, useEffect } from 'react';
import './index.css'
import { observer } from 'mobx-react-lite';

const loadFromLocalStorage = () => {
  const saved = localStorage.getItem("savedTodos");
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

const initialState = {
  todos: loadFromLocalStorage(),
};



const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log(action)
      const newTodo = {
        id: action.payload.id,
        name: `Задача ${action.payload.id + 1}`,
        status: 'inProcess',
      };
    return {
      ...state,
      todos: [...state.todos, newTodo],
    };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload.id
            ? { ...item, status: item.status === 'inProcess' ? 'done' : 'inProcess' }
            : item
        )}
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload.id),
      };
    default:
      throw new Error('Unknown action');
  }
};


const TodoList = observer(() => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    localStorage.setItem("savedTodos", JSON.stringify(state.todos));
  }, [state.todos]);

  const handleAddTodo = () => {
    dispatch({ type: 'ADD_TODO', payload: { id: state.todos.length } });
  };

  const handleToggle = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  };

  return (
    <>
    <div className="add-todo-form">
      <button onClick={() => handleAddTodo()}>Добавить задачу</button>
    </div>
    <div className="todo-list">
      {state.todos.map((item) => (
        <div key={item.id} className="todo-item">
          <span>{item.name}</span>
          <button onClick={() => handleDelete(item.id)}>Удалить</button>
          <button onClick={() => handleToggle(item.id)}>
                {item.status === 'inProcess' ? 'Выполняется' : 'Выполнено'}
              </button>
    </div>
      ))}
    </div></>
    
  );
});


export default TodoList;