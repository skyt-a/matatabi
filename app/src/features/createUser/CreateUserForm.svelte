<script lang="ts">
	import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
	let email = '';
	let password = '';
	const createUser = async () => {
		const res = await fetch('https://matatabi.yuyu80105.workers.dev/user/create');
	};
</script>

<form class="flex flex-col space-y-6" action="/">
	<Label class="space-y-2">
		<span>ユーザー名</span>
		<Input type="email" name="email" placeholder="name@company.com" required bind:value={email} />
	</Label>
	<Button type="button" class="w-full" on:click={createUser}>ユーザー作成</Button>
</form>
