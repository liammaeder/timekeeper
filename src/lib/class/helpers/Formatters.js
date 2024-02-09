export default class Formatter {
    constructor() {

    }

    formatRaceTime(time) {
        const dblZ = (num) => num.toString().padStart(2, '0');

        if (time >= 3600000) {
            const hours         = dblZ(Math.floor(time / 3600000));
            const minutes       = dblZ(Math.floor((time % 3600000) / 60000));
            const seconds       = dblZ(Math.floor((time % 60000) / 1000));
            const milliseconds  = dblZ(Math.floor(time % 1000)).slice(0, 2);
            return `${hours}:${minutes}:${seconds}:${milliseconds}`;
        } else if (time >= 60000) {
            const minutes       = dblZ(Math.floor(time / 60000));
            const seconds       = dblZ(Math.floor((time % 60000) / 1000));
            const milliseconds  = dblZ(Math.floor(time % 1000)).slice(0, 2);
            return `${minutes}:${seconds}:${milliseconds}`;
        } else {
            const seconds       = dblZ(Math.floor((time % 60000) / 1000));
            const milliseconds  = dblZ(Math.floor(time % 1000)).slice(0, 2);
            return `${seconds}:${milliseconds}`;
        }
    }

    formatDisplayTime(time) {
        const dblZ = (num) => num.toString().padStart(2, '0');

        if (time >= 3600000) {
            const hours         = dblZ(Math.floor(time / 3600000));
            const minutes       = dblZ(Math.floor((time % 3600000) / 60000));
            const seconds       = dblZ(Math.floor((time % 60000) / 1000));
            return `${hours}:${minutes}:${seconds}`;
        } else if (time >= 60000) {
            const minutes       = dblZ(Math.floor(time / 60000));
            const seconds       = dblZ(Math.floor((time % 60000) / 1000));
            return `${minutes}:${seconds}`;
        } else {
            const seconds       = dblZ(Math.floor((time % 60000) / 1000));
            return `${seconds}`;
        }
    }
}