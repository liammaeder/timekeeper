<script>
    export let pageName = "";

    if (pageName.length === 0) {
        pageName = "Home";
    }
</script>

<style>
    .menu {
        z-index: 99999 !important;
    }
</style>

<div class="navbar bg-primary text-neutral-950" style="z-index: 9999999999 !important;">
    <div class="flex-1 ">
            <a class="text-xl font-medium" href="/">Time Keeper</a>
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
            <li>
                <details>
                    <summary>
                        {pageName}
                    </summary>
                    <ul class="p-2 bg-primary rounded-t-none shadow-lg shadow-primary-content">
                        <li><a href="/">Home</a></li>
                        <li><a href="/Race">Current Race</a></li>
                        <li><a href="/Race Details">Race Details</a></li>
                        <li><a href="/Racer Details">Racer Details</a></li>
                        <li><a href="/Settings">Settings</a></li>
                    </ul>
                </details>
            </li>
        </ul>
    </div>
</div>