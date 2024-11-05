// script.js

let startTime, updatedTime, difference = 0, interval;
let isRunning = false;
let lapCounter = 1;
let isPaused = false;
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimesList = document.getElementById('lapTimes');

// Event listener for the start/pause button
startPauseBtn.addEventListener('click', function() {
  if (!isRunning) {
    startTimer();
  } else if (isRunning && !isPaused) {
    pauseTimer();
  } else {
    resumeTimer();
  }
});

// Event listener for the stop button
stopBtn.addEventListener('click', function() {
  stopTimer();
});

// Event listener for the reset button
resetBtn.addEventListener('click', function() {
  resetTimer();
});

// Event listener for the lap button
lapBtn.addEventListener('click', function() {
  recordLap();
});

function startTimer() {
  startTime = Date.now() - difference; // Start from the last known time if paused
  interval = setInterval(updateDisplay, 10); // Update every 10 milliseconds
  isRunning = true;
  isPaused = false;
  startPauseBtn.textContent = 'Pause';
  stopBtn.disabled = false;
  lapBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(interval); // Stop the timer
  isPaused = true;
  startPauseBtn.textContent = 'Resume';
}

function resumeTimer() {
  startTime = Date.now() - difference; // Adjust the start time to account for the pause
  interval = setInterval(updateDisplay, 10);
  isPaused = false;
  startPauseBtn.textContent = 'Pause';
}

function stopTimer() {
  clearInterval(interval);
  difference = 0; // Reset time difference
  isRunning = false;
  startPauseBtn.textContent = 'Start';
  stopBtn.disabled = true;
  lapBtn.disabled = true;
}

function resetTimer() {
  clearInterval(interval);
  difference = 0;
  isRunning = false;
  isPaused = false;
  display.textContent = '00:00:00.00';
  lapTimesList.innerHTML = ''; // Clear lap times
  startPauseBtn.textContent = 'Start';
  stopBtn.disabled = true;
  lapBtn.disabled = true;
  lapCounter = 1;
}

function updateDisplay() {
  updatedTime = Date.now();
  difference = updatedTime - startTime;
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((difference % 1000) / 10);

  display.textContent = 
    (hours > 9 ? hours : '0' + hours) + ':' + 
    (minutes > 9 ? minutes : '0' + minutes) + ':' + 
    (seconds > 9 ? seconds : '0' + seconds) + '.' + 
    (milliseconds > 9 ? milliseconds : '0' + milliseconds);
}

function recordLap() {
  const lapTime = display.textContent;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
  lapTimesList.appendChild(lapItem);
  lapCounter++;
}
