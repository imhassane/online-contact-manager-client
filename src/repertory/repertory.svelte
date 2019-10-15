<script>
    import { query, getClient } from "svelte-apollo";
    import { navigateTo, Link } from "svero";

    import { context } from "../config";
    import { CONTACTS } from "./query";


    import Message from "../general/message.svelte";

    const client = getClient();
    const contacts = query(client, { query: CONTACTS, context });

    let search = "", _contacts = [];

    function setContacts(c) {
        _contacts = c;
        return _contacts.length;
    }

    function matchToSearch(c) {
        return c.last_name.toLowerCase().includes(search) ||
                c.first_name.toLowerCase().includes(search) ||
                c.email.toLowerCase().includes(search) ||
                c.phone_number.includes(search);
    }
</script>

<svelte:head>
    <title>Repertory</title>
</svelte:head>

<div class="max-w-2xl border mx-auto">

 <div class="w-full">

    <h2 class="text-center py-3 uppercase tracking-wide text-gray-700 text-lg font-bold">My contacts</h2>
    <hr>

    <form class="w-full my-4">
        <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
            <input bind:value={search} class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Jane Doe" aria-label="Full name">   
        </div>
    </form>

    <div class="my-3">
        <Link class="p-2 border bg-gray-400 uppercase tracking-wide text-gray-700 text-xs font-bold" href="/create-contact">Add contact</Link>
    </div>

    <div>

    {#await $contacts}
    <p>Loading ...</p>
    {:then response}
    {#if response.data.contacts.length === 0}
        <p class="text-center">
            You do not have any contact yet, why don't you <a class="text-blue-500" href="/create-contact">add one</a>
        </p>
    {:else}
        <!-- Liste des contacts -->
        <p class="m-2">{ response.data.contacts.length } contacts</p>

        {#each response.data.contacts as contact}
        
            <div class="w-full my-3 border-b border-gray-400 flex">
                <div class="flex-auto p-1">
                    <p class="flex items-left">
                        <span class=" uppercase tracking-wide text-gray-700 text-sm font-bold m-2">{contact.last_name}</span>
                        <span class=" uppercase tracking-wide text-gray-700 text-sm font-bold m-2">{contact.first_name}</span>
                    </p>
                    <p>
                        {#if contact.email}
                        <span class="m-2 text-sm leading-tight text-gray-600">{ contact.email }</span>
                        {/if}
                        {#if contact.country_code && contact.phone_number}
                        <span class="m-2 text-sm leading-tight text-gray-600">+<span>{contact.country_code}</span><span>{contact.phone_number}</span></span>
                        {/if}
                    </p>
                </div>
                <div class="float-right">
                    <button class="p-2 border bg-gray-400 m-1 uppercase tracking-wide text-gray-700 text-xs font-bold" on:click={ _ => navigateTo(`/contact/${contact._id}/`) }>More</button>
                </div>
            </div>
        {/each}
    {/if}
    {:catch ex}
    <Message message={ex.message} error={true} />
    {/await}
    
    </div>

    </div>

</div>