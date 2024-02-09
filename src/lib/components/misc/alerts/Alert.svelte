<script>
    //region imports
    import {onMount} from "svelte";
    //endregion

    //region export variables
    export let alertMessage;
    export let alertTitle;
    export let alertHasLink = false;
    //endregion

    onMount(() => {
        if (alertHasLink) {
            let element = document.createElement('span');
            element.innerHTML = alertMessage;
            document.getElementById("alertMessage_Link").appendChild(element);
        }
    })
</script>


<div id="alert-additional-content"
     class="p-4 mx-2 mb-4 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
     role="alert">
    <div class="flex items-center">
        <svg class="flex-shrink-0 w-4 h-4 me-2 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Alert</span>
        {#if alertTitle}
            <h3 class="text-lg font-medium text-gray-800 dark:text-gray-300">{alertTitle}</h3>
        {/if}
    </div>
    <div class="mt-2 mb-4 text-sm text-gray-800 dark:text-gray-300">
        {#if alertHasLink}
            <p id="alertMessage_Link"></p>
        {:else}
            {alertMessage}
        {/if}
    </div>
    <div class="flex">
        <button type="button"
                class="text-gray-800 bg-transparent border border-gray-700 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-800 dark:text-gray-300 dark:hover:text-white"
                data-dismiss-target="#alert-additional-content" aria-label="Close">
            Dismiss
        </button>
    </div>
</div>

