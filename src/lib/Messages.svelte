<script lang="ts">
  import type { ListResult, RecordSubscription } from 'pocketbase';
  import { onMount, onDestroy } from 'svelte';
  import { pb, currentUser } from './pocketbase';
  import type { User, Message } from './types';
  
  let newMessage: string;
  let messages: Message[] = [];
  let unsubscribe: () => void;

  const sendMessage = async () => {
    const data = {
      message: newMessage,
      user: $currentUser.id,
    }
    await pb.collection('messages').create(data);
    newMessage = '';
  }

  onMount(async () => {
    const resultMessages: ListResult<Message> = await pb.collection('messages').getList(1, 50, {
      sort: 'created',
      expand: 'user',
    });
    messages = resultMessages.items;
    unsubscribe = await pb
      .collection('messages')
      .subscribe('*', async ({action, record}: RecordSubscription<Message>) => {
        if (action === 'create') {
          const user: User = await pb.collection('users').getOne(record.user);
          record.expand = { user };
          messages = [...messages, record];
        }
        if (action === 'delete') {
          messages = messages.filter((m) => m.id !== record.id);
        }
      })
  });

  onDestroy(() => unsubscribe?.());
</script>

<div class="messages">
  {#each messages as message (message.id)}
  <div class="msg">
    <img
      src="https://avatars.dicebear.com/api/pixel-art/{message.expand?.user?.username}.svg"
      alt="avatar"
      width="40px"
    >
    <p>{message.expand?.user?.username}: {message.message}</p>
  </div>
  {/each}
</div>

<form on:submit|preventDefault={sendMessage}>
  <input type="text" placeholder="Message" bind:value={newMessage}>
  <button type="submit">Submit</button>
</form>
