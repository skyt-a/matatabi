<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Label, Input } from 'flowbite-svelte';
	let email = '';
	let password = '';
	const createUser = async () => {
		goto('/createUser');
	};
	const login = async () => {
		// const res = await signInWithEmailAndPass(email, password);
		const res = await fetch(`/api/authed/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});
		goto('/app/profile');
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
	<!-- <div class="flex items-start">
		<Checkbox
			>I accept the <a
				class="font-medium text-primary-600 hover:underline dark:text-primary-500"
				href="/"
			>
				Terms and Conditions</a
			></Checkbox
		>
	</div> -->
	<Button type="button" class="w-full" on:click={createUser}>ユーザー作成</Button>
	<Button type="button" class="w-full" on:click={login}>ログイン</Button>
</form>
