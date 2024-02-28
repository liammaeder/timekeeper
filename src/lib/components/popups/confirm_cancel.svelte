<script>
    //region imports
    //endregion

    //region export variables
    export let showModal;
    export let confirmCallback;
    export let cancelCallback;
    //endregion

    //region local variables
    //endregion
</script>

<style>
    .custom-modal {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
    }
</style>

<div>
    {#if showModal}
        <div class="fixed z-[49] opacity-[0.88] bg-gray-900 w-screen h-screen top-0 left-0"></div>

        <!-- Main modal -->
        <div class="fixed z-50 custom-modal w-screen h-screen top-0 left-0">
            <div class="relative p-4 max-w-md h-fit">
                <!-- Modal content -->
                <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to cancel? Any unsaved changes will lost.</p>
                    <div class="flex justify-center items-center space-x-4">
                        <button on:click={cancelCallback} type="button" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            No
                        </button>
                        <button on:click={confirmCallback} type="button" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                            Yes, cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>