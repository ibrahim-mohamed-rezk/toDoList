import React, { useState } from 'react'
import './ToDoBody.css'

const ToDoBody = ({edit, setEdit, todos, setTodos, setToDoIndex}) => {

    
    const [toDoInput, setToDoInput] = useState('')


    const addtoDo = (e) =>{
        e.preventDefault();

        const newTodo = [toDoInput, ...todos]
        setTodos(newTodo)
        setToDoInput('');
    }

    const deleteToDo = (index)=>{
        todos.splice(index, 1)
        const newTodo = [...todos]
        setTodos(newTodo)
        
    }
    

        


  return (
    <div>
        <h1 className='title'>what do you want to do today</h1>

        <div className='ToDoBody'>

            <form onSubmit={addtoDo} className='toDoForm'>
                <input 
                    type='text' 
                    className='addToDoInput' 
                    value={toDoInput} 
                    onChange={(e) =>{setToDoInput(e.target.value)}} 
                    placeholder='Type your To Do '
                    maxLength='50' 
                />
                <button  className='addToDoBtn'>Add</button>
            </form>

            <div className='showTODOs'>
                {todos.length > 0 || <h2 className='emptyList'>Add your first task</h2>}
                {todos.length < 0 || todos.map((data, index)=> {
                    return(
                        <div className='todo' key={index} >
                            <p className='toDoContent'>{data}</p>
                            <div className='editBtn' >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="20" 
                                    height="20" fill="currentColor" 
                                    className="bi bi-pencil-square" 
                                    viewBox="0 0 16 16"
                                    onClick={()=> {setEdit(!edit); setToDoIndex(index)}}
                                >
                                    <path 
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path 
                                        fillRule="evenodd" 
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </div>

                            <div className='deleteBtn'>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="20" 
                                    height="20" 
                                    fill="currentColor" 
                                    className="bi bi-trash3-fill" 
                                    viewBox="0 0 16 16"
                                    onClick={()=> {deleteToDo(index)}}
                                >
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                            </div>

                        </div>
                    ) 
                })}
            </div>
        </div>
    </div>
  )
}

export default ToDoBody