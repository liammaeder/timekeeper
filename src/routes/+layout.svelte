<script>
	//region imports
	import Nav 		from '$lib/components/navbar/navbar.svelte';
	import Toast 	from "$lib/components/toast/Toast.svelte";
	import 'flowbite';
	import '../app.css';
	//endregion

	//region local variables
	const {VITE_ENVIRONMENT, VITE_RELEASE_STATUS} = import.meta.env;
	//endregion
</script>

<Nav></Nav>
<div class="px-4 pb-4 pt-20 sm:ml-48">
	{#if VITE_ENVIRONMENT !== "production" && VITE_RELEASE_STATUS === "beta"}
		<Toast icon={'info'} toastTitle="You are using Beta Test version!" toastMessage={`You are currently using the Beta version of Timekeeper in Test, the Ready version will be available soon!`}/>
	{:else if VITE_ENVIRONMENT === "production" && VITE_RELEASE_STATUS === "beta"}
		<Toast icon={'info	'} toastTitle="You are using Beta version!" toastMessage={`You are currently using the Beta version of Timekeeper, the Alpha version will be available soon!`}/>
	{:else}
		<Toast icon={'warning'} toastTitle="You are in Test!" toastMessage={`This is the testing environment, for the live app, please go to <a href="https://timekeeper.africa" class="link">Timekeeper</a>`}/>
	{/if}
	<slot/>
</div>
