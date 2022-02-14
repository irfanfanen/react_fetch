import React, { useState, useEffect } from 'react'
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const url = process.env.REACT_APP_URL;
  const GET_QUERY = {
    "query": `query {
      todos {
        id
        task
        completed
      }
    }`,
  };
  const options = {
    "method": "POST",
    "headers": {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/json",
      "x-hasura-admin-secret": ""
    },
    body: JSON.stringify(GET_QUERY)
  }
  const getDataTodos = async () => {
    const response = await fetch(url, options)
    const dataku = await response.json()
    const todos = dataku.data.todos
    setTodos(todos)
  }

  useEffect(() => {
    getDataTodos()
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

    fetch('', {
        method: 'POST',
        headers: {
           "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "x-hasura-admin-secret": ""
        },
        body: JSON.stringify(newTodo)
    })
    .then(res => res.json())
    .then(res => {
      console.log('Success:', res);
    })
  }

  //delet
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
    fetch('', {
      method: 'POST',
      headers: {
         "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "x-hasura-admin-secret": ""
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