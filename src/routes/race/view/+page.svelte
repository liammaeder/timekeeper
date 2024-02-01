<script>
    import Race             from '$lib/class/race/Race.js';
    import FormatterCls     from "$lib/class/helpers/Formatters.js";
    const formatter         = new FormatterCls();
    import UrlController    from '$lib/class/helpers/Url.js';
    import { browser }      from '$app/environment';
    import { onMount }      from 'svelte';
    import Watch            from '$lib/components/race/watch.svelte';
    const race              = new Race();
    let dataFetched         = false;
    let noDataMatched       = false;
    let id                  = -1;
    let isStarted           = false;
    let raceDetails;
    let raceState;
    let eventDispatcher;

    if (browser) {
        let urlString = window.location.href;
        const urlParams = new UrlController(urlString).getUrlParameters();
        if (!urlParams) {
            noDataMatched = true;
        } else {
            for (let pair of urlParams.entries()) {
                if (pair[0] === "id") {
                    id = pair[1];
                }
            }
        }
    }

    onMount( async () => {
        try {
            raceDetails = await race.getRaceWithRacers(id);

            if (raceDetails.id <= 0) {
                noDataMatched = true;
            }

            eventDispatcher = document.createDocumentFragment();

            raceState = raceDetails.status;
            console.log(raceState);
            dataFetched = true;
        } catch (error) {
            console.error("Error fetching race:", error.message);
        }
    });

    function startAllWatches() {
        isStarted = true;
        eventDispatcher.dispatchEvent(new CustomEvent('startAll'));
    }
</script>

<style>
</style>

{#if dataFetched}
    {#if noDataMatched}
        <div class="text-gray-900 dark:text-white text-center">
            No race information available...
        </div>
    {:else}
        {#if raceState === "completed"}
            <div class="mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">{raceDetails.name}: {raceDetails.date}</h5>
            </div>
            <div class="relative overflow-x-auto mx-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">Racers</th>
                            <th scope="col" class="px-6 py-3">Boat Type</th>
                            <th scope="col" class="px-6 py-3">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each raceDetails.participants as participants (participants.id)}
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <ol>
                                        {#each participants.racers as racer}
                                            <li> - {racer.name}</li>
                                        {/each}
                                    </ol>
                                </td>
                                <td class="px-6 py-4">
                                    {participants.type}
                                </td>
                                <td class="px-6 py-4">
                                    {formatter.formatDisplayTime(participants.time)}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {:else}
            <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 text-center">
                <h5 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{raceDetails.name}: {raceDetails.date}</h5>
                {#if !isStarted}
                    <button on:click={() => startAllWatches()} class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-lg px-5 py-2 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full">
                        Start All
                    </button>
                {/if}
                <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-3 mt-2 lg:grid-cols-3 overflow-y-scroll">
                    {#each raceDetails.participants as participant}
                        <Watch participant={participant} {eventDispatcher} />
                    {/each}
                </div>
            </div>
        {/if}
    {/if}
{:else}
    <div class="w-full h-screen bordered text-center border-primary py-5 px-4 mt-[60px]">
        <div class="mt-56">
            <span class="loading loading-ring loading-lg"></span>
        </div>
    </div>
{/if}