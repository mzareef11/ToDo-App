
const toDoInput = document.querySelector('#todoInput');
const addButton = document.querySelector('#addButton');
const list = document.querySelector('#todoList');

addButton.addEventListener('click', addTodo);

let items = [];

function done(index) {
    let doneButton = document.querySelector(`.index${index}`);
    let editButton = document.querySelector(`.edit-index${index}`);
    let editInputField = document.querySelector(`.edit-input${index}`);
    let value = document.querySelector(`.value${index}`);
    let editedValue = editInputField.value;
    value.textContent = editedValue;
    doneButton.style.display = "none";
    editButton.style.display = "block";
    editInputField.style.display = "none";
    value.style.display = "block";
    items.splice(index, 1, editedValue);
    saveData();
}

function renderItems() {
    list.innerHTML = "";
    for(let i = 0; i < items.length; i++) {
        list.innerHTML += `
        <li class="todo-item">
            <div class="todo-item-value">
                <input type="text" class="edit-input${i}" name="input" id="" />
                <p class="value${i}">${items[i]}</p>
            </div>
            <div class="buttons">
                <button class="done-button index${i}" value="btn" onclick="done(${i})" id="doneButton">Done</button>
                <button class="edit-button edit-index${i}" value="${i}" onclick="editTodo(${i})" id="editButton">Edit</button>
                <button class="delete-button" value="${i}" onclick="deleteTodo(${i})" id="deleteButton">Delete</button>
            </div>
        </li>`;
    }
}

function addTodo() {
    if (toDoInput.value.trim() == "") {
        toDoInput.value = "";
        return;
    }
    items.push(toDoInput.value);
    renderItems();
    toDoInput.value = "";
    saveData();
}

function deleteTodo(index) {
    items.splice(index, 1);
    if (items.length === 0) {
        displayMessage();
    } else {
        renderItems();
    }
    saveData();
}

function editTodo(index) {
    let editInputField = document.querySelector(`.edit-input${index}`);
    let editButton = document.querySelector(`.edit-index${index}`);
    let doneButton = document.querySelector(`.index${index}`);
    let value = document.querySelector(`.value${index}`);
    value.style.display = "none";
    editButton.style.display = "none";
    doneButton.style.display = "block";
    editInputField.style.display = "block";
    editInputField.value = value.textContent;
    editInputField.focus();
}

function saveData() {
    localStorage.setItem("items", JSON.stringify(items));
}

function getData() {
    let data = localStorage.getItem("items");
    items = JSON.parse(data) || [];
    if (items.length === 0) {
        displayMessage();
    } else {
        renderItems();
    }
}

getData();

function displayMessage() {
    list.innerHTML = `<p class="emptyMsg">Your To-Do list is empty. Add some tasks!</p>`;
}
