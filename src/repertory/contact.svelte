<script>
    import { query, mutate, getClient } from "svelte-apollo";
    import { Link } from "svero";

    import { CONTACT, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "./query"; 
    import { context } from "../config";
    import Message from "../general/message.svelte";

    export let router = {}, messages = {};

    const client = getClient();
    const contact = query(client, { query: CONTACT, variables: router.params, context });

    async function handleAddToFavorites(_) {
        try {
            const { data } = await mutate(client, { mutation: ADD_TO_FAVORITES, variables: router.params, context });
            messages = { ...messages, success: "Succesfully added to favorites", error: null };
            contact.refetch();
        } catch({ message }) {
            messages = { ...messages, error: message, success: null };
        }
    }

    async function handleRemoveFromFavorites(_) {
        try {
            const { data } = await mutate(client, { mutation: REMOVE_FROM_FAVORITES, variables: router.params, context });
            messages = { ...messages, success: "Succesfully removed from favorites", error: null };
            contact.refetch();
        } catch({ message }) {
            messages = { ...messages, error: message, success: null };
        }
    }
</script>

<svelte:head>
    <title>Informations du contact</title>
</svelte:head>

{#await $contact}
<p>Loading...</p>
{:then response}
<div>

    <div class="flex">

        <p class="flex-1">
            <img class="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24 rounded-full" src={`https://avatars.dicebear.com/v2/bottts/${response.data.contact.first_name}.svg`} alt="{response.data.contact.first_name}">
        </p>

        <div class="flex-1">

            <p class="flex">
                <span class="flex-initial m-2 uppercase tracking-wide text-gray-700 text-xs font-bold">{ response.data.contact.first_name }</span>
                <span class="flex-initial m-2 uppercase tracking-wide text-gray-700 text-xs font-bold">{ response.data.contact.last_name }</span>
            </p>

            <p>
                {#if response.data.contact.email}
                <span class="m-2 text-sm leading-tight text-gray-600">{ response.data.contact.email }</span>
                {/if}
                {#if response.data.contact.country_code && response.data.contact.phone_number}
                <span class="m-2 text-sm leading-tight text-gray-600">+<span>{response.data.contact.country_code}</span><span>{response.data.contact.phone_number}</span></span>
                {/if}
            </p>

        </div>
    
    </div>

    <p>
        {#if messages.error}<Message error={true} message={messages.error} />{/if}
    </p>

    <div class="my-5">
    
        <p class="border py-3 px-1 m-2 rounded">
            {#if response.data.contact.in_favorites}
                <button on:click={handleRemoveFromFavorites} class="uppercase tracking-wide text-gray-700 text-xs font-bold px-3">Remove from favorites</button>
            {:else}
                <button on:click={handleAddToFavorites} class="uppercase tracking-wide text-gray-700 text-xs font-bold px-3">Add to favorites</button>
            {/if}
        </p>

        <p class="border py-3 px-1 m-2 rounded">
            <Link class="uppercase tracking-wide text-gray-700 text-xs font-bold px-3" href={`/edit-contact/${router.params._id}/`}>Edit the contact</Link>
        </p>

        <p class="border py-3 px-1 m-2 rounded bg-red-400">
            <Link class="uppercase tracking-wide text-gray-700 text-xs font-bold px-3 text-white" href={`/delete-contact/${router.params._id}`}>Delete the contact</Link>
        </p>

    </div>
</div>
{:catch ex}
<Message error={true} message={ex.message} />
{/await}