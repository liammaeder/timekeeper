<script>
    import Race             from '$lib/class/race/Race.js';
    import UrlController    from '$lib/class/Url.js';
    import { browser }      from '$app/environment';
    import { onMount }      from 'svelte';
    const race              = new Race();
    let dataFetched         = false;
    let noDataMatched       = false;
    let id                  = -1;
    let raceDetails;
    let raceState;

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

            raceState = raceDetails.status;
            dataFetched = true;
        } catch (error) {
            console.error("Error fetching race:", error.message);
        }
    });
</script>

{#if dataFetched}
    {#if noDataMatched}
        <div class="text-gray-900 dark:text-white text-center">
            No race information available...
        </div>
    {:else}
        {#if raceState === "complete"}
            <div class="mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">{raceDetails.name}: {raceDetails.date}</h5>
            </div>
            <div class="relative overflow-x-auto mx-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class=""></th>
                            <th scope="col" class="px-6 py-3">Boat Type</th>
                            <th scope="col" class="px-6 py-3">Racers</th>
                            <th scope="col" class="px-6 py-3">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each raceDetails.participants as participants (participants.id)}
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {participants.id}
                                </th>
                                <td class="px-6 py-4">
                                    {participants.type}
                                </td>
                                <td class="px-6 py-4">
                                    <ol>
                                        {#each participants.racers as racer}
                                            <li>{racer.name}</li>
                                        {/each}
                                    </ol>
                                </td>
                                <td class="px-6 py-4">
                                    {participants.time}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {:else}
            <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 text-center">
                <h5 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{raceDetails.name}: {raceDetails.date}</h5>
                <button class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-lg px-5 py-2 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full">
                    Start All
                </button>
                <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                        {#each raceDetails.participants as participant}
                            <li class="py-3 sm:py-4">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0">
                                        <button class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Start</button>
                                    </div>
                                    <div class="flex-1 min-w-0 ms-4">
                                        <button class="text-center w-full my-auto truncate" type="button" data-drawer-target="drawer-options-{participant.id}" data-drawer-toggle="drawer-options-{participant.id}" aria-controls="drawer-options-{participant.id}">
                                            {#each participant.racers as racer, i}
                                                {racer.name}{#if i !== participant.racers.length-1}&nbsp;&&nbsp;{/if}
                                            {/each}s
                                        </button>
                                    </div>
                                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <button class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Stop</button>
                                    </div>
                                    <div id="drawer-options-{participant.id}" class="transition-transform -translate-y-full fixed z-40 transform-none" tabindex="-1" aria-labelledby="drawer-label-{participant.id}">
                                        <h5 id="drawer-label-{participant.id}" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">TESTING</h5>
                                    </div>
                                </div>
                            </li>
                        {/each}
                    </ul>
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