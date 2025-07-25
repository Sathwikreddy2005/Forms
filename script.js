let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo;
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;
  let deleteIconId = "delete" + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked = todo.isChecked;
  inputElement.classList.add("checkbox-input");
  inputElement.onclick = function () {
    onTodoStatusChange(checkboxId, labelId);
  };
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  if (todo.isChecked) {
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.id = deleteIconId;
  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
  };
  deleteIconContainer.appendChild(deleteIcon);
}

function onTodoStatusChange(checkboxId, labelId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle("checked");

  let todoIndex = todoList.findIndex(function (todo) {
    let todoId = "todo" + todo.uniqueNo;
    return todoId === checkboxElement.parentElement.id;
  });
  todoList[todoIndex].isChecked = checkboxElement.checked;
}

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);

  let deleteIndex = todoList.findIndex(function (todo) {
    let todoIdStr = "todo" + todo.uniqueNo;
    return todoIdStr === todoId;
  });
  todoList.splice(deleteIndex, 1);
}

function onAddTodo() {
  let userInputElement = document.getElementById("todoUserInput");
  let userInputValue = userInputElement.value;

  if (userInputValue === "") {
    alert("Enter Valid Text");
    return;
  }

  let todoCount = todoList.length;
  todoCount = todoCount + 1;

  let newTodo = {
    text: userInputValue,
    uniqueNo: todoCount,
    isChecked: false,
  };

  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInputElement.value = "";
}

function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

addTodoButton.onclick = function () {
  onAddTodo();
};

saveTodoButton.onclick = function () {
  saveTodoList();
};

for (let todo of todoList) {
  createAndAppendTodo(todo);
}
