<script>
    import Nav from '$lib/navbar.svelte';
    import {theme} from "$lib/store.js";
</script>

<div data-theme="{$theme}" class="h-screen justify-center">
    <Nav pageName="Racer Details"/>
    <div class="w-full h-96 p-3 mt-[60px]">
        <div class="text-center mt-3 h-10 rounded-lg">
            <p>Coming Soon!</p>
        </div>
        <div class="flex flex-col gap-4 mx-auto mt- w-80 h-auto">
            <div class="skeleton h-32 w-full"></div>
            <div class="skeleton h-4 w-28"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-full"></div>
        </div>
    </div>
</div>