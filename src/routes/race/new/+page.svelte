<script>
    import RaceForm from "$lib/components/race/race_crud_form.svelte"

    let id = -1;
</script>

<div>
    <h5 class="text-3xl font-bold dark:text-white mb-2 ">Create Race</h5>
    <div class="w-full mx-auto p-3 bg-white rounded-lg shadow dark:bg-gray-800">
        <RaceForm raceId={id}/>
    </div>
</div>