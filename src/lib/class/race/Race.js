import { format }   from "date-fns";
const apiRoute      = import.meta.env.VITE_API_URL + 'race';

class Race{
    constructor() {
        this.name   = "";
        this.status = -1;
        this.date   = new Date();
        this.limit  = 10;
        this.offset = 0;
    }

    async createRace() {
        const url = apiRoute + "/createRace";
        let jsonBody = {
            "values": {
                "name": this.name,
                "status_id": this.status,
                "date": this.date
            }
        }

        return this.doFetch(url, jsonBody);
    }

    async getActiveRaces() {
        const url = apiRoute + "/getRaces";
        let jsonBody = {
            "condition": {
                "status": "status_id IN (1, 2)"
            },
            "limit": this.limit,
            "offset": this.offset
        }

        return await this.doFetch(url, jsonBody, 'POST');
    }

    async getCompletedRaces() {
        const url = apiRoute + "/getRaces";
        let jsonBody = {
            "condition": {
                "status": "status_id = 3"
            },
            "limit": this.limit,
            "offset": this.offset
        }

        return await this.doFetch(url, jsonBody, 'POST');
    }

    async getRaceWithRacers(raceId) {
        const url = apiRoute + "/getRace";
        const jsonBody = {
            "id": raceId
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

    async doFetch(url, jsonBody, method) {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonBody)
        });

        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let result = await response.json();
        return result;
    }

    formatDate(dateObject) {
        let date = new Date(dateObject);
        return format(date, "dd-MM-yyyy");
    }
}

export default Race;