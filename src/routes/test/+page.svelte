<script>
    let socket;

    function connectWebSocket() {
        // Replace 'your-ws-server-url' with the actual WebSocket server URL
        socket = new WebSocket('ws://localhost:8000');

        socket.addEventListener('open', (event) => {
            console.log('WebSocket connection opened:', event);
        });

        socket.addEventListener('message', (event) => {
            console.log('Received message from WebSocket:', event.data);
        });

        socket.addEventListener('close', (event) => {
            console.log('WebSocket connection closed:', event);
        });

        socket.addEventListener('error', (event) => {
            console.error('WebSocket error:', event);
        });
    }

    function sendMessage() {
        const message = 'Hello, WebSocket!';
        socket.send(message);
    }

    function disconnectWebSocket() {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
        }
    }
</script>

<style>
    /* Your styles go here */
</style>

<div>
    <button on:click={connectWebSocket}  class="w-full border-1 border-gray-800 bg-gray-400 text-black my-2">Connect WebSocket</button>
    <button on:click={sendMessage} class="w-full border-1 border-gray-800 bg-gray-400 text-black my-2">Send Message</button>
    <button on:click={disconnectWebSocket} class="w-full border-1 border-gray-800 bg-gray-400 text-black my-2">Disconnect WebSocket</button>
</div>