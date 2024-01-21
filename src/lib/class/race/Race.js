import racesData    from '$lib/json/races.json';
import Participants from "$lib/class/participants/Participants.js";
// const apiUrl        = import.meta.env.VITE_API_URL;
const apiRoute      = '/api/races/';

class Race{
    constructor() {
    }

    async connectToApi(route) {
        let url = apiRoute + route;

        try {
            await fetch(url)
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.warn(err));
        } catch (err) {
            console.error(err);
        }
    }

    getRaceWithRacers(raceId) {
        raceId = parseInt(raceId);
        let data = {};
        let dataMatched = false;

        Object.entries(racesData).forEach(([key, value]) => {
            if (value.id === raceId) {
                dataMatched = true;
                data.result = true;
                data.id = value.id;
                data.status = value.status;
                data.name = value.name;
                data.date = value.date;

                let Participant = new Participants();
                data.participants = Participant.getParticipantsWithRacers(value.participants);
            }
        });

        if (!dataMatched) {
            data = {
                "result": false,
                "Message": `No race found for ID: ${raceId}`
            };
        }

        return data;
    }
}

export default Race;