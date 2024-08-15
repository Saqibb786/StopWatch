// Selecting DOM elements
const durationText = document.getElementById("duration");
const startBtn = document.querySelector(".startBtn");
const stopBtn = document.querySelector(".stopBtn");
const resetBtn = document.querySelector(".resetBtn");

const sw = new Stopwatch();
let timerInterval; // Variable to store interval ID

startBtn.addEventListener("click", () => {
    sw.start();
    if (!timerInterval) {
        // Set an interval to update the duration display every 100 milliseconds
        timerInterval = setInterval(() => {
            durationText.innerText = sw.getDuration();
        }, 100); // Update every 100 milliseconds
    }
});

stopBtn.addEventListener("click", () => {
    sw.stop();
    clearInterval(timerInterval); // Clear the interval
    timerInterval = null; // Reset the interval variable
});

resetBtn.addEventListener("click", () => {
    sw.reset();
    clearInterval(timerInterval); // Clear the interval
    timerInterval = null; // Reset the interval variable
});

// StopWatch constructor function
function Stopwatch() {
    let startTime, endTime, running, duration = 0;

    // Start the stopwatch
    this.start = function() {
        if (running)
            throw new Error('Stopwatch is already running!');

        running = true;
        startTime = new Date();
    }

    // Stop the stopwatch
    this.stop = function() {
        if (!running)
            throw new Error('Stopwatch is not running!');

        running = false;
        endTime = new Date();

        const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
        duration += seconds;
        durationText.innerText = formatDuration(duration);
    }

    // Reset the stopwatch
    this.reset = function() {
        startTime = null;
        endTime = null;
        running = false;
        duration = 0;
        durationText.innerText = formatDuration(duration);
    }

    // Get the current duration
    this.getDuration = function() {
        if (running) {
            const now = new Date();
            const seconds = (now.getTime() - startTime.getTime()) / 1000;
            return formatDuration(duration + seconds);
        }
        return formatDuration(duration);
    }

    // Getter for duration
    Object.defineProperty(this, "duration", {
        get: function() {
            return duration;
        }
    });
}

// Helper function to format duration
function formatDuration(seconds) {
    console.log(seconds);
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const milliseconds = Math.floor((seconds % 1) * 100);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(secs).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}
