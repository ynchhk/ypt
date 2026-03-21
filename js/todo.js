let tasks = []
const savedTasks = localStorage.getItem('tasks')
if (savedTasks) {
    tasks = JSON.parse(savedTasks)
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
const list = document.querySelector('.todo-list')
const btnAddTask = document.querySelector('#btn-add')
const taskNum = document.querySelector('.tasks-num')
let countTask = 0;
taskNum.textContent = 'Add Tasks';
btnAddTask.addEventListener('click', () => {
    const text = prompt('Введи название задачи')
    if (text) {
        const li = document.createElement('li')
        li.className = 'todo-item'
        li.innerHTML = `
            <input type="checkbox">
            <div class="todo-text"></div>
            <span class="todo-time">00:00:00</span>
`

        li.querySelector('.todo-text').textContent = text
        list.appendChild(li)
        taskUpdate()
        tasks.push({text: text, completed: false})
        saveTasks()
        li.dataset.index = tasks.length - 1;
    }
})

function renderTasks() {
    tasks.forEach((task, index) => {
        const li = document.createElement('li')
        li.className = 'todo-item'
        li.dataset.index = index
        li.innerHTML = `
            <input type="checkbox">
            <div class="todo-text"></div>
            <span class="todo-time">00:00:00</span>
        `
        li.querySelector('.todo-text').textContent = task.text
        li.querySelector('input').checked = task.completed
        if (task.completed) {
            li.querySelector('.todo-text').classList.add('completed')
        }
        list.appendChild(li)
    })
    countTask = tasks.length
    taskNum.textContent = `${countTask} tasks for today`
}


function taskUpdate() {
    countTask++
    taskNum.textContent = `${countTask} tasks for today`;
}
list.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox'){
        const li = event.target.closest('li')
        const todoText = li.querySelector('.todo-text')
        const index = li.dataset.index  // добавь
        if (event.target.checked) {
            todoText.classList.add('completed')
            tasks[index].completed = true
            list.appendChild(li)// добавь
        } else {
            todoText.classList.remove('completed')
            tasks[index].completed = false  // добавь
            list.prepend(li)
        }
        saveTasks()
        // добавь


    }
})
renderTasks()




