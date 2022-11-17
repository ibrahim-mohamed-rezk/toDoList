import { useState } from 'react';
import './App.css';
import EditToDo from './component/EditToDo';
import ToDoBody from './component/ToDoBody';

function App() {
  const [edit, setEdit] = useState(false);
  const [toDoIndex, setToDoIndex] = useState();
  const [todos, setTodos] = useState([]);

  if (localStorage.getItem("todos") == null) {
    localStorage.setItem("todos", "");
  }

  return (
    <div className="App">
      {edit || (
        <ToDoBody
          edit={edit}
          setEdit={setEdit}
          todos={todos}
          setTodos={setTodos}
          setToDoIndex={setToDoIndex}
        />
      )}
      {!edit || <EditToDo toDoIndex={toDoIndex} setEdit={setEdit} />}
    </div>
  );
}

export default App;
