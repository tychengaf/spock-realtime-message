<script lang="ts">
  import Messages from './Messages.svelte';
  import { currentUser, pb } from './pocketbase';

  let username: string;
  let password: string;

  const login = async () => {
    await pb.collection('users').authWithPassword(username, password);
  };
  const signUp = async () => {
    try {
      const data = {
        username,
        password,
        passwordConfirm: password,
        name: username,
      };
      await pb.collection('users').create(data);
      await login();
    } catch (err) {
      console.log(err);
    }
  };
  const signOut = () => pb.authStore.clear();
</script>

{#if $currentUser}
  <p>Logged in as @{$currentUser.username}</p>
  <form on:submit|preventDefault>
    <button on:click={signOut}>Sign Out</button>
  </form>
  <br>
  <Messages />
{:else}
  <form on:submit|preventDefault>
    <input type="text" placeholder="Username" bind:value={username} />
    <input type="password" placeholder="Password" bind:value={password} />
    <button on:click={signUp}>Sign Up</button>
    <button on:click={login}>Login</button>
  </form>
{/if}
