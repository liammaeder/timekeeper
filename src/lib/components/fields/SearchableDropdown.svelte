<script>
    //region imports
    import {createEventDispatcher, onDestroy, onMount} from "svelte";
    import pageEvent from "$lib/class/helpers/PageEvent.js";
    import Icon from "@iconify/svelte";
    //endregion

    //region export variables
    export let listData;
    export let racerId;
    export let field;
    //endregion

    //region local variables
    let racerName = "";
    let showList = false;
    let filteredItems = [];
    let showFilteredList = false;
    let showCreatedButton = false;
    let showCreateButton = true;
    let filterMatch = true;
    let fieldValidation = true;
    let isInteracted = false;
    let validationMessage = 'Please create or select a racer.';
    //endregion

    const dispatch = createEventDispatcher();

    onMount(() => {
        pageEvent.addPageEvent('boat_type_changed', removeRacer);
        pageEvent.addPageEvent('field_validated', genericHandler);

        setInterval(() => {
            showFilteredList = filteredItems.length > 0 && filterMatch === true;
        }, 100);
    })

    function genericHandler() {
        //nothing to be done
    }

    function removeRacer() {
        racerName = '';
    }

    function showDropdownList() {
        isInteracted = true;
        showList = listData.length > 0;
    }

    function hideDropdownList() {
        setInterval(() => {
            validateField();
            showList = false;
        }, 300);
    }

    function validateField() {
        fieldValidation = racerName.trim() !== "";
        pageEvent.triggerEvent('field_validated', {fieldId: field.id, isValid: fieldValidation});
    }

    function searchRacer() {
        filteredItems = listData.filter(item => item.name.toLowerCase().match(racerName.toLowerCase()));
        filterMatch = filteredItems.length > 0;
        validateField();
    }

    function RacerCreated() {
        showCreatedButton = true;
        showCreateButton = false;
        dispatch('racerCreated', {name: racerName, prevRacer: racerId});
        validateField();
    }

    function RacerSelected(racer) {
        showCreateButton = false;
        showCreatedButton = false;
        showList = false;
        racerName = racer.name;
        validateField();
        let id = racer.id;
        dispatch('racerSelected', {newId: id, prevRacer: racerId});
    }

    onDestroy(() => {
        pageEvent.removePageEvent('boat_type_changed', removeRacer);
        pageEvent.removePageEvent('field_validated', genericHandler);
    })
</script>

<style>
</style>

<div>
    <div class="w-full grid grid-cols-12 gap-2 pl-0 pr-5">
        <div class="col-span-8 md:col-span-10 lg:col-span-10">
            <input
                    on:focus={showDropdownList}
                    on:input={validateField}
                    on:focusout={hideDropdownList}
                    on:keyup={searchRacer}
                    bind:value={racerName}
                    type="text"
                    placeholder="Search/Create Racer...."
                    autocomplete="off"
                    id="SearchInput"
                    class="block py-2.5 w-full dark:placeholder-gray-400 text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white focus:outline-none focus:ring-0
                            focus:border-blue-600 {!fieldValidation && isInteracted ? 'dark:placeholder-red-300 placeholder-red-600 border-red-600 focus:border-red-600 dark:focus:border-red-500' :
                            'border-gray-300 dark:border-gray-600 dark:focus:border-blue-500'}"
            >
            {#if !fieldValidation && isInteracted}
                <p class="mt-2 w-fit border px-2 rounded border-red-600 text-red-300 text-sm">
                    {validationMessage}
                </p>
            {/if}
        </div>
        {#if showCreateButton && !showCreatedButton}
            <button on:click={RacerCreated} type="button" class="col-span-4 md:col-span-2 lg:col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-fit text-sm h-fit my-auto px-3 ml-auto mr-0 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">New</button>
        {:else if showCreatedButton && !showCreateButton}
            <button type="button" class="col-span-4 md:col-span-2 lg:col-span-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg w-fit text-sm h-fit my-auto px-3 ml-auto mr-0 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <Icon icon="material-symbols:check-rounded" class="h-7 w-7"/>
            </button>
        {/if}
    </div>
    {#if showList && filterMatch}
        <div class="w-[75%] scroll-auto overflow-y-auto max-h-[200px] p-2 mt-2 grid grid-cols-1 bg-white dark:bg-gray-700 border border-gray-200 rounded-lg shadow dark:border-gray-500 gap-1 z-10 fixed">
            {#if showFilteredList }
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