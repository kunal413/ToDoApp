import React from 'react';
import { Link } from 'react-router-dom';
import CompletedItems from './CompletedItems';

const Completed = ({ completed,showTodoDetails }) => {

  const handleSubmit = (body) => {
    const url = "/api/v1/todos/update";
    const token = document.querySelector('meta[name="csrf-token"]').content;
    
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        console.log(response);
        window.location.reload(false);
      })
      .catch(() => console.log('An error occurred while adding the todo item'));

      // useEffect(() => {
      //   const url = `/api/v1/todos/show/${params.id}`;
      //   fetch(url)
      //     .then((response) => {
      //       if (response.ok) {
      //         return response.json();
      //       }
      //       throw new Error("Network response was not ok.");
      //     })
      //     .then((response) => setShow(response))
      //     console.log (show)
      //     .catch(() => navigate("/"));

      // }, [params.id]);
  }

  return (
    <div>
      <h4>Completed</h4>
      {completed.map((todo, i) => {
        return (
            <>
          <CompletedItems key={i} todo={todo} handleSubmit={handleSubmit} />
          </>
        )
      })}
    </div>
  )
}

export default Completed;