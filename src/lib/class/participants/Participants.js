const apiRoute = import.meta.env.VITE_API_URL + 'participant';
import {writable} from "svelte/store";

export default class Participants {
    constructor() {
        this.id = null;
        this.race = null;
        this.boatType = 0;
        this.isDeleting = writable(false);
        this.isSaving = writable(false);
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

    async getParticipant(id) {
        this.isSaving.set(true);
        const url = apiRoute + "/getParticipant";
        const jsonBody = {
            "conditions": [
                `id = ${id}`
            ]
        }

        let result = await this.doFetch(url, jsonBody, "POST");
        if (result) {
            this.id = result.json.id;
            this.race = result.json.race;
            this.boatType = result.json.type;
        }
    }

    async getParticipantLink() {
        const url = apiRoute + "/getParticipantLink";
        const jsonBody = {
            "sonditions": [
                `participant = ${this.id}`
            ]
        };

        let result = await this.doFetch(url, jsonBody, "POST");
        if (result) {
            Object.entries(result.json).forEach((racerLink) => {
                console.log(racerLink);
            });
        }
    }

    async updateParticipant() {

    }

    async deleteParticipant() {
        this.isDeleting.set(true);
        const url = apiRoute + "/deleteParticipant";
        const jsonBody = {
            "id": this.id
        }

        let result = await this.doFetch(url, jsonBody, "POST");
        if (result) {
            this.id = null;
            this.isDeleting.set(false);
        }
        return result.insertId;
    }

    async unlinkAllRacers() {
        this.isSaving.set(true);
        const url = apiRoute + "/unlinkAllRacers";
        const jsonBody = {
            "id": this.id
        }

        let result = await this.doFetch(url, jsonBody, "POST");
        if(result) {
            this.isSaving.set(false);
        }
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