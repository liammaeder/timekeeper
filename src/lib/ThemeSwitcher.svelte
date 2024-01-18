<script>
    const themeList = import.meta.env.VITE_THEME_LIST.split(",");
    import { theme } from "$lib/store";

    function capitaliseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
</script>


<div class="w-full h-fit p-3 mt-[60px]">
    <div>
        <p class="text-primary mt-2 text-lg text-bold">Choose a theme:</p>
        <select id="themeSelector" bind:value="{$theme}" class="select select-primary w-full mt-2">
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