<script>
    import Loader           from '$lib/components/misc/Loader.svelte';
    import racerCls         from '$lib/class/racers/Racers.js';
    import { onMount }      from 'svelte';
    // export let participantId;
    let dataFetched         = false;
    let racer               = new racerCls();
    let racerList;
    let selectedRacer;
    let racerName;
    let racerCSA;
    let isSaving, isLinking;

    racer.isSaving.subscribe(value => {
        isSaving = value;
    });

    racer.isLinking.subscribe(value => {
        isLinking = value;
    });

    onMount( async () => {
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

    async function createRacer() {
        racer = new racerCls();
        racer.name = racerName;
        racer.csa = racerCSA;
        let result = await racer.createRacer();

        if (result) {
            racer.id = result.insertId;
            await createLink();
        }
    }

    async function createLink() {
        // racer.id = selectedRacer.id;
        // racer.name = selectedRacer.name;
        // racer.csa = selectedRacer.csa;
        await racer.linkRacer();
    }

    const handleClick = (event) => {
        console.log(event.target.value);
        selectedRacer = racerList.find((racerItem) => event.target.value === racerItem.name);
        console.log(selectedRacer);
    }
</script>

{#if dataFetched}
    <form class="grid lg:grid-cols-2 sm:grid-cols-1">
        <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 m-3 p-2 border border-gray-500">
            <h5 class="text-lg mx-auto w-11/12 md:col-span-2 lg:col-span-2 font-bold">Create New Racer</h5>
            <div class="relative col-span-1 z-0 w-11/12 md:w-10/12 lg:w-10/12 my-2 mx-auto group">
                <input bind:value={racerName} type="text" name="floating_name" id="floating_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Racer Name</label>
            </div>
            <div class="relative col-span-1 z-0 w-11/12 md:w-10/12 lg:w-10/12 my-2 mx-auto group">
                <input bind:value={racerCSA} type="number" name="floating_csa" id="floating_csa" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label for="floating_csa" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CSA (optional)</label>
            </div>
            {#if (!isSaving && !isLinking) || (!isSaving && isLinking)}
                <button on:click={createRacer} class="h-8 my-1 mx-auto w-11/12 px-8 md:col-span-2 lg:col-span-2 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    Create New
                </button>
            {:else}
                <button disabled type="button" class="h-8 my-1 mx-auto w-11/12 px-8 md:col-span-2 lg:col-span-2 block text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:border-blue-500 dark:text-blue-500 dark:focus:ring-blue-800">
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                    </svg>
                    Creating...
                </button>
            {/if}
        </div>
        <div class="h-fit m-3 p-2 border border-gray-500">
            <h5 class="text-lg mx-auto w-11/12 md:col-span-2 lg:col-span-2 font-bold">Add Existing Racer</h5>
            <div class="relative z-0 my-2 mx-auto w-11/12 group">
                <dataList id="racers">
                    {#each racerList as racerOption}
                        <option value={racerOption.name}></option>
                    {/each}
                </dataList>
                <input type="text" name="name_search" id="name_search" list="racers" on:focusout={handleClick} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="name_search" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Racer Name</label>
            </div>
            {#if !isLinking}
                <button on:click={createLink} class="h-8 my-1 mx-auto w-11/12 px-8 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    Add Racer
                </button>
            {:else}
                <button disabled type="button" class="h-8 my-1 mx-auto w-11/12 px-8 block text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:border-blue-500 dark:text-blue-500 dark:focus:ring-blue-800">
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                    </svg>
                    Linking...
                </button>
            {/if}
        </div>
    </form>
{:else}
    <Loader />
{/if}