import Racer from '$lib/class/racers/Racers.js';
import participantsData from '$lib/json/participants.json';

export default class Participants{
    constructor() {
    }

    getParticipantsWithRacers(participantIdArr) {
        let data = [];

        participantIdArr.forEach((participantId) => {
            Object.entries(participantsData).forEach(([index, participant]) => {
                if (participant.id === participantId) {
                    let newParticipant = {};
                    newParticipant.id = participant.id;
                    newParticipant.type = participant.type;
                    newParticipant.time = participant.time;

                    let racer = new Racer();
                    newParticipant.racers = racer.getRacerArray(participant.racers);

                    data.push(newParticipant);
                }
            });
        })

        return data;
    }
}