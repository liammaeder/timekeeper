<script>
    //region imports
    import Loader                           from '$lib/components/misc/Loader.svelte';
    import racerCls                         from '$lib/class/racers/Racers.js';
    import {onDestroy, onMount} from 'svelte';
    import {createTrigger, isSavingStore}   from "$lib/components/racer/racerStore.js";
    import pageEvent                        from "$lib/class/helpers/PageEvent.js";
    //endregion

    //region export variables
    export let participantId;
    export let racerNum;
    //endregion

    //region local variables
    let dataFetched             = false;
    let racer                   = new racerCls();
    let isNewRacer              = false;
    let racerList;
    let selectedRacer;
    let racerName;
    let racerCSA;
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
        try {
            racer.limit = 999999999;
            racerList = await racer.getAllRacers();

            if (racerList && racerList.length > 0) {
                dataFetched = true;
            }
        } catch (error) {
            console.error(error.message);
        }
    });

    async function racerCreate() {
        racer = new racerCls();
        racer.participant = participantId;
        racer.name = racerName;
        racer.csa = racerCSA;
        let result = await racer.createRacer();

        if (result) {
            racer.id = result.insertId;
            await racerLink();
        }
    }

    async function racerLink() {
        await racer.linkRacer();
    }

    const handleClick = (event) => {
        selectedRacer = racerList.find((racerItem) => event.target.value === racerItem.name);

        if (selectedRacer) {
            isNewRacer = false;
            racer.id = selectedRacer.id;
            racer.name = selectedRacer.name;
            racer.csa = selectedRacer.csa;
        } else {
            isNewRacer - true;
            racerName = event.target.value;
            racerCSA = null;
        }
    }
</script>

{#if dataFetched}
    <form>
        <div class="h-fit grid grid-cols-12 mt-2">
            <h5 class="text-sm m-auto w-full col-span-4 md:col-span-2 lg:col-span-1 font-bold">Racer #{racerNum}</h5>
            <div class="relative z-0 my-2 mx-auto w-full col-span-8 md:col-span-10 lg:col-span-11 group">
                <dataList id="racers">
                    {#each racerList as racerOption}
                        <option value={racerOption.name}></option>
                    {/each}
                </dataList>
                <input type="text" name="name_search" id="name_search" list="racers" on:focusout={handleClick} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Search racer..." required/>
                <label for="name_search" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Racer Name
                </label>
            </div>
        </div>
    </form>
{:else}
    <Loader />
{/if}