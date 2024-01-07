import React, { useState, useEffect } from "react";

const Home = () => {
  const [valueInput, setValueInput] = useState('');
  const [toBeDone, setToBeDone] = useState([]);
  const [taskCont, setTaskCont] = useState(0);
  let localList = [...toBeDone]


  const API_URL = "https://playground.4geeks.com/apis/fake/todos/user/spirosis";

  
  useEffect(() =>{
    getTasks()
    setTaskCont(localList.length)
  }, [toBeDone])

  const addTask = async (e) => {
    try {
      if (e.key === 'Enter' && valueInput.length != 0) {

          const data = {
              label: valueInput,
              done: false
          }

          localList.push(data)

          await fetch(API_URL, {
              method: 'PUT',
              headers: {
                  'Content-type': 'application/json'
              },
              body: JSON.stringify(localList)
          });
          setValueInput("")

      }
  } catch (e) {
      console.log("addTask function ERROR === ", e)
  }
  };

  const getTasks = async () => {
    try{
      
      await fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setToBeDone(data)
      )
    }
    catch (e) {
      console.log("getTasks error:", e)
      createUser()
      location.reload(true)
    }
  }

  const createUser = async () => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([])
      });
    }
    catch (e) {
      console.log("createUser function ERROR ===", e)
    }
  }

  const deleteTask = async (ele) => {
    try {
      const newTasks = toBeDone.filter((task) =>{ return ele !== task.id});

      await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTasks),
      });
      setValueInput("");
      console.log('deletion completed')
    }
    catch(e) {
      console.error('Error deleting data:', e);
    }
      
  };

  const deleteAllTasks = async () =>{
    try{
      await fetch(API_URL, 
        {method: 'DELETE'})
    }catch (e){
      console.log('deleteAllTasks function ERROR', e)
    }
  };

  return (
    <div className='list container-fluid bg-light '>
      <div>
        <h1 className="title container-fluid text-center">
          Task Manager Quantico
        </h1>
          <div className="input-container text-center">
              <input
                id="newtask"
                type="text"
                placeholder="whats for today?"
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
                onKeyDown= {addTask}
              />
              <button onClick= {addTask} >+</button>
          
          <ul id="tasks">
            <div>

            {toBeDone.map((task, index) => (
              <li 
                className="task"
                key={index}>
                {task.label}
                <button onClick={() => deleteTask(task.id)}>
                &#x2715;
                </button>
              </li>
            ))}

            </div>
          </ul>
        <div className="taskCont">{taskCont} Items left</div>
          </div>
      </div>
    </div>
  );
};

export default Home;
