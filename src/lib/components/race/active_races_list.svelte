<script>
    import { onMount }  from 'svelte';
    import Loader       from '$lib/components/misc/Loader.svelte';
    import Race         from '$lib/class/race/Race.js';
    const raceCls       = new Race;
    let dataFetched     = false;
    let activeRaces;

    onMount(async () => {
        try {
            activeRaces = await raceCls.getActiveRaces();

            dataFetched = true;
        } catch (e) {
            console.info(e);
            console.error("Error occurred: ", e.message);
        }
    });
</script>

<div class="mx-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <h5 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Active Races</h5>
        {#if dataFetched}
            <ul class="px-1">
                {#each activeRaces as race}
                    <li class="grid grid-cols-3 my-3">
                        <div class="text-success col-span-2 truncate">{race.name} - {raceCls.formatDate(race.date)}</div>
                        <div class="text-right">
                            <a type="button" class="btn btn-square btn-sm btn-primary mx-1" href="/race/edit?id={race.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </a>
                            <a type="button" class="btn btn-square btn-sm btn-white mx-1" href="/race/view?id={race.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                        </div>
                    </li>
                {/each}
            </ul>
            <a href="/race/new" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Create new race
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        {:else}
            <Loader />
        {/if}
</div>