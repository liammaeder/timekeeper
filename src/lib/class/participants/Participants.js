const apiRoute = import.meta.env.VITE_API_URL + 'participant';
import {writable} from "svelte/store";

export default class Participants {
    constructor() {
        this.id = null;
        this.race = null;
        this.boatType = null;
        this.racers = [];
        this.isDeleting = writable(false);
        this.isSaving = writable(false);
        this.isLinking = writable(false);
    }

    async createParticipant() {
        this.isSaving.set(true);
        const url = apiRoute + "/createParticipant";
        const jsonBody = {
            "values": {
                "race": this.race,
                "type": this.boatType,
            }
        }

        let result = await this.doFetch(url, jsonBody, "POST");
        this.id = result.insertId;
        this.isSaving.set(false);
        return result.insertId;
    }

    async deleteParticipant() {
        this.isDeleting.set(true);
        const url = apiRoute + "/deleteParticipant";
        const jsonBody = {
            "conditions": [
                `id = ${this.id}`
            ]
        }

        let result = await this.doFetch(url, jsonBody, "POST");
        if (result) {
            this.id = null;
            this.isDeleting.set(false);
        }
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