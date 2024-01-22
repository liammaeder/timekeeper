<script>
    import Nav              from '$lib/components/navbar.svelte';
    import ActiveRaces      from '$lib/components/race/active_races_list.svelte';
    import CompletedRaces   from '$lib/components/race/completed_races_list.svelte';
    import { theme }        from "$lib/stores/store.js";
</script>

<div data-theme="{$theme}" class="h-dvh">
    <Nav />

    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full h-fit p-3 mt-[60px] gap-4 dark:text-white light:text-black">
        <div class="card mt-2 mx-auto h-fit w-full bg-primary-content/100">
            <div class="card-body">
                <h2 class="card-title">Active Races</h2>
                <ActiveRaces />
            </div>
        </div>
        <div class="card mt-2 mx-auto h-full w-full  bg-primary-content">
            <div class="card-body">
                <h2 class="card-title">Completed Races</h2>
                <CompletedRaces />
            </div>
        </div>
    </div>
</div>