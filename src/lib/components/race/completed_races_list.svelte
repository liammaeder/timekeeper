<script>
    import { onMount }  from 'svelte';
    import Loader       from '$lib/components/misc/Loader.svelte';
    import Race         from '$lib/class/race/Race.js';
    const raceCls       = new Race;
    let dataFetched     = false;
    let completedRaces;

    onMount(async () => {
        try {
            completedRaces = await raceCls.getCompletedRaces();

            dataFetched = true;
        } catch (e) {
            console.error("Error occurred: ", e.message);
        }
    });

    function onClickRow(raceId) {
        window.location.href = `/race/view?id=${raceId}`;
    }
</script>

<div class="mx-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <h5 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Race History</h5>
    {#if dataFetched}
        {#if completedRaces.length > 0}
            <div class="relative overflow-x-auto mx-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="dark:text-white light:text-black">
                            <th scope="col" class="px-6 py-3">Race</th>
                            <th scope="col" class="px-6 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {#each completedRaces as race}
                        {#if completedRaces}
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer" on:click={() => onClickRow(race.id)}>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{race.name}</th>
                                <td >{raceCls.formatDate(race.date)}</td>
                            </tr>
                        {:else}
                            <p>No past races...</p>
                        {/if}
                    {/each}
                    </tbody>
                </table>
            </div>
        {:else}
            <p>No completed races</p>
        {/if}
    {:else}
        <Loader />
    {/if}
</div>