import React, { useState, useEffect } from "react";

const Home = () => {
  const [valueInput, setValueInput] = useState('Tarea nueva');
  const [toBeDone, setToBeDone] = useState([]);

  const API_URL = "https://playground.4geeks.com/apis/fake/todos/user/spirosis";

  useEffect(() => {
    // Load tasks from the API when the component mounts
    fetch(API_URL)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log('request went through');
          return response.json();
        } else {
          console.log(`Error ${response.status} in request`);
          throw new Error("Failed to fetch data");
        }
      })
      .then(data => {
        setToBeDone(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to run once when component mounts

  const addTask = () => {
    if (valueInput.length === 0) {
      alert("Please, enter a task");
    } else {
      // Create a task object
      const taskObject = {
        label: valueInput,
        done: false,
      };

      // Use the spread operator to update state immutably
      // setToBeDone(prevState => [taskObject, ...prevState]);
      const updatedState = [taskObject, ...prevState];

      // Reset the input field
      setValueInput('');

      // Save tasks to the API
      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(updatedState),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            console.log('Data saved successfully');
            return response.json();
          } else {
            console.log(`Error ${response.status} in request`);
            throw new Error("Failed to save data");
          }
        })
        .catch(error => console.error('Error saving data:', error));
    }
  };

  const deleteTask = (taskIndex) => {
    // Use the spread operator to update state immutably
    setToBeDone(prevState => prevState.filter((_, i) => i !== taskIndex));

    // Save tasks to the API
    fetch(API_URL, {
      method: "PUT",
      body: JSON.stringify(toBeDone),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log('Data saved successfully');
          return response.json();
        } else {
          console.log(`Error ${response.status} in request`);
          throw new Error("Failed to save data");
        }
      })
      .catch(error => console.error('Error saving data:', error));
  };

  return (
    <div className='list'>
      <h1>Task Manager Quantico</h1>
      <ul>
        <li>
          <input
            type="text"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                addTask();
              }
            }}
          />
          <button onClick={addTask}>+</button>
        </li>
        {toBeDone.map((task, index) => (
          <li key={index}>
            {task.label}
            <button onClick={() => deleteTask(index)}>
              <i className="far fa-trash-all">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
              </i>
            </button>
          </li>
        ))}
      </ul>
      <div>{toBeDone.length} Items left</div>
    </div>
  );
};

export default Home;
