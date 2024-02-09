const apiRoute = import.meta.env.VITE_API_URL + "race_status";

export default class RaceStatus {
    constructor(){
        this.limit = 10;
        this.offset = 0;
    }

    async getStatus(id) {
        const url = apiRoute + "/getStatus";
        let jsonBody = {
            "conditions": {
                "status": `id = ${id}`
            },
            "limit": this.limit,
            "offset": this.offset
        }

        return await this.doFetch(url, jsonBody, "POST");
    }

    async getStatuses() {
        const url = apiRoute + "/getStatuses";
        let jsonBody = {
            "conditions": {},
            "limit": this.limit,
            "offset": this.offset
        }

        return await this.doFetch(url, jsonBody, "POST");
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

        return await response.json();
    }
}