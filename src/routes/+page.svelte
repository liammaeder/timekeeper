<script>
    import Nav from '$lib/navbar.svelte';
    import races from '../races.json';

    let currentRaces = []

    races.forEach(function (race) {
        if (race.status === "in-progress" || race.status === "future") {
            currentRaces.push(race);
        }
    })

</script>

<body data-theme="dark" class="h-dvh">
    <Nav />

    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full h-fit p-3 mt-[75px] gap-4">
        <div class="card mt-2 mx-auto h-fit w-full bg-primary-content">
            <div class="card-body">
                <h2 class="card-title">Active Races</h2>
                {#if currentRaces.length > 0}
                    <ul class="px-3">
                        {#each currentRaces as race (race.id)}
                            {#if race.status === "in-progress"}
                                <li class="underline text-accent">
                                    <a href="/Race Details/?id={race.id}">
                                        {race.name} - {race.date}
                                    </a>
                                </li>
                            {:else}
                                <li class="underline text-primary">
                                    <a href="/Race Details/?id={race.id}">
                                        {race.name} - {race.date}
                                    </a>
                                </li>
                            {/if}
                        {/each}
                    </ul>
                {:else}
                    <p>No races currently active...</p>
                    <div class="card-actions justify-center mt-1 w-full">
                        <a href="/Race Create" type="button" class="btn btn-sm btn-primary w-full">Start new race</a>
                    </div>
                {/if}
            </div>
        </div>
        <div class="card mt-2 mx-auto h-full w-full  bg-primary-content">
            <div class="card-body">
                <h2 class="card-title">Completed Races</h2>
                <div class="overflow-x-auto">
                    <table class="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Race</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                            {#each races as race}
                                {#if race.status === "complete"}
                                    <tr class="hover">
                                        <th><a href="/Race Details/?id={race.id}">{race.id}</a></th>
                                        <td><a href="/Race Details/?id={race.id}">{race.name}</a></td>
                                        <td><a href="/Race Details/?id={race.id}">{race.date}</a></td>
                                    </tr>
                                {/if}
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>