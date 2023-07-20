<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Label, Input } from 'flowbite-svelte';
	let email = '';
	let password = '';
	let name = '';
	const createUser = async () => {
		const res = await fetch(`${import.meta.env.VITE_API_DOMAIN}/createUser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password, name })
		});
		if (res.status === 200) {
			goto('/login');
		} else {
			console.log('error');
		}
	};
</script>

<form class="flex flex-col space-y-6" action="/">
	<Label class="space-y-2">
		<span>メールアドレス</span>
		<Input type="email" name="email" placeholder="name@company.com" required bind:value={email} />
	</Label>
	<Label class="space-y-2">
		<span>パスワード</span>
		<Input type="password" name="password" placeholder="•••••" required bind:value={password} />
	</Label>
	<Label class="space-y-2">
		<span>ユーザー名</span>
		<Input
			type="email"
			name="email"
			placeholder="ユーザー名を入力してください"
			required
			bind:value={name}
		/>
	</Label>
	<Button type="button" class="w-full" on:click={createUser}>ユーザー作成</Button>
</form>
