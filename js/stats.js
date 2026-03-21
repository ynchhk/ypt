
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
    updateStatsDisplay()
}

function updateStatsDisplay() {
    const h = Math.floor(todayStats.totalSeconds / 3600)
    const m = Math.floor((todayStats.totalSeconds % 3600) / 60)

    document.querySelector('#stats-total-time').textContent = `${h}h ${m}m`
    document.querySelector('#stats-sessions').textContent = todayStats.sessions

    // Среднее время одной сессии
    if (todayStats.sessions > 0) {
        const avgSeconds = Math.floor(todayStats.totalSeconds / todayStats.sessions)
        const avgM = Math.floor(avgSeconds / 60)
        document.querySelector('#stats-avg').textContent = `${avgM}m`
    }
}

updateStatsDisplay()