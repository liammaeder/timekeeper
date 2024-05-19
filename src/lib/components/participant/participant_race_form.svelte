<script>
    //region imports
    import { writable }             from 'svelte/store';
    import {Label, Select}          from 'flowbite-svelte';
    import { onDestroy, onMount }   from "svelte";
    import Loader                   from '$lib/components/misc/Loader.svelte';
    import RacerRaceForm            from "$lib/components/racer/racer_race_form.svelte";
    import typeCls                  from "$lib/class/participants/ParticipantType.js";
    import partCls                  from "$lib/class/participants/Participants.js";
    import pageEvent                from "$lib/class/helpers/PageEvent.js";
    //endregion

    //region exports
    export let raceId;
    export let participantId;

    export let isEditable = false;
    //endregion

    //region local variables
    let participant = new partCls();
    let partType    = new typeCls();
    let dataFetched = false;
    let createRacer = writable(false);
    let boatTypes;
    let validation = {};
    let fieldValidation = true;
    let isInteracted = false;
    let validationMessage = 'Please select a boat type.';

    function handleEvent() {
        //nothing to be done
    };
    //endregion

    onMount(async () => {
        pageEvent.addPageEvent('participant_saved', handleEvent);
        pageEvent.addPageEvent('participant_deleted', handleEvent);
        pageEvent.addPageEvent('boat_type_changed', handleEvent);
        pageEvent.addPageEvent('save_clicked', handleEvent);
        pageEvent.addPageEvent('field_validated', handleFieldValidation);

        try {
            boatTypes = await partType.getTypes();
            if (participantId && participantId > 0) {
                await getParticipantDetails();
            } else {
                await createParticipant();
            }
            initializeFields();
            dataFetched = true;
        } catch (error) {
            console.error("Error occurred: ", error.message);
        }
    });

    function initializeFields() {
        validation = {};
        let fieldCount = participant.boatType + 1;

        if (fieldCount > 0) {
            for (let i = 1; i <= fieldCount; i++) {
                validation[`field${i}`] = false;
            }
        }
    }

    function handleFieldValidation(event) {
        validation[`field${event.fieldId}`] = event.isValid;
        console.log("field validated")
    }

    function validateForm() {
        let formValidation = true;

        Object.values(validation).forEach((value) => {
            console.log(value);
            if (!value) {
                formValidation = false;
            }
        });

        return formValidation;
    }

    async function createParticipant() {
        participant.race = raceId;
        await participant.createParticipant();
    }

    async function getParticipantDetails(id) {
        await participant.getParticipant(id);
    }

    async function boatTypeChanged(event) {
        await participant.unlinkAllRacers();
        initializeFields();
        handleFieldValidation({fieldId: participant.boatType + 1, isValid: true});
        fieldValidation = true;
        isInteracted = true;
        pageEvent.triggerEvent("boat_type_changed", event);
    }

    function updateParticipant(event) {
        isInteracted = true;
        fieldValidation = validation[`field${participant.boatType + 1}`];
        let formValid = validateForm();
        if (formValid) {
            pageEvent.triggerEvent("participant_saved", event);
        } else {
            pageEvent.triggerEvent("save_clicked", event);
        }
    }

    async function deleteParticipant(event) {
        await participant.deleteParticipant();
        pageEvent.triggerEvent("participant_deleted", event);
    }

    onDestroy(() => {
        pageEvent.removePageEvent("participant_saved", handleEvent);
        pageEvent.removePageEvent("participant_deleted", handleEvent);
        pageEvent.removePageEvent('boat_type_changed', handleEvent);
        pageEvent.removePageEvent('save_clicked', handleEvent);
        pageEvent.removePageEvent('field_validated', handleFieldValidation);
    });
</script>

{#if dataFetched}
    <form class="w-full h-fit">
        <div class="w-full group">
            <Label for="select_type">Select boat type</Label>
            <Select id="select_type" on:change={boatTypeChanged} bind:value={participant.boatType}
                    class="mt-2 border  {!fieldValidation && isInteracted ? 'border-red-600 focus:border-red-600 dark:focus:border-red-500' : ''}">
                <option selected>Choose a type</option>
                {#each boatTypes as type}
                    <option value={type.id}>{type.name}</option>
                {/each}
            </Select>
            {#if isInteracted &&!fieldValidation}
                <p class="mt-2 w-fit border px-2 rounded border-red-600 text-red-300 text-sm">
                    {validationMessage}
                </p>
            {/if}
        </div>

        {#if participant.boatType}
            {#each Array.from({length: participant.boatType}) as boat, i}
                <RacerRaceForm field={{id: i+1, isValid: validation[`field${i+1}`]}} createRacer={createRacer} racerNum={i + 1} participantId={participant.id} raceId={raceId} />
            {/each}
        {/if}
    </form>
    <!-- Modal footer -->
    <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button on:click={updateParticipant} type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Save
        </button>
        <button on:click={deleteParticipant} type="button"
                class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            Cancel
        </button>
    </div>
{:else}
    <Loader />
{/if}