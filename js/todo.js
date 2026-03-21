
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

    }
})
function taskUpdate() {
    countTask++
    taskNum.textContent = `${countTask} tasks for today`;
}
list.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox'){
        const li = event.target.closest('li')
        const todoText = li.querySelector('.todo-text')
        if (event.target.checked) {
            todoText.classList.add('completed')
        }
        else{
            todoText.classList.remove('completed')
        }
    }
})