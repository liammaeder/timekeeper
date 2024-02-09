import FormatterCls from "$lib/class/helpers/Formatters.js";
const formatter = new FormatterCls();
class Timer {
    constructor(participantId) {
        this.participantId      = participantId;
        this.isRunning          = false;
        this.startTime          = null;
        this.pauseTime          = null;
        this.isPaused           = false;
        this.totalPauseDuration = 0;
        this.laps               = [];
    }

    getParticipant() {

    }

    start() {
        if (!this.isRunning) {
            this.startTime  = new Date();
            this.isRunning  = true;
        }
    }

    stop() {
        if (this.isRunning) {
            this.pauseTime  = new Date();
            this.isRunning  = false;
            this.isPaused   = false;
        }
    }

    pause() {
        if (this.isRunning) {
            this.pauseTime  = new Date();
            this.isPaused   = true;
            this.isRunning  = false;
        }
    }

    resume() {
        if (!this.isRunning && this.pauseTime !== null) {
            const pauseDuration         = new Date() - this.pauseTime;
            this.totalPauseDuration     += pauseDuration;
            this.pauseTime              = null;
            this.isRunning              = true;
            this.isPaused               = false;
        }
    }

    lap() {
        if (this.isRunning) {
            const lapTime = new Date() - this.startTime;
            this.laps.push(lapTime);
            console.log(this.laps);
        }
    }

    reset () {
        this.isRunning      = false;
        this.startTime      = null;
        this.pauseTime      = null;
        this.laps           = [];
    }

    formatTime(currTime) {
        const dblZ = (num) => num.toString().padStart(2, '0');

        if (currTime >= 3600000) {
            const hours         = dblZ(Math.floor(currTime / 3600000));
            const minutes       = dblZ(Math.floor((currTime % 3600000) / 60000));
            const seconds       = dblZ(Math.floor((currTime % 60000) / 1000));
            const milliseconds  = dblZ(Math.floor(currTime % 1000)).slice(0, 2);
            return `${hours}:${minutes}:${seconds}:${milliseconds}`;
        } else if (currTime >= 60000) {
            const minutes       = dblZ(Math.floor(currTime / 60000));
            const seconds       = dblZ(Math.floor((currTime % 60000) / 1000));
            const milliseconds  = dblZ(Math.floor(currTime % 1000)).slice(0, 2);
            return `${minutes}:${seconds}:${milliseconds}`;
        } else {
            const seconds       = dblZ(Math.floor((currTime % 60000) / 1000));
            const milliseconds  = dblZ(Math.floor(currTime % 1000)).slice(0, 2);
            return `${seconds}:${milliseconds}`;
        }
    }

    getDuration() {
        let currDuration;

        if (this.isRunning) {
            let currTime = new Date() - (this.startTime || 0) - this.totalPauseDuration;
            currDuration = formatter.formatRaceTime(currTime);
        } else if (!this.isRunning && this.startTime !== null && this.pauseTime !== null) {
            let currTime = this.pauseTime - (this.startTime || 0) - this.totalPauseDuration;
            currDuration = formatter.formatRaceTime(currTime);
        } else {
            currDuration = formatter.formatRaceTime(0);
        }

        return currDuration;
    }

    getLaps() {
        return this.laps;
    }
}

export default Timer;