import React, { useState, useEffect } from 'react'
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const url = process.env.REACT_APP_URL;

  //get
  const getTodo = () => {
    const allTodo = {
      "query": `query {
        todos {
          id
          task
          completed
        }
      }`,
    };
    
    fetch(url, {
      method: 'POST',
      headers: {
         "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env.REACT_APP_KEY
      },
      body: JSON.stringify(allTodo)
  })
  .then(res => res.json())
  .then(res => {
        setTodos(res.data.todos);
        console.log('Success:', res);
      })
  }

  useEffect(() => {
    getTodo()
  }, [])

  //add
  const addTodo = () => {
    const newTodo = {
      "query": `mutation{
        insert_todos_one(object: {
          task: ${title},
          completed: true
        }), {
          id
          task
        }
      }`
    }

    fetch(url, {
        method: 'POST',
        headers: {
           "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-hasura-admin-secret": process.env.REACT_APP_KEY
        },
        body: JSON.stringify(newTodo)
    })
    .then(res => res.json())
    .then(res => {
      console.log('Success:', res);
    })
  }

  //del
  const deletTodo = (e) => {
    const delTodo = {
      "query": `mutation{
        delete_todos_by_pk(
          id: ${e} 
          ), {
          id
        }
      }`
    }
    fetch(url, {
      method: 'POST',
      headers: {
         "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-hasura-admin-secret": process.env.REACT_APP_KEY
      },
      body: JSON.stringify(delTodo)
  })
  .then(res => res.json())
  .then(res => {
    console.log('Success:', res);
  })
    
  }

  return (
    <div className="App">
      <h3>List Todos
      {process.env.DOMAIN}
      </h3>

      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTodo}>
        click
      </button>

      {todos.map((todo) => {
        return (
          <p key={todo.id}>
            {todo.task}
            <button type="submit" onClick={() => deletTodo(todo.id)}>x {todo.id} </button>
          </p>
        )
      })}
    </div>
  );
}