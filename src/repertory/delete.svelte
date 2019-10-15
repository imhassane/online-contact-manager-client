<script>
    import { getClient, mutate } from "svelte-apollo";
    import  { navigateTo } from "svero";

    import { DELETE_CONTACT } from "./query";
    import { context } from "../config";

    import Message from "../general/message.svelte";

    export let router = {};

    const client = getClient();
    let messages = {};
    async function handleDelete(event) {
        try {
            await mutate(client, { mutation: DELETE_CONTACT, variables: router.params, context });
            messages = { ...messages, error: null, success: "The contact has been deleted succesfully" };
            setTimeout(() => navigateTo('/repertory'), 1000);
        } catch({ message }) {
            messages = { ...messages, error: message, success: null };
        }
    }
</script>

<svelte:head>
    <title>Delete the contact</title>
</svelte:head>

<div>

    <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
        <p class="font-bold">Be Warned</p>
        <p>
            Deleting this contact is irreversible. There won't be any way to get it back.
            Be sure you really want to do it before deleting it.
        </p>
    </div>

    <div class="m-2 p-2">
        {#if messages.error}<Message error={true} message={messages.error} />{/if}
        {#if messages.success}<Message success={true} message={messages.success} />{/if}
    </div>

    <div class="flex m-2">
        <button class="border rounded p-3 bg-gray-500" on:click={ _ => navigateTo('/repertory') }>Cancel</button>
        <button class="border rounded p-3 bg-red-500 text-white text-bold" on:click={handleDelete}>I'm sure, delete it</button>
    </div>

</div>