import {format} from "date-fns";

const apiRoute      = import.meta.env.VITE_API_URL + 'race';

class Race{
    constructor() {
        this.id = null;
        this.name = "";
        this.status = 1;
        this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
        this.limit = 10;
        this.offset = 0;
    }

    async createRace() {
        const url = apiRoute + "/createRace";
        let jsonBody = {
            "values": {
                "name": this.name,
                "status": this.status,
                "date": this.date
            }
        }

        let result = await this.doFetch(url, jsonBody, "POST");

        if (result && result.insertId) {
            this.id = result.insertId;
            result = await this.getEditableRace();
            if (result) {
                this.name = result.name;
                this.status = result.status;
                this.date = result.date;
            }
        }

        return result;
    }

    async getAllRaces() {
        const url = apiRoute + "/getRacesList";
        let jsonBody = {
            "conditions": [],
            "limit": this.limit,
            "offset": this.offset
        }

        return await this.doFetch(url, jsonBody, "POST");
    }

    async getActiveRaces() {
        const url = apiRoute + "/getRaces";
        let jsonBody = {
            conditions: [
                "status IN (1, 2)"
            ],
            limit: this.limit,
            offset: this.offset
        }
        return await this.doFetch(url, jsonBody, 'POST');
    }

    async getCompletedRaces() {
        const url = apiRoute + "/getRaces";
        let jsonBody = {
            conditions: [
                "status = 3"
            ],
            limit: this.limit,
            offset: this.offset
        }

        return await this.doFetch(url, jsonBody, 'POST');
    }

    async getRaceParticipants() {
        const url = apiRoute + "/getRaceParticipants";
        let jsonBody = {
            conditions: [
                `race = ${this.id}`
            ],
            limit: 99999999,
            offset: this.offset
        }
        return await this.doFetch(url, jsonBody, 'POST');
    }

    async getRaceWithRacers(raceId) {
        const url = apiRoute + "/getRace";
        const jsonBody = {
            id: raceId
        }

        let data = await this.doFetch(url, jsonBody, 'POST');

        if (!data) {
            data = {
                "Erro": false,
                "Message": `No race found for ID: ${raceId}`
            };
        }

        return data;
    }

    async getEditableRace() {
        const url = apiRoute + "/getEditableRace";
        const jsonBody = {
            "conditions": [
                `id = ${this.id}`
            ]
        }

        let data = await this.doFetch(url, jsonBody, 'POST');

        if (!data) {
            data = {
                "Erro": false,
                "Message": `No race found for ID: ${this.id}`
            };
        }

        return data[0];
    }

    async doFetch(url, jsonBody, method = "POST") {
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

    formatDate(dateObject) {
        let date = new Date(dateObject);
        return format(date, "dd-MM-yyyy");
    }
}

export default Race;