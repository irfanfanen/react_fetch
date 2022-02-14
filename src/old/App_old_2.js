import './App.css';
import React, { useState, useEffect } from 'react'

const uri  = ''
const GET_QUERY = {
  "query": ` query GetTodos {
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

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(uri, options)
    .then(res => res.json())
    .then(res => {
      setTodos(res.data.todos);
    })
  }, [])

  return (
    <div className="App">
      <h3>List Todos </h3>
      {todos.map((todo, index) => (
                <p key={index}> {todo.id} </p>
            ))}
    </div>
  );
}
