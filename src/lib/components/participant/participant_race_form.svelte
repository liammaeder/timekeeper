<script>

    import { onMount}       from "svelte";
    import Loader           from '$lib/components/misc/Loader.svelte';
    import RacerRaceForm    from "$lib/components/racer/racer_race_form.svelte";
    export let participant;
    import typeCls          from "$lib/class/participants/ParticipantType.js";
    let partType            = new typeCls();
    let dataFetched         = false;
    let boatTypes;

    onMount(async () => {
        try {
            boatTypes = await partType.getTypes();

            dataFetched = true;
        } catch (error) {
            console.error("Error occurred: ", error.message);
        }
    });
</script>

{#if dataFetched}
    <form class="w-full h-fit grid sm:grid-cols-1 md:grid-cols-2">
        <div class="relative z-0 w-fill my-2 mx-3 group">
            <label for="underline_select" class="sr-only">Boat Type</label>
            <select bind:value={participant.boatType} id="underline_select" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                <option selected>Choose a type</option>
                {#each boatTypes as type}
                    <option value={type.id}>{type.name}</option>
                {/each}
            </select>
        </div>

        {#if participant.boatType}
            {#if participant.boatType === 1}
                <RacerRaceForm participantId={participant.id}/>
            {:else if participant.boatType === 2}
                <RacerRaceForm participantId={participant.id}/>
                <RacerRaceForm participantId={participant.id}/>
            {:else}
                <RacerRaceForm participantId={participant.id}/>
                <RacerRaceForm participantId={participant.id}/>
                <RacerRaceForm participantId={participant.id}/>
            {/if}
        {/if}
    </form>
{:else}
    <Loader />
{/if}