import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const user = useSelector((state) => state.user);
  const [projectName, setProjectName] = useState("");
  const [tasks, setTasks] = useState([]);
  const taskInputs = ["Name", "Description"];
  const navigate = useNavigate();

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      {
        name: "",
        description: "",
        createdAt: new Date,
        updatedAt: new Date,
      },
    ]);
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleTaskChange = (index, key, value) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, [key]: value } : task
    );
    setTasks(newTasks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, `users/${user.id}/projects/`), {
      name: projectName,
      tasks: tasks,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    setProjectName("");
    setTasks([]);

    navigate(`/project/${docRef.id}`);
  };

  return (
    <div className="container p-4">
      <h2 className="my-4 font-bold text-2xl">Create New Project</h2>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group text-left">
          <input
            type="text"
            name="projectName"
            id="projectName"
            className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <label
            htmlFor="projectName"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Project Name
          </label>
        </div>

        {tasks.map((task, index) => (
          <div
            key={index}
            className="border-gray-500 border p-4 my-4 relative rounded-md"
          >
            <div
              onClick={() => handleRemoveTask(index)}
              className="absolute top-2 right-2 cursor-pointer border border-slate-700 p-1 text-red-600 rounded-full "
            >
              &#10060;
            </div>
            <h3>Task {index + 1}</h3>
            {taskInputs.map((name) => (
              <div
                key={name}
                className="relative z-0 w-full mb-5 group text-left"
              >
                <input
                  type="text"
                  name={`task_${name.toLowerCase()}`}
                  id={`task_${name.toLowerCase()}`}
                  className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={task[name.toLowerCase()]}
                  onChange={(e) =>
                    handleTaskChange(index, name.toLowerCase(), e.target.value)
                  }
                  required
                />
                <label
                  htmlFor={`task_${name.toLowerCase()}`}
                  className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Task {name}
                </label>
              </div>
            ))}
          </div>
        ))}

        <div className="mb-5">
          <button
            type="button"
            onClick={handleAddTask}
            className="bg-green-400 px-5 ml-2 py-1 rounded text-white font-bold"
          >
            Add Task
          </button>
        </div>

        <button
          type="submit"
          className="text-white my-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default NewProject;
