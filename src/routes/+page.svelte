<script>
    import ActiveRaces      from '$lib/components/race/active_races_list.svelte';
    import CompletedRaces   from '$lib/components/race/completed_races_list.svelte';
</script>

<div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
    <ActiveRaces />
    <CompletedRaces />
</div>