const apiRoute = import.meta.env.VITE_API_URL + 'participant';
import {writable} from "svelte/store";

export default class Participants {
    constructor() {
        this.race = null;
        this.boatType = null;
        this.racers = [];
        this.isDeleting = writable(false);
        this.isSaving = writable(false);
        this.isLinking = writable(false);
    }

    async createParticipant() {
        const url = apiRoute + "/createParticipant";
        const jsonBody = {
            "values": {
                "race": this.race,
                "type": this.boatType,
            }
        }

        let result = await this.doFetch(url, jsonBody, "POST");
        return result.insertId;
    }

    async doFetch(url, jsonBody, method) {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    }
}