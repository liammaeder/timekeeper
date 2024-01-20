import racersData from '$lib/json/racers.json';

export default class Racers{
    constructor() {
    }

    getRacerArray(racerIdArr) {
        let racerOut = [];

        racerIdArr.forEach((racerId) => {
            Object.entries(racersData).forEach(([key, racer]) => {
                if (racer.id === racerId) {
                    racerOut.push(racer);
                }
            });
        });

        return racerOut;
    }
}