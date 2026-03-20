let seconds = 0;
let isRunning = false;
const btnResume = document.querySelector('#btn-resume')
const btnPause = document.querySelector('#btn-pause')
const btnStop = document.querySelector('#btn-stop')
const display = document.querySelector('.timer-display span');
function updateDisplay() {
    let h = Math.floor(seconds / 3600)        // часы
    let m = Math.floor((seconds % 3600) / 60) // минуты
    let s = seconds % 60
     h = String(h).padStart(2, '0')
     m = String(m).padStart(2, '0')
     s = String(s).padStart(2, '0')
    display.textContent = `${h}:${m}:${s}`;
}
btnResume.addEventListener('click', ()=>{isRunning = true;
btnResume.textContent = 'Resume'});

btnPause.addEventListener('click', ()=>{isRunning = false;});
btnStop.addEventListener('click', ()=>{
    isRunning = false;
    seconds = 0;
    updateDisplay()
    btnResume.textContent = 'Start'
});

setInterval(() => {
    if (isRunning) {
        seconds++;
        updateDisplay()
    }
},1000)
updateDisplay()
