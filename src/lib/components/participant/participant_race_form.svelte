<script>
    //region imports
    import {writable} from 'svelte/store';
    import {Label, Select} from 'flowbite-svelte';
    import {onDestroy, onMount} from "svelte";
    import Loader from '$lib/components/misc/Loader.svelte';
    import RacerRaceForm from "$lib/components/racer/racer_race_form.svelte";
    import typeCls from "$lib/class/participants/ParticipantType.js";
    import partCls from "$lib/class/participants/Participants.js";
    import pageEvent from "$lib/class/helpers/PageEvent.js";
    //endregion

    //region exports
    export let raceId;
    export let participantId;
    //endregion

    //region local variables
    let participant = new partCls();
    let partType    = new typeCls();
    let dataFetched = false;
    let isEdit      = false;
    let createRacer = writable(false);
    let boatTypes;

    const handleEvent = data => {
        console.log(data);
    };
    //endregion

    onMount(async () => {
        pageEvent.addPageEvent('participant_saved', handleEvent);
        pageEvent.addPageEvent('participant_deleted', handleEvent);

        try {
            boatTypes = await partType.getTypes();
            if (participantId && participantId > 0) {
                await getParticipantDetails();
            } else {
                await createParticipant();
            }
            dataFetched = true;
        } catch (error) {
            console.error("Error occurred: ", error.message);
        }
    });

    async function createParticipant() {
        participant.race = raceId;
        await participant.createParticipant();
    }

    async function getParticipantDetails() {
        await participant.createParticipant();
    }

    async function getParticipantRacers() {

    }

    function updateParticipant(event) {
        pageEvent.triggerEvent("participant_saved", event);
    }

    async function deleteParticipant(event) {
        let result = await participant.deleteParticipant();
        console.log(result);
        pageEvent.triggerEvent("participant_deleted", event);
    }

    onDestroy(() => {
        pageEvent.removePageEvent("participant_saved", handleEvent);
        pageEvent.removePageEvent("participant_deleted", handleEvent);
    });
</script>

{#if dataFetched}
    {#if !isEdit}
        <form class="w-full h-fit">
            <div class="w-full group">
                <Label for="select_type">Select boat type</Label>
                <Select id="select_type" bind:value={participant.boatType} class="mt-2">
                    <option selected>Choose a type</option>
                    {#each boatTypes as type}
                        <option value={type.id}>{type.name}</option>
                    {/each}
                </Select>
            </div>

            {#if participant.boatType}
                {#each Array.from({length: participant.boatType}) as boat, i}
                    <RacerRaceForm createRacer={createRacer} racerNum={i + 1} participantId={participant.id}/>
                {/each}
            {/if}
        </form>
    {:else}
        <form class="w-full h-fit">
            <div class="w-full group">
                <Label for="select_type">Select boat type</Label>
                <Select id="select_type" bind:value={participant.boatType} class="mt-2">
                    <option selected>Choose a type</option>
                    {#each boatTypes as type}
                        <option value={type.id}>{type.name}</option>
                    {/each}
                </Select>
            </div>

            {#if participant.boatType}
                {#each Array.from({length: participant.boatType}) as boat, i}
                    <RacerRaceForm createRacer={createRacer} racerNum={i + 1} participantId={participant.id}/>
                {/each}
            {/if}
        </form>
    {/if}
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