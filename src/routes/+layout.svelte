<script>
	import '../app.css';
	import Nav from '$lib/components/navbar/navbar.svelte';
	import 'flowbite';
</script>

<Nav></Nav>
<div class="px-4 pb-4 pt-20 sm:ml-48">
	<slot />
</div>
