<script>
    import Race         from '$lib/class/race/Race.js';
    import {onMount}    from "svelte";
    import Loader       from '$lib/components/misc/Loader.svelte';
    let race            = new Race();
    let raceList;
    let dataFetched = false;

    onMount(async () => {
        try {
            raceList = await race.getAllRaces();
            dataFetched = true;
        } catch (e) {
            console.info(e);
            console.error("Error occurred: ", e.message);
        }
    });

    function formatDate(dateStr) {
        let date = new Date(dateStr);
        const options = { year: 'numeric', month: 'short', day: 'numeric'};
        return date.toLocaleString('en-ZA', options);
    }

    function formatStatus(statusStr) {
        return statusStr.charAt(0).toUpperCase() + statusStr.slice(1);
    }

    function onClickRow(raceId) {
        console.log(raceId);
        window.location.href = `/race/view?id=${raceId}`;
    }
</script>

<div class="w-full mb-3">
    <a href="/">
        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
        </svg>
    </a>
</div>
<div class="mb-3 grid grid-cols-2">
    <div class="flex justify-start items-start">
        <h3 class="text-3xl font-bold dark:text-white">Races</h3>
    </div>
    <div class="flex justify-end items-end">
        <a href="/race/new" type="button" class="px-3 py-2 text-xs font-medium text-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:border-blue-500 dark:text-blue-400 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">Create Race</a>
    </div>
</div>
{#if dataFetched}
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Status
                    </th>
                </tr>
                </thead>
            <tbody>
                {#each raceList as raceRow}
                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer" on:click={() => onClickRow(raceRow.id)}>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {raceRow.name}
                        </th>
                        <td class="px-6 py-4">
                            {formatDate(raceRow.date)}
                        </td>
                        <td class="px-6 py-4">
                            {formatStatus(raceRow.status)}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{:else}
    <Loader />
{/if}