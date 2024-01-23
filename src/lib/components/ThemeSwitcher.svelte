<script>
    const themeList = import.meta.env.VITE_THEME_LIST.split(",");
    import { theme, setTheme } from "$lib/stores/store.js";
    import { onMount } from "svelte";

    let currentTheme = $theme;
    console.log("First Assign:", currentTheme);

    onMount(() => {
        setThemeOnBody();
    });

    function changeTheme() {
        setThemeOnBody();
        console.log("Change Theme:", currentTheme);
        setTheme(currentTheme);
    }

    function setThemeOnBody() {
        console.log("setting theme: ", currentTheme);
        document.body.setAttribute('data-theme', currentTheme);
        console.log(document.body.getAttribute('data-theme'));
    }

    function capitaliseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
</script>


<div class="w-full h-fit p-3">
    <div>
        <p class="text-primary mt-2 text-lg text-bold">Choose a theme:</p>
        <select id="themeSelector" on:change={changeTheme} bind:value={currentTheme} class="select select-primary w-full mt-2">
                {#each themeList as themeName}
                    {#if themeName === $theme}
                        <option value="{themeName}" selected>{capitaliseFirst(themeName)}</option>
                    {:else}
                        <option value="{themeName}">{capitaliseFirst(themeName)}</option>
                    {/if}
                {/each}
        </select>
    </div>
</div>