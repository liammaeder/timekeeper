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
        }
    }

    reset () {
        this.isRunning      = false;
        this.raceStart      = null;
        this.raceEnd        = null;
        this.startTime      = null;
        this.pauseTime      = null;
        this.laps           = [];
    }

    getDuration() {
        let currDuration;
        const dblZ = (num) => num.toString().padStart(2, '0');

        if (this.isRunning) {
            let currTime    = new Date() - (this.startTime || 0) - this.totalPauseDuration;
            const hours     = dblZ(Math.floor(currTime / 3600000));
            const minutes   = dblZ(Math.floor((currTime % 3600000) / 60000));
            const seconds   = dblZ(Math.floor((currTime % 60000) / 1000));
            currDuration    = `${hours}:${minutes}:${seconds}`;
        } else if (!this.isRunning && this.startTime !== null && this.pauseTime !== null) {
            let currTime    = this.pauseTime - (this.startTime || 0) - this.totalPauseDuration;
            const hours     = dblZ(Math.floor(currTime / 3600000));
            const minutes   = dblZ(Math.floor((currTime % 3600000) / 60000));
            const seconds   = dblZ(Math.floor((currTime % 60000) / 1000));
            currDuration    = `${hours}:${minutes}:${seconds}`;
        } else {
            currDuration    = '00:00:00';
        }

        return currDuration;
    }

    getLaps() {
        return this.laps;
    }
}

export default Timer;