const apiRoute        = import.meta.env.VITE_API_URL + 'races';

class Race{
    constructor() {
        this.name = "";
        this.status = -1;
        this.date = new Date();
        this.limit = 10;
        this.offset = 0;
    }

    async createRace() {
        const url = apiRoute + "/createRace";
        let jsonBody = {
            values: {
                name: this.name,
                status: this.status,
                date: this.date
            }
        }

        return this.doFetch(url, jsonBody);
    }

    async getActiveRaces() {
        const url = apiRoute + "/getRaces";
        let jsonBody = {
            condition: {
                status: "status in [1, 2]"
            },
            limit: this.limit,
            offset: this.offset
        }

        return await this.doFetch(url, jsonBody);
    }

    async getCompletedRaces() {
        const url = apiRoute + "/getRaces";
        let jsonBody = {
            condition: {
                status: "status = 3"
            },
            limit: this.limit,
            offset: this.offset
        }

        return await this.doFetch(url, jsonBody);
    }

    async getRaceWithRacers(raceId) {
        const url = apiRoute + "/getRace";
        const jsonBody = {
            id: raceId
        }

        let data = await this.doFetch(url, jsonBody);

        if (!data) {
            data = {
                "Erro": false,
                "Message": `No race found for ID: ${raceId}`
            };
        }

        return data;
    }

    async doFetch(url, jsonBody) {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jsonBody)
            });

            if(!response.ok) {
                console.error("JSON response:", response.json());
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let result = await response.json();
            result = JSON.parse(result);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

export default Race;