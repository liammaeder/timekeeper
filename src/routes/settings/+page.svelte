<script>
    import Nav from '$lib/navbar.svelte';
    import {theme} from "$lib/store.js";
    import ThemeSwitcher from "$lib/ThemeSwitcher.svelte";
</script>
<style>

</style>
<div data-theme="{$theme}" class="h-screen">
    <Nav pageName="Settings"/>
    <ThemeSwitcher />
</div>