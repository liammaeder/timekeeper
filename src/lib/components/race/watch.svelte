<script>
    import { onDestroy, onMount }   from 'svelte';
    import Timer                    from '$lib/class/race/Timer.js';
    export let participant;
    let watch                       = new Timer(participant.id);
    let openDrawer                  = false;
    let intervalId;
    let currentDurration            = watch.getDuration();
    let raceStarted                 = watch.isRunning;
    let racePaused                  = watch.isPaused;

    onMount(async () => {
        window.addEventListener('click', closeDrawer);
    });

    function toggleDrawer(event) {
        event.stopPropagation();

        openDrawer = openDrawer === true ? openDrawer = false : true;
    }

    function closeDrawer() {
        openDrawer = false;
    }

    onDestroy(() => {
        window.removeEventListener('click', closeDrawer);
    });

    function startTimer() {
        watch.start();
        raceStarted = watch.isRunning;
        racePaused  = watch.isPaused;
        startIntervalTimer();
    }

    function resumeTimer() {
        watch.resume();
        raceStarted = watch.isRunning;
        racePaused  = watch.isPaused;
    }

    function pauseTimer() {
        watch.pause();
        raceStarted = watch.isRunning;
        racePaused  = watch.isPaused;
    }

    function stopTimer() {
        watch.stop();
        raceStarted = watch.isRunning;
        racePaused  = watch.isPaused;
        stopIntervalTimer();
    }

    function stopIntervalTimer() {
        clearInterval(intervalId);
    }

    function startIntervalTimer() {
        intervalId = setInterval(() => {
            currentDurration = watch.getDuration();
        }, 1000);
    }
</script>

<style>
    .drawer {
        display: none;
    }
    .drawer.open {
        display: block;
    }
</style>


<div class="grid grid-cols-4 items-center">
    <div class="col-span-1 justify-start">
        {#if racePaused && !raceStarted}
            <button on:click={() => resumeTimer()} class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Resume</button>
        {:else if !raceStarted}
            <button on:click={() => startTimer()} class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Start</button>
        {:else}
            <button on:click={() => pauseTimer()} class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Pause</button>
        {/if}
    </div>
    <div class="col-span-2">
        <button on:click={(event) => toggleDrawer(event, participant.id)} type="button" tabindex="0" class="text-center w-full my-auto">
            <div class="truncate col-span-5">
                {#each participant.racers as racer, i}
                    {racer.name}{#if i !== participant.racers.length-1}&nbsp;&&nbsp;{/if}
                {/each}
            </div>
            <div class="col-span-2">
                {currentDurration}
            </div>
        </button>
    </div>
    <div class="col-span-1">
        <button on:click={() => stopTimer()} class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" disabled={!raceStarted}>Stop</button>
    </div>
    <div id={`drawer-${participant.id}`} class={`drawer col-span-4 pt-2 transform transition-transform duration-300 ease-in-out ${openDrawer ? 'open' : ''}`} aria-labelledby={`drawer-${participant.id}`}>
        <h5 class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">TESTING</h5>
        <button on:click={(event) => event.stopPropagation()} class="mx-2">Click me!</button>
    </div>
</div>