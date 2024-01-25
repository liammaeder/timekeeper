import { writable } from "svelte/store";

export let theme = writable('dark');
export function setTheme(newTheme) {
 theme.update(() => newTheme);
}