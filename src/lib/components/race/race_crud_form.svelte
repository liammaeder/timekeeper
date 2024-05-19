<script>
    //region imports
    import ParticipantForm          from "$lib/components/participant/participant_race_form.svelte";
    import raceCls                  from "$lib/class/race/Race.js";
    import Modal                    from "$lib/components/misc/Modal.svelte";
    import Loader                   from '$lib/components/misc/Loader.svelte';
    import { onDestroy, onMount }   from "svelte";
    import pageEvent                from "$lib/class/helpers/PageEvent.js";
    import ConfirmAlert             from "$lib/components/alerts/AlertConfirm.svelte";
    import Alert                    from "$lib/components/alerts/AlertMessage.svelte";
    import Toast                    from "$lib/components/toast/Toast.svelte";
    import { browser }              from "$app/environment";
    import UrlController            from "$lib/class/helpers/Url.js";
    import { goto }                 from "$app/navigation";
    //endregion

    //region export variables
    //endregion

    //region local variables
    let race                            = new raceCls();
    let isParticipantModalOpen          = false;
    let dataFetched                     = false;
    let participants                    = [];
    let showConfirmCancel               = false;
    let showConfirmDelete               = false;
    let showRaceSaveSuccess             = false;
    let showRaceSaveFail                = false;
    let raceSaveError                   = "";
    let showDeleteSuccess               = false;
    let showDeleteFail                  = false;
    let deleteError                     = "";
    let showConfirmDeleteParticipant    = false;
    let showParticipantDeleteSuccess    = false;
    let showParticipantDeleteFail       = false;
    let participantDeleteError          = "";
    let noRaceFound                     = false;
    let noParticipantsFound             = false;
    let deleteParticipantId;
    let raceId;
    let participantId = -1;
    //endregion

    onMount(async () => {
        pageEvent.addPageEvent('participant_saved', onParticipantSaved);
        pageEvent.addPageEvent('participant_deleted', onParticipantDeleted);

        if (browser) {
            let urlString = window.location.href;
            const urlParams = new UrlController(urlString).getUrlParameters();
            if (!urlParams) {
                noRaceFound = true;
            } else {
                for (let pair of urlParams.entries()) {
                    if (pair[0] === "id") {
                        raceId = parseInt(pair[1]);
                        race.id = raceId;
                        await getRaceDetails();
                    }
                }
            }
        }

        dataFetched = true;
    });

    async function onParticipantDeleted() {
        closeParticipantModal();
        await getRaceDetails();
    }

    async function onParticipantSaved() {
        await getParticipants();
        closeParticipantModal();
    }

    async function getRaceDetails() {
        dataFetched = false;
        await race.getEditableRace();
        await getParticipants();
        dataFetched = true;
    }

    async function saveRaceDetails() {
        try {
            let result = await race.updateRace();
            if (result && result.json[0].affectedRows > 0) {
                showRaceSaveSuccess = true;
                raceId = result.id;
                race.id = result.id;
                race.name = result.name;
                race.date = result.date;
                race.status = result.status;
            }
        } catch (error) {
            showRaceSaveFail = true;
            raceSaveError = error.message;
        }
    }

    function openConfirmCancel() {
        showConfirmCancel = true;
    }

    function openConfirmDelete() {
        showConfirmDelete = true;
    }

    function openConfirmDeleteParticipant(id) {
        deleteParticipantId = id;
        showConfirmDeleteParticipant = true;
    }

    function closeConfirm() {
        showConfirmCancel = false;
        showConfirmDelete = false;
        showConfirmDeleteParticipant = false;
    }

    async function confirmDelete() {
        try {
            let result = await race.deleteRace();

            if (result) {
                showDeleteSuccess = true;
                setTimeout(() => {
                    goto('/race/list');
                }, 1000);
            }
        } catch (error) {
            showDeleteFail = true;
            deleteError = error.message;
        }
    }

    function confirmCancel() {
        goto(`/race/list`);
    }

    async function getParticipants() {
        participants = await race.getRaceParticipants();
        noParticipantsFound = participants.length <= 0;
    }

    async function deleteParticipant() {
        try {
            let result = await race.deleteRaceParticipant(deleteParticipantId);
            if (result && result.affectedRows > 0) {
                showParticipantDeleteSuccess = true;
                setTimeout(() => {
                    showParticipantDeleteSuccess = false;
                }, 3000)
                await getRaceDetails();
            }
        } catch (error) {
            participantDeleteError = error.message;
            showParticipantDeleteFail = true;
        }
        closeConfirm()
    }

    function openParticipantModal() {
        isParticipantModalOpen = true;
    }

    function closeParticipantModal() {
        isParticipantModalOpen = false;
    }

    onDestroy(() => {
        pageEvent.removePageEvent("participant_saved", closeParticipantModal);
        pageEvent.removePageEvent("participant_deleted", closeParticipantModal);
    });
</script>

