
import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import Pending from './Pending';
import Completed from './Completed';

const Home = () => {
  const [todos, setTodos] = useState({});
  const [loading, setLoading] = useState(true);
  const [addTodo, setAddTodo] = useState(false);
  const [todo, setTodo] = useState('');
  const [completed, setCompleted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCheckboxChange = () => {
    setCompleted(!completed);
  };

  useEffect(() => {
    const url = "/api/v1/todos/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        setTodos(response);
        setLoading(false);
      })
      .catch(() => console.log('An error occurred while fetching the todos'));
  }, []);

  const showAddTodo = () => {
    setAddTodo(true);
  };

  const cancelAdd = () => {
    setAddTodo(false);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (todo === '') return;

    const todoBody = {
      title: todo,
      completed: completed
    };

    const url = "/api/v1/todos/create";
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todoBody)
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
  };

  const filteredPending = todos.pending
    ? todos.pending.filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredCompleted = todos.completed
    ? todos.completed.filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="vw-100 vh-100 primary-color d-flex justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Todo</h1>
          <p className="lead">
            A curated list of Todo for the best homemade meal and delicacies.
          </p>

          <hr className="my-4" />
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleChange}
            />
           
          </div>
           <br />
          {!addTodo && (
            <button
              type="button"
              className="btn btn-primary align-right"
              onClick={showAddTodo}
            >
              Add Todo
            </button>
          )}

          {addTodo && (
            <form className="add-todo" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="col-9">
                  <input
                    type="text"
                    className="form-control-plaintext mr-3"
                    autoFocus
                    placeholder="Todo Item"
                    onChange={(e) => setTodo(e.target.value)}
                  />
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    checked={completed}
                    onChange={handleCheckboxChange}
                  /><span>check here</span>
                </div>
                <button type="submit" className="btn btn-primary col mr-2">
                  Add
                </button>
                <button
                  className="btn btn-outline-primary col"
                  onClick={cancelAdd}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <Loader />
          ) : (
            <div>
              <Pending pending={filteredPending} />
              <hr className="my-4" />
              <Completed completed={filteredCompleted} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React, { useState, useEffect } from 'react';
// import Loader from './Loader';
// import Pending from './Pending';
// import Completed from './Completed';

// const Home = () => {
//   const [todos, setTodos] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [addTodo, setAddTodo] = useState(false);
//   const [todo, setTodo] = useState('');
//   const [completed, setCompleted] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTodo, setSelectedTodo] = useState(null); // New state variable

//   const handleCheckboxChange = () => {
//     setCompleted(!completed);
//   };

//   useEffect(() => {
//     const url = "/api/v1/todos/index";
//     fetch(url)
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error("Network response was not ok.");
//       })
//       .then(response => {
//         setTodos(response);
//         setLoading(false);
//       })
//       .catch(() => console.log('An error occurred while fetching the todos'));
//   }, []);

//   const showAddTodo = () => {
//     setSelectedTodo(null); // Set selectedTodo to null
//   };

//   const showTodoDetails = (id) => {
//     const url = `/api/v1/todos/show/${id}`; // Replace "id" with the actual ID of the todo item
//     fetch(url)
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error("Network response was not ok.");
//       })
//       .then(response => {
//         setSelectedTodo(response);
//       })
//       .catch(() => console.log('An error occurred while fetching the todo item'));
//   };

//   const cancelAdd = () => {
//     setAddTodo(false);
//   };

//   const handleChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (todo === '') return;

//     const todoBody = {
//       title: todo,
//       completed: completed
//     };

//     const url = "/api/v1/todos/create";
//     const token = document.querySelector('meta[name="csrf-token"]').content;

//     fetch(url, {
//       method: "POST",
//       headers: {
//         "X-CSRF-Token": token,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(todoBody)
//     })
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error("Network response was not ok.");
//       })
//       .then(response => {
//         console.log(response);
//         window.location.reload(false);
//       })
//       .catch(() => console.log('An error occurred while adding the todo item'));
//   };

//   const filteredPending = todos.pending
//     ? todos.pending.filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()))
//     : [];
//   const filteredCompleted = todos.completed
//     ? todos.completed.filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()))
//     : [];

//   return (
//     <div className="vw-100 vh-100 primary-color d-flex justify-content-center">
//       <div className="jumbotron jumbotron-fluid bg-transparent">
//         <div className="container secondary-color">
//           <h1 className="display-4">Todo</h1>
//           <p className="lead">
//             A curated list of ToDO for the best homemade meal and delicacies.
//           </p>

//           <hr className="my-4" />
        

//           <div className="form-group">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={handleChange}
//             />
//           </div>
//            <br />
//           {!addTodo && (
//             <button
//               type="button"
//               className="btn btn-primary align-right"
//               onClick={showAddTodo}
//             >
//               Add Todo
//             </button>
//           )}

//           {addTodo && (
//             <form className="add-todo" onSubmit={handleSubmit}>
//               <div className="form-row">
//                 <div className="col-9">
//                   <input
//                     type="text"
//                     className="form-control-plaintext mr-3"
//                     autoFocus
//                     placeholder="Todo Item"
//                     onChange={(e) => setTodo(e.target.value)}
//                   />
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id="exampleCheck1"
//                     checked={completed}
//                     onChange={handleCheckboxChange}
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary col mr-2">
//                   Add
//                 </button>
//                 <button
//                   className="btn btn-outline-primary col"
//                   onClick={cancelAdd}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}

//           {loading ? (
//             <Loader />
//           ) : (
//             <div>
//               <Pending pending={filteredPending} showTodoDetails={showTodoDetails} /> {/* Pass showTodoDetails function as prop */}
//               <hr className="my-4" />
//               <Completed completed={filteredCompleted} showTodoDetails={showTodoDetails} /> {/* Pass showTodoDetails function as prop */}
//             </div>
//           )}

//           {selectedTodo && ( // Display selected todo item details
//             <div>
//               <h2>{selectedTodo.title}</h2>
//               {/* Display other details of the selected todo item */}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

