
let todayStats = {
    totalSeconds: 0,    // общее время за сегодня
    sessions: 0,        // количество сессий
    date: ''            // дата — чтобы сбрасывать статистику каждый день
}
let myChart = null
const savedStats = localStorage.getItem('todayStats')
if (savedStats) {
    todayStats = JSON.parse(savedStats)
}

function saveStats() {
    localStorage.setItem('todayStats', JSON.stringify(todayStats))
    updateStatsDisplay()
    drawChart()
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
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
let weeklyData = {
    Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0
}

const savedWeekly = localStorage.getItem('weeklyData')
if (savedWeekly) {
    weeklyData = JSON.parse(savedWeekly)
}
const ctx = document.querySelector('#weekly-chart')

function drawChart() {
    if (myChart) {
        myChart.destroy() // уничтожаем старый график
    }
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(weeklyData),
            datasets: [{
                label: 'Study time (minutes)',
                data: Object.values(weeklyData).map(s => Math.floor(s / 60)),
                backgroundColor: '#7c5cfc',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: { color: '#9aa0a6' },
                    grid: { color: 'rgba(255,255,255,0.20)' }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: '#9aa0a6' },
                    grid: { color: 'rgba(255,255,255,0.20)' }
                }
            }
        }
    })
}

drawChart()

updateStatsDisplay()