{#if dataFetched}
    {#if !noRaceFound}
        <div class="w-full mx-auto mb-2 p-3 border border-gray-200 rounded-lg shadow dark:border-gray-700">
            <div class="w-full mb-2 grid grid-cols-12">
                <p class="col-span-6 md:col-span-8 text-xl font-bold text-black dark:text-white">Race Details</p>
                <div class="col-span-6 md:col-span-4 text-right">
                    <button on:click={openConfirmDelete} type="button" class="text-sm max-h-[25px] text-red-700 hover:text-red-800 rounded-full text-center dark:text-red-500 dark:hover:text-red-600 ">
                        <i class="fa-regular fa-trash-can"></i>&nbsp;Delete Race
                    </button>
                </div>
            </div>
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
        </div>
        <div class="w-full mx-auto mb-2 p-3 border border-gray-200 rounded-lg shadow dark:border-gray-700">
            <div class="w-full mb-2">
                <p class="text-xl font-bold text-black dark:text-white">Participant Details</p>
            </div>
            {#if !noParticipantsFound}
                <ul class="w-full divide-y divide-gray-200 dark:divide-gray-700">
                    {#each participants as participantRow, index (index)}
                        <li class="py-1 sm:pt-2">
                            <div class="grid grid-cols-12 items-center ">
                                <div class="col-span-1">
                                    {index + 1} -
                                </div>
                                <div class="col-span-7 sm:col-span-9">
                                    {#if participantRow.id}
                                        {JSON.parse(participantRow.racers).map((racer) => `${racer}`).join(', ')}
                                    {/if}
                                </div>
                                <div class="col-span-4 sm:col-span-2 text-right">
                                    <button class="btn btn-square btn-sm btn-primary mx-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                    <button on:click={() => openConfirmDeleteParticipant(participantRow.id)} class="text-red-700 text-sm hover:text-red-800 dark:text-red-600 dark:hover:text-red-700 text-center mx-1">
                                        <i class="fa-regular fa-trash-can"></i>
                                    </button>
                                </div>
                            </div>
                        </li>
                    {/each}
                </ul>
            {:else}
                <div class="w-full mx-auto px-2">
                    <p>No participants linked to this race.</p>
                </div>
            {/if}
            <div class="w-full mt-4">
                <button on:click={openParticipantModal} class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    Add Participant
                </button>
            </div>
        </div>
        <div class="grid grid-cols-2 w-full mx-auto mb-2 px-2 py-3 border border-gray-200 rounded-lg shadow dark:border-gray-700">
            <div class="w-full">
                <button on:click={saveRaceDetails} type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Save
                </button>
            </div>
            <div class="w-full">
                <button on:click={openConfirmCancel} type="button" class="w-full ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    Cancel
                </button>
            </div>
        </div>
    {:else}
        <div class="w-full mx-auto mb-2 px-2 py-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p>No race was found with id of {raceId}</p>
        </div>
    {/if}
{:else}
    <Loader/>
{/if}

<div id="popups-div">
    <Modal isOpen={isParticipantModalOpen} onClose={closeParticipantModal} title="Create Participant">
        <div class="p-4">
            <ParticipantForm raceId={race.id} participantId={participantId}/>
        </div>
    </Modal>

    {#if showRaceSaveSuccess}
        <Toast icon={'success'} toastMessage={'Saved successfully!'} />
    {/if}

    {#if showRaceSaveFail}
        <Alert autoClose={true} icon={'error'} alertTitle={'Error saving Race...'} alertMessage={raceSaveError} />
    {/if}

    {#if showDeleteSuccess}
        <Toast icon={'success'} toastMessage={'Race deleted successfully!'} />
    {/if}

    {#if showDeleteFail}
        <Alert icon={'error'} alertTitle={'Error deleting Race...'} alertMessage={deleteError} />
    {/if}

    {#if showParticipantDeleteSuccess}
        <Toast icon={'success'} toastMessage={'Participant deleted successfully!'} />
    {/if}

    {#if showParticipantDeleteFail}
        <Alert icon={'error'} alertTitle={'Error deleting Participant...'} alertMessage={participantDeleteError} />
    {/if}

    {#if showConfirmCancel}
        <ConfirmAlert icon={'warning'} alertTitle={'Careful!'} alertMessage={'Any unsaved changes will be lost! Do you want to continue?'} confirm={confirmCancel} cancel={closeConfirm} />
    {/if}

    {#if showConfirmDelete}
        <ConfirmAlert icon={'warning'} alertTitle={'Are you sure?'} alertMessage={'This will delete the race.'} confirm={confirmDelete} cancel={closeConfirm} />
    {/if}

    {#if showConfirmDeleteParticipant}
        <ConfirmAlert icon={'warning'} alertTitle={'Are you sure?'} alertMessage={'This will delete the participant.'} confirm={deleteParticipant} cancel={closeConfirm} />
    {/if}
</div>