<script>
    import { query, getClient } from "svelte-apollo";
    import { Link } from "svero";

    import { ME } from "./query";
    import { context } from "../config";
    import Message from "../general/message.svelte";

    const client = getClient();
    const me = query(client, { query: ME, context });
</script>

<svelte:head>
    <title>My account</title>
</svelte:head>

{#await $me}
<p>Loading...</p>
{:then response}

<div>
    <p class="w-1/1 my-3">
        <img class="block mx-auto h-16 sm:h-24 rounded-full" src={`https://avatars.dicebear.com/v2/bottts/${response.data.me.first_name||'smile'}.svg`} alt="{response.data.me.first_name}">
    </p>
    {#if !response.data.me.first_name || !response.data.me.last_name}
    <p class="my-3 text-center font-bold">
        Your profil is not yet up-to-date 😲
        <Link class="block p-2 text-gray-700 text-sm mb-2" href="/update-profil">Let's update it!</Link>
    </p>
    {:else}

    {/if}

</div>

<div>

    <div>
        <p>
            <Link class="border border-gray-700 rounded hover:bg-gray-700 hover:text-white block p-2 text-gray-700 text-sm font-bold mb-2" href="/favorites">My favourites</Link>
        </p>
        <p>
            <Link class="border border-gray-700 rounded hover:bg-gray-700 hover:text-white block p-2 text-gray-700 text-sm font-bold mb-2" href="/favorites">Edit my email address</Link>
        </p>
        <p>
            <Link class="border border-gray-700 rounded hover:bg-gray-700 hover:text-white block p-2 text-gray-700 text-sm font-bold mb-2" href="/favorites">Change my password</Link>
        </p>
        <p>
            <Link class="border border-gray-700 rounded hover:bg-gray-700 hover:text-white block p-2 text-gray-700 text-sm font-bold mb-2" href="/favorites">Update my profile</Link>
        </p>
        <p>
            <Link class="border border-gray-700 rounded hover:bg-gray-700 hover:text-white block p-2 text-gray-700 text-sm font-bold mb-2" href="/favorites">Delete my account</Link>
        </p>
    </div>

</div>

{:catch ex}
<Message error={true} message={ex.message} />
{/await}