<script>
    import Nav              from '$lib/navbar.svelte';
    import races            from '../../races.json';
    import UrlController    from '$lib/Url.js';
import { browser }          from '$app/environment';

    let id = 1;
    let raceDetails;
    let loadTest = false;

    if (browser) {
        console.log("browser true")
        let urlString = window.location.href;
        const urlParams = new UrlController(urlString).getUrlParameters();
        if (!urlParams) {
            loadTest = true;
        } else {
            for (let pair of urlParams.entries()) {
                if (pair[0] === "id") {
                    id = pair[1];
                }
            }
            id--;
        }
    }

    raceDetails = races[id];

</script>

<body data-theme="aqua" class="h-screen justify-center">
    <Nav pageName="Race"/>
    <div class="w-full h-fit p-3 mt-[60px]">
        {#if loadTest}
            <div class="text-center text-primary">
                No race information available...
            </div>
        {:else}
            <div class="text-center text-primary">
                {raceDetails.name} - {raceDetails.date}
            </div>
            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Boat Type</th>
                        <th>Racers</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each raceDetails.participants as participants (participants.id)}
                        <tr>
                            <th>{participants.id}</th>
                            <td>
                                {participants.type}
                            </td>
                            <td>
                                <ol>
                                    {#each participants.racers as racer}
                                        <li>{racer.name}</li>
                                    {/each}
                                </ol>
                            </td>
                            <td>
                                {participants.time}
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    </div>
</body>