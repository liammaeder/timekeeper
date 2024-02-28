<script>
	//region imports
	import '../app.css';
	import Nav from '$lib/components/navbar/navbar.svelte';
	import Alert from '$lib/components/misc/alerts/AlertMessage.svelte';
	import 'flowbite';

	const {VITE_ENVIRONMENT, VITE_RELEASE_STATUS} = import.meta.env;
	//endregion

	//region local variables
	//endregion
</script>

<Nav></Nav>
<div class="px-4 pb-4 pt-20 sm:ml-48">
	{#if VITE_ENVIRONMENT === "production" && VITE_RELEASE_STATUS !== "beta"}
		<Alert autoClose={true} closeTimer={3000} alertTitle="You are using Beta version!" alertMessage={`You are currently using the Beta version of Timekeeper, the Ready version will be available soon!`}/>
	{:else if VITE_ENVIRONMENT !== "production" && VITE_RELEASE_STATUS === "beta"}
		<Alert autoClose={true} closeTimer={3000} alertTitle="You are using Beta Test version!" alertMessage={`You are currently using the Beta version of Timekeeper in Test, the Ready version will be available soon!`}/>
	{:else}
		<Alert autoClose={true} closeTimer={3000} icon={'warning'} alertHasLink={true} alertTitle="You are in Test!" alertMessage={`This is the testing environment, for the live app, please go to <a href="https://timekeeper.africa" class="link">Timekeeper</a>`}/>
	{/if}
	<slot/>
</div>
