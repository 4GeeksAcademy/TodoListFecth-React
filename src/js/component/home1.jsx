import React, { useState, useEffect } from "react";

const Home = () => {
  const [valueInput, setValueInput] = useState('Tarea nueva');
  const [toBeDone, setToBeDone] = useState([]);

  const API_URL = "https://playground.4geeks.com/apis/fake/todos/user/spirosis";

  useEffect(() => {
    // Load tasks from the API when the component mounts
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setToBeDone(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Save tasks to the API whenever the tasks state changes
    fetch(API_URL, {
      method: "PUT",
      body: JSON.stringify(toBeDone),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data saved:', data);
      })
      .catch(error => console.error('Error saving data:', error));
  }, [toBeDone]);

  const addTodo = () => {
    if (valueInput.length === 0) {
      alert("Please, enter a task");
    } else {
      setToBeDone([valueInput, ...toBeDone]);
      setValueInput('');
    }
  };

  const deleteTodo = (index) => {
    const newTodo = toBeDone.filter((_, i) => i !== index);
    setToBeDone(newTodo);
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
                addTodo();
              }
            }}
          />
          <button onClick={addTodo}>+</button>
        </li>
        {toBeDone.map((text, index) => (
          <li key={index}>
            {text}
            <button onClick={() => deleteTodo(index)}>
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
