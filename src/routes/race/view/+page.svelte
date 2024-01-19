<script>
    import Nav              from '$lib/navbar.svelte';
    import Race             from '$lib/class/race/Race.js';
    import UrlController    from '$lib/Url.js';
    import { browser }      from '$app/environment';
    import { theme }        from "$lib/store.js";

    let id = -1;
    let raceDetails;
    let dataLoaded = false;
    let raceState;
    const race = new Race();

    if (browser) {
        let urlString = window.location.href;
        const urlParams = new UrlController(urlString).getUrlParameters();
        if (!urlParams) {
            dataLoaded = true;
        } else {
            for (let pair of urlParams.entries()) {
                if (pair[0] === "id") {
                    id = pair[1];
                }
            }
        }
    }

    raceDetails = race.getRaceWithRacers(id);

    if (!raceDetails.result) {
        dataLoaded = true;
        console.log(raceDetails.Message);
    }

    raceState = raceDetails.status;
</script>

<div data-theme="{$theme}" class="h-screen justify-center">
    <Nav pageName="Race"/>
    <div class="w-full h-fit p-3 mt-[60px]">
        {#if dataLoaded}
            <div class="text-center text-primary">
                No race information available...
            </div>
        {:else}
            {#if raceState === "complete"}
                <div class="rounded-box bg-primary-content text-center text-primary my-2 p-2">
                    <p>Race - {raceDetails.name}: {raceDetails.date}</p>
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
            {:else}
                <div class="rounded-box bg-primary-content text-center text-primary my-2 p-2">
                    <p>Race - {raceDetails.name}: {raceDetails.date}</p>
                </div>
                <div class="w-full h-fit mt-2 mb-3">
                    <button class="btn btn-success w-full">
                        Start All
                    </button>
                </div>
                <div class="mx-1">
                    <!--{#each raceDetails.participants as participant}-->
                        <div class="bg-primary-content rounded-box col-span-1 mb-3 p-0 grid grid-cols-5">
                            <div class="text-left col-span-1">
                                <button class="btn h-full w-full px-1 btn-circle btn-success">Start</button>
                            </div>
                            <div class="text-center h-full col-span-4">
                                <div class="text-center w-full my-auto">K2 - John Doe & Jane Doe</div>
                            </div>
                        </div>
                        <div class="bg-primary-content rounded-box col-span-1 mb-3 p-0 grid grid-cols-5">
                            <div class="text-left col-span-1">
                                <button class="btn h-full w-full px-1 btn-circle btn-success">Start</button>
                            </div>
                            <div class="text-center h-full col-span-4">
                                <div class="text-center w-full my-auto">K1 - Mark Bondie</div>
                            </div>
                        </div>
                    <!--{/each}-->
                </div>
            {/if}
        {/if}
    </div>
</div>