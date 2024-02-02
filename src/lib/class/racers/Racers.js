const apiRoute      = import.meta.env.VITE_API_URL + 'racer';
import { writable } from 'svelte/store';

export default class Racers{
    constructor(id = -1) {
        this.id             = id;
        this.name           = null;
        this.user           = null;
        this.csa            = null;
        this.participant    = 0;
        this.limit          = 10;
        this.offset         = 0;
        this.isDeleting     = writable(false);
        this.isSaving       = writable(false);
        this.isLinking      = writable(false);
    }

    async createRacer() {
        this.isSaving.set(true);
        setTimeout(() => {
            this.linkRacer();
            // this.isSaving.set(false);
        }, 2000);
        // const url = apiRoute + "/createRacer";
        // const jsonBody = {
        //     "values": {
        //         "name": this.name,
        //         "csa": this.csa,
        //         "user": this.user,
        //     }
        // }
        //
        // let result = await this.doFetch(url, jsonBody, "POST");
        // this.isSaving.set(false);
        // return result;
    }

    async linkRacer() {
        this.isLinking.set(true);
        setTimeout(() => {
            this.isLinking.set(false);
        }, 2000);
        // const url = apiRoute + "/linkRacer";
        // const jsonBody = {
        //     "values": {
        //         "racer": this.id,
        //         "participant": this.participant
        //     }
        // }
    }

    async getRacer() {
        const url = apiRoute + '/getRacer';
        const jsonBody = {
            "conditions":["id = " + this.id],
            "limit": this.limit,
            "offset": this.offset
        }
        let result;

        try {
            result = await this.doFetch(url, jsonBody, "POST");

            if (result) {
                this.id     = result.id;
                this.name   = result.name;
                this.user   = result.user;
                this.csa    = result.csa;
                result = { success: true }
            } else {
                result = { success: false, message: `No racer found for ID: ${this.id}}` };
            }
        } catch (err) {
            result = { success: false, message: err.message };
        }

        return result;
    }

    async getAllRacers() {
        const url = apiRoute + "/getRacers";
        const jsonBody = {
            "conditions":[],
            "limit": this.limit,
            "offset": this.offset
        }

        return await this.doFetch(url, jsonBody, "POST");
    }

    async updateRacer() {
        this.isSaving.set(true);
        const url = apiRoute + "/updateRacer";
        const jsonBody = {
            "conditions":[`id = ${this.id}`],
            "values": {
                "name": this.name,
                "csa": this.csa,
                "user": this.user,
            }
        }

        const result = await this.doFetch(url, jsonBody, "POST");
        this.isSaving.set(false);
        return result;
    }

    async deleteRacer() {
        this.isDeleting.set(true);
        setTimeout(() => {
            this.isDeleting.set(false);
        }, 5000);
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