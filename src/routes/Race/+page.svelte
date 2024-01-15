<script>
    import Nav from '$lib/Nav.svelte';
</script>

<body data-theme="dark" class="h-screen justify-center">
    <Nav pageName="Race"/>
    <div class="w-full h-96 py-3 px-5">
        <div class="text-center h-10 rounded-lg">
            <p>Coming Soon!</p>
        </div>
        <div class="flex flex-col gap-4 mx-auto mt- w-80 h-auto">
            <div class="skeleton h-32 w-full"></div>
            <div class="skeleton h-4 w-28"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-full"></div>
        </div>
    </div>
</body>