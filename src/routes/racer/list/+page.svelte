<script>
    import {onMount}    from "svelte";
    import Racer        from '$lib/class/racers/Racers.js';
    import Loader       from '$lib/components/misc/Loader.svelte';
    let racer           = new Racer();
    let dataFetched     = false;
    let racersList;

    onMount(async () => {
        try {
            racersList = await racer.getAllRacers();
            dataFetched = true;
        } catch (e) {
            console.error(e);
            console.error("Error occurred: ", e.message);
        }
    });

    function onClickRow(raceId) {
        window.location.href = `/racer/view?id=${raceId}`;
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
        <h3 class="text-3xl font-bold dark:text-white">Racers</h3>
    </div>
    <div class="flex justify-end items-end">
        <a href="/racer/new" type="button" class="px-3 py-2 text-xs font-medium text-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:border-blue-500 dark:text-blue-400 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">Create Racer</a>
    </div>
</div>
{#if dataFetched}
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-2 py-3">
                </th>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                    CSA #
                </th>
            </tr>
            </thead>
            <tbody>
            {#each racersList as racerRow}
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer" on:click={() => onClickRow(racerRow.id)}>
                    <th scope="row" class="pl-6 pr-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {racerRow.id}
                    </th>
                    <td class="px-6 py-4">
                        {racerRow.name}
                    </td>
                    <td class="px-6 py-4 text-center">
                        {racerRow.csa = racerRow.csa ? racerRow.csa : "-"}
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
{:else}
    <Loader />
{/if}