<script>
    import Nav              from '$lib/navbar/navbar.svelte';
    import ActiveRaces      from '$lib/components/race/active_races_list.svelte';
    import CompletedRaces   from '$lib/components/race/completed_races_list.svelte';
</script>

<Nav />
<div class="p-4 sm:ml-48 h-screen light:bg-white dark:bg-gray-800 ">
    <div class="p-4 mt-14 dark:bg-grey-800 bg-blue">
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
</div>