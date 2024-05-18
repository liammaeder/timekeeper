<script>
    //region imports
    import Loader                               from '$lib/components/misc/Loader.svelte';
    import racerCls                             from '$lib/class/racers/Racers.js';
    import { onDestroy, onMount }               from 'svelte';
    import { createTrigger, isSavingStore }     from "$lib/components/racer/racerStore.js";
    import SearchableDropdown                   from "$lib/components/fields/SearchableDropdown.svelte";
    import pageEvent                            from "$lib/class/helpers/PageEvent.js";
    //endregion

    //region export variables
    export let participantId;
    export let raceId;
    export let racerNum;
    export let field;
    //endregion

    //region local variables
    let dataFetched             = false;
    let racer                   = new racerCls();
    let isNewRacer              = true;
    let racerCSA;
    let racerList;
    //endregion

    //region subscriptions
    createTrigger.subscribe(value => {
        if (value) {
            if (isNewRacer) {
                racerCreate();
            } else {
                racerLink();
            }
        }
    });

    racer.isSaving.subscribe(value => {
        isSavingStore.set(value);
    })
    //endregion

    onMount(async () => {
        pageEvent.addPageEvent('racer_select', updateRacerList);
        pageEvent.addPageEvent('racer_selected', racerLink);
        pageEvent.addPageEvent('racer_created', racerCreate);

        try {
            racer.participant = participantId;
            racer.limit = 9999999999;
            racerList = await racer.getAllRacersNotInRace(raceId);

            if (racerList) {
                dataFetched = true;
            }
        } catch (error) {
            console.error(error.message);
        }
    });

    function updateRacerList(event) {
        let id;
        if (event.detail) {
            id = event.detail.id
        } else {
            id = racer.id
        }
        racerList = racerList.filter(item => item.id !== id);
    }

    async function racerCreate(event) {
        // if (event.prevRacer > 0) {
        //     await racer.unlinkRacer()
        // }

        racer = new racerCls();
        racer.participant = participantId;
        racer.name = event.name;
        racer.csa = racerCSA;

        let result = await racer.createRacer();

        if (result) {
            racer.id = result.insertId;
            await racerLink();
        }
    }

    async function racerLink(event) {
        console.log(event);
        if (event) {
            pageEvent.triggerEvent("racer_select", event);
            racer.id = event.newId;
        } else {
            pageEvent.triggerEvent("racer_select", {id: racer.id});
        }
        await racer.linkRacer();
    }

    onDestroy(() => {
        pageEvent.removePageEvent('racer_select', updateRacerList);
        pageEvent.removePageEvent('racer_selected', racerLink);
        pageEvent.removePageEvent('racer_created', racerCreate);
    })
</script>

<div>
    {#if dataFetched}
        <form>
            <div class="h-fit grid grid-cols-12 mt-2">
                <h5 class="text-sm m-auto w-full col-span-12 md:col-span-2 lg:col-span-1  font-bold">Racer #{racerNum}</h5>
                <div class="my-2 mx-auto w-full col-span-12 md:col-span-10 lg:col-span-11 group">
                    <SearchableDropdown field={field} listData={racerList} racerId={racer.id} />
                </div>
            </div>
        </form>
    {:else}
        <Loader />
    {/if}
</div>