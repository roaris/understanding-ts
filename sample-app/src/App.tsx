import React from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

// function App() {
//   return <div className='App'></div>;
// }

// FC: Function Componentの略
const App: React.FC = () => {
  const todos = [{ id: 't1', text: 'TypeScriptコースの完了' }];
  const todoAddHandler = (text: string) => {
    console.log(text);
  };
  return (
    <div className='App'>
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} />
    </div>
  );
};

export default App;
