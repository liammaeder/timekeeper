import {writable} from 'svelte/store';

export let createTrigger = writable(false);
export let isSavingStore = writable(false);
export let racerIds = writable([]);