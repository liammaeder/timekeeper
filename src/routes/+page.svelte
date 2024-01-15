<script>
    import Nav from '$lib/Nav.svelte';
</script>

<body data-theme="dark" class="h-dvh">
    <Nav />

    <div class="w-full h-fit p-3">
        <div class="card mt-2 mx-auto h-fit w-full bg-primary-content">
            <div class="card-body">
                <h2 class="card-title">Current Race</h2>
                <p>No races currently active...</p>
                <div class="card-actions justify-center mt-1 w-full">
                    <button type="button" class="btn btn-sm btn-primary w-full">Start new race</button>
                </div>
            </div>
        </div>
        <div class="card mt-2 mx-auto h-full w-full bg-primary-content">
            <div class="card-body">
                <h2 class="card-title">Card title!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <button class="btn">Buy Now</button>
                </div>
            </div>
        </div>
    </div>
</body>