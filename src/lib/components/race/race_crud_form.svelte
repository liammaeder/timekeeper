<script>
    //region imports
    import ParticipantForm from "$lib/components/participant/participant_race_form.svelte";
    import raceCls from "$lib/class/race/Race.js";
    import Modal from "$lib/components/misc/Modal.svelte";
    import Loader from '$lib/components/misc/Loader.svelte';
    import {onMount} from "svelte";
    import pageEvent from "$lib/class/helpers/PageEvent.js";
    // import { createTrigger, isSavingStore }     from "$lib/components/participant/participantStore.js";
    //endregion

    //region export variables
    export let raceId;
    //endregion

    //region local variables
    let race = new raceCls();
    let isParticipantModalOpen = false;
    let isCancelConfirmModalOpen = false;
    let dataFetched = false;
    let participants = [];
    //endregion

    onMount(async () => {
        pageEvent.addPageEvent('participant_saved', onParticipantSaved);
        pageEvent.addPageEvent('participant_deleted', onParticipantDeleted);

        if (raceId && raceId > 0) {
            console.log(raceId)
            race.id = raceId;
            await getParticipants();
        } else {
            await createRace();
        }

        dataFetched = true;
    });

    function onParticipantDeleted() {
        closeParticipantModal();
    }

    async function onParticipantSaved() {
        await getParticipants();
        closeParticipantModal();
    }

    async function createRace() {
        let result = await race.createRace();
        console.log(result);
        if (result) {
            await getParticipants();
        }
    }

    async function saveRaceDetails() {
        let result = await race.updateRace();
        if (result) {
            console.log(result);
            raceId = result.id;
            race.id = result.id;
            race.name = result.name;
            race.date = result.date;
            race.status = result.status;
        }
    }

    async function deleteRace() {
        let result = await race.updateRace();
        if (result) {
            window.location.href = "/race/list";
        }
    }

    async function getParticipants() {
        participants = await race.getRaceParticipants();
    }

    function openParticipantModal() {
        isParticipantModalOpen = true;
    }

    function closeParticipantModal() {
        isParticipantModalOpen = false;
    }

    function openConfirmCancelModal() {
        isParticipantModalOpen = true;
    }

    function closeConfirmCancelModal() {
        isParticipantModalOpen = false;
    }
</script>

{#if dataFetched}
    <div class="w-full mx-auto mb-2 px-2 py-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full h-fit grid sm:grid-cols-1 md:grid-cols-2">
            <div class="relative z-0 w-fill my-2 mx-3 group">
                <input bind:value={race.name} type="text" name="floating_name" id="floating_name"
                       class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       placeholder=" " required/>
                <label for="floating_name"
                       class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Race
                    Name</label>
            </div>
            <div class="relative z-0 w-fill m-2 group">
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
            <br>
        </div>
        {#if participants}
            <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {#each participants as participantRow, index (index)}
                    <li class="pb-3 sm:pb-4">
                        <div class="flex items-center space-x-4 rtl:space-x-reverse">
                            <div class="flex-shrink-0">
                                {index + 1} -
                            </div>
                            <div class="flex-1 min-w-0">
                                {#if participantRow.boatType}
                                    {participantRow.boatType}
                                {:else}
                                    Boat Type not specified
                                {/if}
                            </div>
                        </div>
                    </li>
                {/each}
            </ul>
        {/if}
        <div class="w-full">
            <button on:click={openParticipantModal}
                    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">
                Add Participant
            </button>
        </div>
    </div>
    <div class="grid grid-cols-2 w-full mx-auto mb-2 px-2 py-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full">
            <button on:click={saveRaceDetails} type="button"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Save
            </button>
        </div>
        <div class="w-full">
            <button on:click={deleteRace} type="button"
                    class="w-full ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                Cancel
            </button>
        </div>
    </div>
{:else}
    <Loader/>
{/if}

<Modal isOpen={isParticipantModalOpen} onClose={closeParticipantModal} title="Create Participant">
    <!-- Modal body -->
    <div class="p-4">
        <ParticipantForm raceId={race.id}/>
    </div>
</Modal>

<Modal isOpen={isCancelConfirmModalOpen} onClose={closeConfirmCancelModal} title="Create Participant">
    <!-- Modal body -->
    <div class="p-4">
        <ParticipantForm raceId={race.id}/>
    </div>
</Modal>