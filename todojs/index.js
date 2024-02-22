window.onload = () => {
    const form1 = document.querySelector(".addForm");
    const items = document.getElementById("items");
    const submit = document.getElementById("submit");
    
    // Retrieve saved todos from localStorage
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    // Populate the todo list with saved todos
    savedTodos.forEach(todo => {
        todotask(todo);
    });

    form1.addEventListener("submit", addItem);
    let editItem;
};

function addItem(e) {
    e.preventDefault();
    todotask();
}

function todotask(task) {
     if (submit.value !== "Submit") {
        editItem.target.parentNode.childNodes[0].data = document.getElementById("item").value;
        submit.value = "Submit";
        document.getElementById("item").value = "";
        saveTodos();
        return false;
    }

    let newItem = document.getElementById("item").value;
    if (task) {
        newItem = task.name;
    }
    if (newItem == "" || newItem == null)
        return false;
    else
        document.getElementById("item").value = "";

    let li = document.createElement("li");
    li.innerText = newItem;
    if (task && task.checked) {
        li.classList.add("checked");
      }
   
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.innerText = 'Delete';

    let editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.appendChild(document.createTextNode("Edit"));
    
    let checkButton = document.createElement("input");
    checkButton.setAttribute("type", "checkbox");
    
    checkButton.className = "check";
    // editButton.appendChild(document.createTextNode(""));

     if (task && task.checked) {
        checkButton.checked = true;
    }
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    li.appendChild(checkButton);
    items.appendChild(li);

    deleteButton.addEventListener('click', (e) => {
        if (confirm("Are you sure you want to delete this task?")) {
            let li = e.target.parentNode;
            items.removeChild(li);
            saveTodos();
        }
    });

    editButton.addEventListener('click', (e) => {
        document.getElementById("item").value = e.target.parentNode.childNodes[0].data;
        submit.value = "EDIT";
        editItem = e;
        saveTodos();
    });
    checkButton.addEventListener('change', (e) => {
        li.classList.toggle("checked", e.target.checked);
        saveTodos();
    });

    // Save todos to localStorage
    saveTodos();
}

function saveTodos() {
    const items = document.getElementById("items");
    const todos = [];
    items.querySelectorAll("li").forEach(li => {
        todos.push({
            name:li.childNodes[0].data,
            checked:li.classList.contains("checked"),
        });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}




























