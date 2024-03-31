let TODOS = [];

//FETCH ALL TODOS

const fetchTodos = async () => {
  try {
    const response = await fetch("/todos");
    const data = await response.json();
    TODOS = data;
    displayTodos(data);
  } catch (error) {
    console.log("Error in fetching TODOS: " + error);
  }
};

const deleteTodo = async (id) => {
  console.log("Deleting! todo: " + id);
  try {
    const response = await fetch(`/todos/${id}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      const data = await response.json();
      console.log("Error deleting the todo : " + data.message);
    } else {
      location.reload();
    }
  } catch (error) {
    console.log("Error in fetching TODOS: " + error);
  }
};

const editTodo = async (id) => {
  const newTitle = prompt("todo: ");
  console.log("Updating todo: " + id);
  try {
    const response = await fetch(`/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });
    if (response.status !== 200) {
      const data = await response.json();
      console.log("Error while updating todo: " + data.message);
    } else {
      location.reload();
    }
  } catch (error) {
    console.log("Error in fetching TODOS: " + error);
  }
};

const displayTodos = (data) => {
  const showTodos = document.getElementById("todos");
  showTodos.innerHTML = "";
  if (TODOS.length === 0) {
    document.getElementById(
      "todos"
    ).innerHTML = `<div class=no-task>No Todos</div>`;
  }
  data.forEach((todo) => {
    let todoEl = document.createElement("li");

    let todoContent = document.createElement("span");
    todoContent.textContent = todo.title;

    let todoDelete = document.createElement("button");
    todoDelete.textContent = "Delete";

    todoDelete.addEventListener("click", () => deleteTodo(todo._id));

    let todoEdit = document.createElement("button");
    todoEdit.textContent = "Edit";

    todoEdit.addEventListener("click", () => editTodo(todo._id));

    todoEl.appendChild(todoContent);
    todoEl.appendChild(todoEdit);
    todoEl.appendChild(todoDelete);
    showTodos.appendChild(todoEl);
  });
};

document.getElementById("addTodo").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;

  try {
    const response = await fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    const data = await response.json();
    if (response.status === 201) {
      // add todo to DB
      fetchTodos();
    } else {
      console.log("Error adding todo : ", data.message);
    }
  } catch (error) {
    console.log("Error: " + error);
  }

  document.getElementById("title").value = "";
});

window.addEventListener("DOMContentLoaded", () => {
  fetchTodos();
});
