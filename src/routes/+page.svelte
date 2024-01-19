<script>
    import Nav from '$lib/navbar.svelte';
    import races from '$lib/json/races.json';
    import {theme} from "$lib/store.js";

    let currentRaces = []

    races.forEach(function (race) {
        if (race.status === "in-progress" || race.status === "future") {
            currentRaces.push(race);
        }
    })

</script>

<div data-theme="{$theme}" class="h-dvh">
    <Nav />

    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full h-fit p-3 mt-[60px] gap-4">
        <div class="card mt-2 mx-auto h-fit w-full bg-primary-content/100">
            <div class="card-body">
                <h2 class="card-title">Active Races</h2>
                {#if currentRaces.length > 0}
                    <ul class="px-1">
                        {#each currentRaces as race (race.id)}
                            {#if race.status === "in-progress"}
                                <li class="grid grid-cols-3 my-3">
                                    <div class="text-success col-span-2 truncate">{race.name} - {race.date}</div>
                                    <div class="text-right">
                                        <a type="button" class="btn btn-square btn-sm btn-primary mx-1" href="/race/edit?id={race.id}">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </a>
                                        <a type="button" class="btn btn-square btn-sm btn-white mx-1" href="/race/view?id={race.id}">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                            </svg>
                                        </a>
                                    </div>
                                </li>
                            {:else}
                                <li class="grid grid-cols-3 my-3">
                                    <div class="col-span-2 truncate">{race.name} - {race.date}</div>
                                    <div class="text-right">
                                        <a type="button" class="btn btn-square btn-sm btn-primary mx-1" href="/race/edit?id={race.id}">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </a>
                                        <a type="button" class="btn btn-sm btn-square btn-white mx-1" href="/race/view?id={race.id}">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                            </svg>
                                        </a>
                                    </div>
                                </li>
                            {/if}
                        {/each}
                    </ul>
                {:else}
                    <p>No races currently active...</p>
                    <div class="card-actions justify-center mt-1 w-full">
                        <a href="/race/new" type="button" class="btn btn-sm btn-primary w-full">Start new race</a>
                    </div>
                {/if}
            </div>
        </div>
        <div class="card mt-2 mx-auto h-full w-full  bg-primary-content">
            <div class="card-body">
                <h2 class="card-title">Completed Races</h2>
                <div class="overflow-x-auto">
                    <table class="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Race</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                            {#each races as race}
                                {#if race.status === "complete"}
                                    <tr class="hover">
                                        <th><a href="/race/view?id={race.id}">{race.id}</a></th>
                                        <td><a href="/race/view?id={race.id}">{race.name}</a></td>
                                        <td><a href="/race/view?id={race.id}">{race.date}</a></td>
                                    </tr>
                                {/if}
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>