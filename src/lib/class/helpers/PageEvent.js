class PageEvent {
    constructor() {
        // Array to manage event listeners
        this.listeners = [];

        // Function to trigger an event
        this.triggerEvent = (eventName, event) => {
            const eventListeners = this.listeners.find(item => item.eventName === eventName);

            if (eventListeners) {
                eventListeners.callbacks.forEach(callback => {
                    callback(event);
                });
            }
        };

        // Function to add an event listener
        this.addPageEvent = (eventName, callback) => {
            const existingListeners = this.listeners.find(item => item.eventName === eventName);

            if (existingListeners) {
                existingListeners.callbacks.push(callback);
            } else {
                this.listeners.push({eventName, callbacks: [callback]});
            }
        };

        // Function to remove an event listener
        this.removePageEvent = (eventName, callback) => {
            const existingListeners = this.listeners.find(item => item.eventName === eventName);

            if (existingListeners) {
                existingListeners.callbacks = existingListeners.callbacks.filter(cb => cb !== callback);
            }
        };
    }
}

// Create an instance of PageEventManager
const pageEvent = new PageEvent();

export default pageEvent;