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
</script>

<div class="mx-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <h5 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Race History</h5>
    {#if dataFetched}
        {#if completedRaces.length > 0}
            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                    <tr class="dark:text-white light:text-black">
                        <th></th>
                        <th>Race</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each completedRaces as race}
                        {#if completedRaces}
                            <tr class="hover">
                                <th><a href="/race/view?id={race.id}">{race.id}</a></th>
                                <td><a href="/race/view?id={race.id}">{race.name}</a></td>
                                <td><a href="/race/view?id={race.id}">{raceCls.formatDate(race.date)}</a></td>
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