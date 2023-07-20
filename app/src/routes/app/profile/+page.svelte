<script>
	import { goto } from '$app/navigation';
	import { signOut as _signOut, setToken } from '$lib/client/firebase';
	import { Card, Avatar, Button } from 'flowbite-svelte';
	export let data;
	const signOut = async () => {
		await _signOut();
		await setToken('');
		goto('/login');
	};
</script>

<svelte:head>
	<title>プロフィール</title>
	<meta name="description" content="About this app" />
</svelte:head>
<Card padding="sm">
	<!-- <div class="flex justify-end">
		<MenuButton />
		<Dropdown class="w-36">
			<DropdownItem>Edit</DropdownItem>
			<DropdownItem>Export data</DropdownItem>
			<DropdownItem>Delete</DropdownItem>
		</Dropdown>
	</div> -->
	<div class="flex flex-col items-center pb-4">
		<Avatar size="lg" src={data.userSession.picture} />
		<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.userSession.name}</h5>
		<span class="text-sm text-gray-500 dark:text-gray-400">{data.userSession.email}</span>
		<div class="flex mt-4 space-x-3 lg:mt-6">
			<Button>Add friend</Button>
			<Button color="light" class="dark:text-white" on:click={signOut}>ログアウト</Button>
		</div>
	</div>
</Card>
