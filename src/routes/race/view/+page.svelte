<script>
    import Nav              from '$lib/components/navbar.svelte';
    import Race             from '$lib/class/race/Race.js';
    import UrlController    from '$lib/class/Url.js';
    import { browser }      from '$app/environment';
    import { theme }        from "$lib/stores/store.js";

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

<div data-theme="{$theme}" class="h-screen justify-center text-primarynpm ">
    <Nav pageName="Race"/>
    <div class="w-full h-fit p-3 mt-[60px]">
        {#if dataLoaded}
            <div class="text-center">
                No race information available...
            </div>
        {:else}
            {#if raceState === "complete"}
                <div class="rounded-box bg-primary-content text-center my-2 p-2 text-primary">
                    <p>Race - {raceDetails.name}: {raceDetails.date}</p>
                </div>
                <div class="overflow-x-auto">
                    <table class="table">
                        <thead>
                        <tr class="text-primary">
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
                    <button class="btn btn-sm btn-success w-full">
                        Start All
                    </button>
                </div>
                <div class="mx-1">
                    {#each raceDetails.participants as participant}
                        <div class="dropdown bg-primary-content rounded-lg col-span-1 mb-3">
                            <div class="p-0 grid grid-cols-5 h-fit">
                                <div class="text-left col-span-1">
                                    <button class="btn btn-sm h-fit w-full btn-rounded btn-success">Start</button>
                                </div>
                                <div class="text-center h-fit col-span-3 px-2">
                                    <div role="button" class="text-center w-full my-auto truncate">
                                        {#each participant.racers as racer, i}
                                            <span class="font-bold">{racer.name}</span>{#if i !== participant.racers.length-1}&nbsp;&&nbsp;{/if}
                                        {/each}
                                    </div>
                                </div>
                                <div class="text-left col-span-1">
                                    <button class="btn btn-sm h-fit w-full btn-rounded bg-error text-primary-content">Stop</button>
                                </div>
                                <div class="dropdown-content grid col-span-5 grid-cols-2 h-fit">
                                    <div class="text-left">
                                        <button class="btn btn-sm h-full w-full btn-info">Edit</button>
                                    </div>
                                    <div class="text-right">
                                        <button class="btn btn-sm h-full w-full btn-error">Delete</button>
                                    </div>
                                </div>
                            </div>
<!--                            <div class="p-0 grid grid-cols-5 h-fit">-->
<!--                                <div class="text-left col-span-1">-->
<!--                                    <button class="btn btn-sm h-fit w-full btn-rounded btn-success">Start</button>-->
<!--                                </div>-->
<!--                                <div class="dropdown text-center h-fit col-span-3 px-2">-->
<!--                                    <div role="button" class="text-center w-full my-auto truncate">-->
<!--                                        {#each participant.racers as racer, i}-->
<!--                                            <span class="font-bold">{racer.name}</span>{#if i !== participant.racers.length-1}&nbsp;&&nbsp;{/if}-->
<!--                                        {/each}-->
<!--                                    </div>-->
<!--                                    <div class="dropdown-content grid col-span-5 grid-cols-2 h-fit">-->
<!--                                        <div class="text-left">-->
<!--                                            <button class="btn btn-sm h-full w-full btn-info">Edit</button>-->
<!--                                        </div>-->
<!--                                        <div class="text-right">-->
<!--                                            <button class="btn btn-sm h-full w-full btn-error">Delete</button>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <div class="text-left col-span-1">-->
<!--                                    <button class="btn btn-sm h-fit w-full btn-rounded bg-error text-primary-content">Stop</button>-->
<!--                                </div>-->
<!--                            </div>-->
                        </div>
                    {/each}
                </div>
            {/if}
        {/if}
    </div>
</div>