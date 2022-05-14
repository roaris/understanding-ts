import React from 'react';
import TodoList from './components/TodoList';

// function App() {
//   return <div className='App'></div>;
// }

// FC: Function Componentの略
const App: React.FC = () => {
  const todos = [{ id: 't1', text: 'TypeScriptコースの完了' }];
  return (
    <div className='App'>
      <TodoList items={todos} />
    </div>
  );
};

export default App;
