<script>
	//region imports
	import '../app.css';
	import Nav from '$lib/components/navbar/navbar.svelte';
	import Warning from '$lib/components/misc/alerts/Warning.svelte';
	import Info from '$lib/components/misc/alerts/Info.svelte';
	import 'flowbite';

	const {VITE_ENVIRONMENT, VITE_RELEASE_STATUS} = import.meta.env;
	//endregion

	//region local variables
	//endregion
</script>

<Nav></Nav>
<div class="px-4 pb-4 pt-20 sm:ml-48">
	{#if VITE_ENVIRONMENT === "production" && VITE_RELEASE_STATUS !== "beta"}
		<Info alertTitle="You are using Beta version!"
			  alertMessage={`You are currently using the Beta version of Timekeeper, the Ready version will be available soon!`}/>
	{:else if VITE_ENVIRONMENT !== "production" && VITE_RELEASE_STATUS === "beta"}
		<Info alertTitle="You are using Beta Test version!"
			  alertMessage={`You are currently using the Beta version of Timekeeper in Test, the Ready version will be available soon!`}/>
	{:else}
		<Warning alertHasLink={true} alertTitle="You are in Test!"
				 alertMessage={`This is the testing environment, for the live app, please go to <a href="https://timekeeper.africa" class="link">Timekeeper</a>`}/>
	{/if}
	<slot/>
</div>
