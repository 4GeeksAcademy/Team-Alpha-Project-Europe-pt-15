import React, { useState, useEffect } from "react";

export const Dash = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch(`https://reimagined-memory-6997496wxx6x3qvq-3001.app.github.dev/users`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status + "Something went wrong");
      })
      .then((data) => {
        console.log(data); // Do something with the data if needed
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addTask = async () => {
    if (newTaskName.trim() !== "") {
      const newTask = { label: newTaskName };

      try {
        const response = await fetch(`https://reimagined-memory-6997496wxx6x3qvq-3001.app.github.dev/task`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });

        if (!response.ok) {
          throw new Error("Failed to add task");
        }

        const data = await response.json();
        setTasks([...tasks, data]);
        setNewTaskName("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const updateTask = async (id) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, is_done: false, label: newTaskName };
        }
        return task;
      });

      const response = await fetch(`https://reimagined-memory-6997496wxx6x3qvq-3001.app.github.dev/task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTasks.find((task) => task.id === id)),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTaskIndex = tasks.findIndex((task) => task.id === id);
      if (updatedTaskIndex !== -1) {
        const updatedTaskList = [...tasks];
        updatedTaskList.splice(updatedTaskIndex, 1);
        setTasks(updatedTaskList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="Class bg-danger mt-2">Wizard</div>
        <div className="Title bg-light mt-2"><h1>Todo Magic task</h1></div>
        <input
          className="Tasker mt-2"
          type="text"
          onChange={(e) => setNewTaskName(e.target.value)}
          onKeyPress={handleKeyEnter}
          placeholder="Cast your task here"
          maxLength={80}
          value={newTaskName}
        />
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
        <label className="form-check-label">easy</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
        <label className="form-check-label" >medium</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
        <label className="form-check-label" >hard</label>
        </div>

        <button type="button" className="btn btn-danger">Add Task</button>
        <button type="button" className="btn btn-danger">Fight</button>
        <button type="button" className="btn btn-warning">Edit Profile</button>
        <button type="button" className="btn btn-primary">Reward</button>
        <button type="button" className="btn btn-primary">Logout</button>

      
            
      <div className="TaskRemover mt-2">
        {tasks.length > 0 &&
          tasks.map((task, index) => (
            <div className="ListTasks d-flex container p-0" key={index}>
              <div className="navbar navbar-light bg-light container p-4">
                <p className="Newtasks mb-0">{task.label}</p>
                <span className="spanIcone">
                  <i className="fa-solid fa-ban " onClick={() => updateTask(task.id)}></i>
                </span>
              </div>
            </div>
          ))}
      </div>
      </div>
    </>
  );
};












