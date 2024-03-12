<script>
    //region imports
    import { onMount, createEventDispatcher }   from 'svelte';
    //endregion

    //region export variables
    export let list = [];
    //endregion

    //region local variables
    const dispatch = createEventDispatcher();
    let searchText = "";
    let selectableList = [];
    let showList = false;
    let selectedItem = '';
    //endregion

    onMount(() => {
       updateSelectableList();
    });

    function updateSelectableList() {
        selectableList = searchText.length > 0 ? list.filter(listItem => listItem.toLowerCase().includes(searchText)) : list;
        showList = selectableList.length > 0;
    }
    function handleInputChange(event) {
        searchText = event.target.value.toLowerCase();
        updateSelectableList();
        selectedItem = '';
        dispatch('searched', {item: searchText});
    }

    function handleSelectChange(event) {
        const idStr = event.target.id;
        const id = idStr.substring('item-'.length, idStr.length);
        console.log("onSelectChange");
        console.log(idStr);
        console.log(idStr.substring('item-'.length, idStr.length));
        console.log(event.target.id.substring('item-'.length, event.target.id.length));
        dispatch('selected', {item: id});
    }
</script>

<div class="dropdown">
    <input on:input={handleInputChange} type="text" placeholder="Search or Add racer...">

    <select on:change={handleSelectChange} bind:value={selectedItem}>
        {#if showList}
            {#each selectableList as selectItem}
                <option id={`item-selectItem.id`}>{selectItem.value}</option>
            {/each}
        {:else}
            <option class="text-center text-xl text-gray-500 dark:text-gray-300">No options to show</option>
        {/if}
    </select>
</div>

