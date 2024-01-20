<script>
    import Nav from '$lib/components/navbar.svelte';
    import {theme} from "$lib/stores/store.js";
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
</script>
<style>

</style>
<div data-theme="{$theme}" class="h-screen">
    <Nav pageName="Settings"/>
    <ThemeSwitcher />
</div>