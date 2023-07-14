<script lang="ts">
	import GoogleLoginButton from '../../features/login/components/GoogleLoginButton.svelte';
	import EmailLoginForm from '../../features/login/components/EmailLoginForm.svelte';
	export let data;

	const onClickTest = async () => {
		fetch(`/api/places`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
	};
</script>

<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
	<EmailLoginForm />
	<div class="px-6 sm:px-0 w-full">
		<GoogleLoginButton />
	</div>
	<button on:click={onClickTest}>test</button>
</div>
