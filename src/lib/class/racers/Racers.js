import racersData from '$lib/json/racers.json';

export default class Racers{
    constructor() {
        this.racer = {
            "id": 0,
            "participant_id": -1,
            "user_id": -1,
            "name": "",
            "csa_number": 0,
        }
    }

    createRacer() {

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