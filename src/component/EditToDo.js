import React, { useState } from 'react'

const EditToDo = ({todos, setTodos, toDoIndex, setEdit}) => {

    const [editInput, setEditInput] = useState('')

    const EditToDo = ()=>{
        todos[toDoIndex] = editInput
        const newTodo = [...todos]
        setTodos(newTodo)
        setEdit(false)
    }

  return (
    <div>
        <h1 className='title'>Edit ToDo</h1>

        <div className='ToDoBody' >
            <form onSubmit={EditToDo} className='toDoForm'>
                <input 
                    type='text' 
                    className='addToDoInput' 
                    value={editInput} 
                    onChange={(e) =>{setEditInput(e.target.value)}} 
                    placeholder='Edit TODO '
                    maxLength='50' 
                />
                <button  className='addToDoBtn'>Edit</button>
            </form>
        </div>

    </div>
  )
}

export default EditToDo