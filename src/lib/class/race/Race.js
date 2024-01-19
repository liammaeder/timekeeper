import racesData from '$lib/json/races.json';
import racersData from '$lib/json/racers.json';

class Race{
    constructor() {
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
                data.participants = [];

                Object.entries(value.participants).forEach(([index, participant]) => {
                    let newParticipant = {};
                    newParticipant.id = participant.id;
                    newParticipant.type = participant.type;
                    newParticipant.time = participant.time;
                    newParticipant.racers = [];

                    participant.racers.forEach((racerId, index) => {
                        let newRacer = {
                            "id": racersData[index].id,
                            "name": racersData[index].name
                        }

                        newParticipant.racers.push(newRacer);
                    });

                    data.participants.push(newParticipant);
                });
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