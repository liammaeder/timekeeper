<script>
    export let pageName = "";

    if (pageName.length === 0) {
        pageName = "Dashboard";
    }
</script>

<style>
    .navbar {
        position: fixed;
        top: 0;
        max-height: 70px;
        z-index: 99999;
    }

    .menu {
        z-index: 99999 !important;
    }
</style>

<div class="navbar bg-primary text-neutral-950">
    <div class="flex-1">
        <a class="text-xl font-bold" href="/">Time Keeper</a>
    </div>
    <div class="flex-none w-[120px] mr-1">
        <ul class="menu menu-horizontal px-1 w-auto">
            <li>
                <details class="w-[130px]">
                    <summary>
                        <span class="font-bold">Navigate</span>
                    </summary>
                    <ul class="p-2 bg-primary rounded-t-none shadow-lg shadow-primary-content w-auto font-bold">
                        <li><a href="/">Dashboard</a></li>
                        <li><a href="/Racer Details">Current Race</a></li>
                        <li><a href="/Settings">Settings</a></li>
                    </ul>
                </details>
            </li>
        </ul>
    </div>
</div>