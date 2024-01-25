<script>
    import Nav from '$lib/components/navbar/navbar.svelte';
    import '../app.css';
</script>

<Nav />
<div class="px-4 pb-4 pt-20 sm:ml-48">
    <slot></slot>
</div>