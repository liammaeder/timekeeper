<script>
    import Nav from '$lib/navbar.svelte';
</script>

<body data-theme="dark" class="h-dvh">
    <Nav />

    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full h-fit p-3 mt-[75px] gap-4">
        <div class="card mt-2 mx-auto h-fit w-full bg-primary-content">
            <div class="card-body">
                <h2 class="card-title">Current Race</h2>
                <p>No races currently active...</p>
                <div class="card-actions justify-center mt-1 w-full">
                    <a href="/Race Create" type="button" class="btn btn-sm btn-primary w-full">Start new race</a>
                </div>
            </div>
        </div>
        <div class="card mt-2 mx-auto h-full w-full  bg-primary-content">
            <div class="card-body">
                <h2 class="card-title">Race History</h2>
                <div class="overflow-x-auto">
                    <table class="table">
                        <!-- head -->
                        <thead>
                        <tr>
                            <th></th>
                            <th>Race</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                            <!-- row 1 -->
                            <tr class="hover">
                                <th><a href="/Race Details/?id=1">1</a></th>
                                <td><a href="/Race Details/?id=1">Splash & Dash</a></td>
                                <td><a href="/Race Details/?id=1">11-01-2024</a></td>
                            </tr>
                            <!-- row 2 -->
                            <tr class="hover">
                                <th><a href="/Race Details/?id=2">2</a></th>
                                <td><a href="/Race Details/?id=2">SSS</a></td>
                                <td><a href="/Race Details/?id=2">11-01-2024</a></td>
                            </tr>
                            <!-- row 3 -->
                            <tr class="hover">
                                <th><a href="/Race Details/?id=3">3</a></th>
                                <td><a href="/Race Details/?id=3">Splash & Dash</a></td>
                                <td><a href="/Race Details/?id=3">04-01-2024</a></td>
                            </tr>
                            <!-- row 4 -->
                            <tr class="hover" >
                                <th><a href="/Race Details/?id=4">4</a></th>
                                <td><a href="/Race Details/?id=4">SSS</a></td>
                                <td><a href="/Race Details/?id=4">04-01-2024</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>