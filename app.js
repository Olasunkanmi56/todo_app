const  theme = document.getElementById("theme");
const Input = document.getElementById("addItem");
const todoList = document.querySelector(".main-content ul");
const itemsLeft = document.querySelector(".items-left span");

itemsLeft.innerText = document.querySelectorAll('.list-item input[type="checkbox"]').length;

theme.addEventListener("click", () => {
    document.querySelector("body").classList = [theme.checked? 'theme-light': 'theme-dark'];
});

document.querySelector('.add-items span').addEventListener('click', () => {
     if(Input.value.length > 0) {
         createNewTodoItem(Input.value);
         Input.value ="";
     }
});

Input.addEventListener('keypress', (e) => {
    if (e.charCode === 13 && Input.value.length > 0) {
        createNewTodoItem(Input.value);
        Input.value = '';
    }
});

let todos = JSON.parse(localStorage.getItem("todos"));
if(todos){
    todos.forEach(element => {
        createNewTodoItem(element);
    })
}

function createNewTodoItem(text){
    const elem = document.createElement("li");
    elem.classList.add("content");

    elem.innerHTML = `
    <label class="list-item">
    <input type="checkbox" name="todoItem" checked>
    <span class="checkmark"></span>
    <span class="text">${text}</span>
    </label>
  <span class="remove"></span>
  `;
  
  if (document.querySelector('.filter input[type="radio"]:checked').id === 'completed') {
    elem.classList.add('hidden');
}
  todoList.append(elem);
  updateLs()
  updateItemsCount(1);
}

function updateItemsCount(number) {
    itemsLeft.innerText = +itemsLeft.innerText + number;
}

// remove todo item

function removeTodoItem(elem) {
    elem.remove();
    updateLs()
    updateItemsCount(-1);
}

todoList.addEventListener("click", (event) => {
    if(event.target.classList.contains("remove")) {
        removeTodoItem(event.target.parentElement);
    }
});

// clear comleted items

document.querySelector('.clear').addEventListener('click', () => {
    document.querySelectorAll('.list-item input[type="checkbox"]:checked').forEach(item => {
        removeTodoItem(item.closest('li'));
        updateLs()
    });
});

// filter todo list items 
document.querySelectorAll(".filter input").forEach(radio => {
    radio.addEventListener("change", (e) => {
        filterTodoItems(e.target.id);
    });
});

function filterTodoItems(id) {
    const allItems = todoList.querySelectorAll('li');

    switch(id) {
        case 'all':
            allItems.forEach(item => {
                item.classList.remove('hidden');
            })
            break;
        case 'active':
            allItems.forEach(item => {
                item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');;
            })
            break;
        default: 
            allItems.forEach(item => {
                !item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');;
            })
            break;
    }
}


function updateLs() {
    let text = document.querySelectorAll(".text")
    let arr = [];
    text.forEach(element => {
        arr.push({
            text:element.innerText
    })
    });
    localStorage.setItem("todos", JSON.stringify(arr));
}

