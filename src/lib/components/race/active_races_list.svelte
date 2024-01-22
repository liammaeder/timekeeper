<script>
    import { onMount }  from 'svelte';
    import Race         from '$lib/class/race/Race.js';
    const raceCls       = new Race;
    let dataFetched     = false;
    let activeRaces;

    onMount(async () => {
        try {
            activeRaces = await raceCls.getActiveRaces();

            dataFetched = true;
        } catch (e) {
            console.error("Error occurred: ", e.message);
        }
    });
</script>

<div>
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
    {:else}
        <div class="w-full h-full bordered text-center border-primary py-5 px-4">
            <div class="m-auto">
                <span class="loading loading-ring loading-lg"></span>
            </div>
        </div>
    {/if}
</div>