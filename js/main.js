let input = document.querySelector('#input-task'),
    btnAdd = document.querySelector('#input__btn-add'),
    btnRemove = document.querySelector('#input__btn-remove'),
    todo = document.querySelector('.todo');

let todoList = [] //Массив в который будут складываться все задачи

// Если в Local Storage есть сохранённые данные, то они выводятся экран
if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

btnAdd.addEventListener('click', () => {
    makeTask();
});

btnRemove.addEventListener('click', () => {
    clearTasks();
});

// Обработчик событий (изменение галочки)
todo.addEventListener('change', (item) => {
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.innerHTML;

    todoList.forEach((item) => {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
            //console.log(item.checked);
        }
    });
});

todo.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    todoList.forEach((item, index) => {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(index, 1);
            } else {
                item.important = !item.important;
            }
            //console.log(item.important);
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        } 
    });
});

function displayMessages() {

    let displayMessage = '';

    if (todoList.length === 0) todo.innerHTML = '';

    todoList.forEach( (item, i) => {

        displayMessage += `
            <li>
                <input type='checkbox' id='item-${i}' ${item.checked ? 'checked' : ''}>
                <label for='item-${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
            </li>
        `;

        todo.innerHTML = displayMessage;
    });
}

function clearTasks() {
    localStorage.removeItem('todo');
    todo.innerHTML = '';
    todoList = [];
}

function makeTask() {

    if (!input.value) return; //Если поле для ввода пустое, функция не будет выполняться

    //Создание обьекта нашей задачи
    let newTodo = {
        todo: input.value, // Текст задачи
        checked: false, // Состояние галочки
        important: false // Важность задачи (Изменяет жирность и цвет шрифта)
    };

    todoList.push(newTodo); //Добавление новой задачи в список задач
    input.value = ''; //Очищение поля для ввода
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));    
}