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
     class="p-4 mx-2 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
     role="alert">
    <div class="flex items-center">
        <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span class="sr-only">Info</span>
        {#if alertTitle}
            <h3 class="text-lg font-medium">{alertTitle}</h3>
        {/if}
    </div>
    <div class="mt-2 mb-4 text-sm">
        {#if alertHasLink}
            <p id="alertMessage_Link"></p>
        {:else}
            {alertMessage}
        {/if}
    </div>
    <div class="flex">
        <button type="button"
                class="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800"
                data-dismiss-target="#alert-additional-content" aria-label="Close">
            Dismiss
        </button>
    </div>
</div>