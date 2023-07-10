import React ,{useState} from "react";

const Show = () =>{

    const [selectedTodo, setSelectedTodo] = useState(null);
    const showAddTodo = () => {
        setSelectedTodo(null);
      };

      const showTodoDetails = (id) => {
        const url = `/api/v1/todos/${id}`; // Replace "id" with the actual ID of the todo item
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            setSelectedTodo(response);
          })
          .catch(() => console.log('An error occurred while fetching the todo item'));
      };  
      {filteredPending.map(todo => (
        <div key={todo.id}>
          <span>{todo.title}</span>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => showTodoDetails(todo.id)}
          >
            View Details
          </button>
        </div>
      ))}
      {selectedTodo && (
        <div>
          <h2>{selectedTodo.title}</h2>
          <p>{selectedTodo.description}</p>
          {/* Display other details of the selected todo item */}
        </div>
      )}
    return(
     <h1>dfgfsf</h1>
    )
}
export default Show;