<script>
    import Nav from '$lib/navbar.svelte';
    import races from '../../races.json';

    let id = 1;

    let urlString = window.location.href;
    let paramString = urlString.split("?")[1];
    let  paramObject = new URLSearchParams(paramString);
    for (let pair of paramObject.entries()) {
        if (pair[0] === "id") {
            id = pair[1];
        }
    }

    id--;

    let raceDetails = races[id];
    console.log(raceDetails);
</script>

<body data-theme="dark" class="h-screen justify-center">
    <Nav pageName="Race"/>
    <div class="w-full h-fit p-3 mt-[75px]">
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
    </div>
</body>