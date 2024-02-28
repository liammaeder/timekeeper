<script>
    //region imports
    import ConfirmAlert from "$lib/components/misc/alerts/AlertConfirm.svelte";
    import SuccessAlert from "$lib/components/misc/alerts/AlertMessage.svelte";
    import raceCls from "$lib/class/race/Race.js";
    import { goto } from '$app/navigation';
    import {onMount} from "svelte";
    //endregion

    //region export variables
    //endregion

    //region local variables
    let race = new raceCls();
    let showConfirm = false;
    let showSuccess = false;
    //endregion

    onMount(async () => {
        await race.createRace();
    })

    async function saveRaceDetails() {
        await race.updateRace();
        showSuccess = true;
        setTimeout(() => {
            showSuccess = false;
            goto(`/race/edit?id=${race.id}`);
        },2000);
    }

    function cancelClicked() {
        showConfirm = true;
    }

    function closeModal() {
        showConfirm = false;
    }

    function deleteRace() {
        race.deleteRace();
        goto('/');
    }
</script>

<div class="w-full h-fit grid sm:grid-cols-1 md:grid-cols-2">
    <div class="relative z-0 w-fill my-3 md:mt-2 md:mb-3 md:mr-3 group">
        <input bind:value={race.name} type="text" name="floating_name" id="floating_name"
               class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
               placeholder=" " required/>
        <label for="floating_name"
               class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Race
            Name</label>
    </div>
    <div class="relative z-0 w-fill my-3 md:mt-2 md:mb-3 md:ml-2 group">
        <div class="absolute inset-y-0 end-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
            </svg>
        </div>
        <input bind:value={race.date} type="date" name="floating_date" id="floating_date"
               class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
               placeholder=" " required/>
        <label for="floating_date"
               class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date</label>
    </div>
</div>
<div class="grid grid-cols-2 gap-2 mt-2 w-full mx-auto">
    <button on:click={saveRaceDetails} type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Save
    </button>
    <button on:click={cancelClicked} type="button" class="w-full ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
        Cancel
    </button>
</div>

{#if showConfirm}
    <ConfirmAlert icon={'warning'} alertTitle={'Careful!'} alertMessage={'Any unsaved changes will be lost! Do you want to continue?'} confirm={deleteRace} cancel={closeModal} />
{/if}

{#if showSuccess}
    <SuccessAlert icon={'success'} alertMessage={'Saved successfully!'} />
{/if}