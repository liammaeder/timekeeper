<script>
    //region imports
    import {createEventDispatcher, onDestroy, onMount} from "svelte";
    import pageEvent from "$lib/class/helpers/PageEvent.js";
    //endregion

    //region export variables
    export let listData;
    //endregion

    //region local variables
    let racerName = "";
    let showList = false;
    let filteredItems = [];
    let showFilteredList = false;
    //endregion

    const dispatch = createEventDispatcher();

    onMount(() => {
        pageEvent.addPageEvent('boat_type_changed', removeRacer);

        setInterval(() => {
            showFilteredList = filteredItems.length > 0;
        }, 100);
    })

    function removeRacer() {
        racerName = '';
    }

    function showDropdownList() {
        showList = listData.length > 0;
    }

    function hideDropdownList() {
        setInterval(() => {
            showList = false;
        }, 100);
    }

    function searchRacer() {
        filteredItems = listData.filter(item => item.name.toLowerCase().match(racerName.toLowerCase()));
    }

    function RacerCreated() {
        dispatch('racerCreated', {racerName});
    }

    function RacerSelected(racer) {
        showList = false;
        racerName = racer.name;
        let id = racer.id;
        dispatch('racerSelected', {id});
    }

    onDestroy(() => {
        pageEvent.removePageEvent('boat_type_changed', removeRacer);
    })
</script>

<style>
</style>

<div>
    <div class="w-full grid grid-cols-12 gap-2 pl-0 pr-5">
        <input on:focus={showDropdownList} on:focusout={hideDropdownList} on:keyup={searchRacer} bind:value={racerName} type="text" placeholder="Search/Create Racer...." autocomplete="off" id="SearchInput" class="col-span-8 md:col-span-10 lg:col-span-10 block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
        <button on:click={RacerCreated} type="button" class="col-span-4 md:col-span-2 lg:col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-fit text-sm px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">New </button>
    </div>
    {#if showList}
        <div class="w-[75%] scroll-auto overflow-y-auto max-h-[200px] p-2 mt-2 grid grid-cols-1 bg-white dark:bg-gray-700 border border-gray-200 rounded-lg shadow dark:border-gray-500 gap-1 z-10 fixed">
            {#if showFilteredList}
                {#each filteredItems as item}
                    <button class="w-full text-left" on:click={() => {RacerSelected({id: item.id, name: item.name})}}>{item.name}</button>
                {/each}
            {:else}
                {#each listData as item}
                    <button class="w-full text-left" on:click={() => {RacerSelected({id: item.id, name: item.name})}}>{item.name}</button>
                {/each}
            {/if}
        </div>
    {/if}
</div>