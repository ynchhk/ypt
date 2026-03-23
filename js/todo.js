let tasks = []
const modalOverlay = document.querySelector('#modal-overlay')
const modalInput = document.querySelector('#modal-input')
const modalConfirm = document.querySelector('#modal-confirm')
const modalCancel = document.querySelector('#modal-cancel')
let selectedPriority = 'medium'
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
    modalOverlay.classList.add('active')
    modalInput.focus()
})
modalCancel.addEventListener('click', () => {
    modalOverlay.classList.remove('active')
    modalInput.value = ''
})
document.querySelectorAll('.priority-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        selectedPriority = btn.dataset.priority
    })
})
modalConfirm.addEventListener('click', () => {
    const text = modalInput.value.trim()
    if (text) {
        const li = document.createElement('li')
        li.className = 'todo-item'
        li.innerHTML = `
            <label class="checkbox-wrapper">
                <input type="checkbox">
                <span class="checkmark"></span>
            </label>
            <div class="todo-text"></div>
            <span class="priority-badge">${selectedPriority}</span>
        <span class="todo-time">00:00:00</span>`
        li.querySelector('.todo-text').textContent = text
        li.dataset.index = tasks.length
        list.appendChild(li)
        tasks.push({ text: text, completed: false, priority: selectedPriority })
        saveTasks()
        taskUpdate()
        modalOverlay.classList.remove('active')
        modalInput.value = ''
        selectedPriority = 'medium'
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




