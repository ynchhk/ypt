
let todayStats = {
    totalSeconds: 0,    // общее время за сегодня
    sessions: 0,        // количество сессий
    date: ''            // дата — чтобы сбрасывать статистику каждый день
}
const savedStats = localStorage.getItem('todayStats')
if (savedStats) {
    todayStats = JSON.parse(savedStats)
}

function saveStats() {
    localStorage.setItem('todayStats', JSON.stringify(todayStats))
}