<script>
    import { onMount }  from 'svelte';
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

<div>
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
        <div class="w-full h-full bordered text-center border-primary py-5 px-4">
            <div class="m-auto">
                <span class="loading loading-ring loading-lg"></span>
            </div>
        </div>
    {/if}
</div>