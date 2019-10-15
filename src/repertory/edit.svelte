<script>
    import { onMount } from "svelte";
    import { mutate, query, getClient } from "svelte-apollo";
    import { navigateTo } from "svero";

    import { context } from "../config";
    import { isNumeric } from "../helpers";

    import { UPDATE_CONTACT, CONTACT } from "./query";
    import Message from "../general/message.svelte";

    export let router = {};

    const client = getClient();
    const contact = query(client, { query: CONTACT, variables: router.params, context });

    let messages = {}, variables = { _id: router.params._id };
    

    function handleFirstNameChange(event) {
        const first_name = event.target.value;
        if(first_name.length < 2)
            messages = { ...messages, first_name: "The first name should be at least 2 characters long" };
        else {
            variables = { ...variables, first_name };
            messages = { ...messages, first_name: null };
        }
    }
    function handleLastNameChange(event) {
        const last_name = event.target.value;
        if(last_name.length < 2)
            messages = { ...messages, last_name: "The last name should be at least 2 characters long" };
        else {
            variables = { ...variables, last_name };
            messages = { ...messages, last_name: null };
        }
    }
    function handleEmailChange(event) {
        const email = event.target.value;
        if(email.length > 0 && !/\w+@\w+\.\w+/i.test(email))
            messages = { ...messages, email: "Please enter a valid email address" };
        else {
            variables = { ...variables, email };
            messages = { ...messages, email: null };
        }
    }
    function handleCountryCodeChange(event) {
        const country_code = parseInt(event.target.value);
        if(!country_code)
            messages = { ...messages, country_code: "Please enter a valid country code" };
        else {
            variables = { ...variables, country_code };
            messages = { ...messages, country_code: null };
        }
    }
    function handlePhoneNumberChange(event) {
        const phone_number = event.target.value;
        if(phone_number.length < 5 || !isNumeric(phone_number))
            messages = { ...messages, phone_number: "Please enter a valid phone number" };
        else {
            variables = { ...variables, phone_number };
            messages = { ...messages, phone_number: null };
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const { data: { updateContact } } = await mutate(client, { mutation: UPDATE_CONTACT, variables, context });
            if(updateContact._id) {
                messages = { ...messages, success: "The contact has been succesfully updated", error: null };
                setTimeout(() => navigateTo('/repertory'), 1000);
            }
        } catch({ message }) {
            messages = { ...messages, error: message, success: null };
        }
    }
</script>

<svelte:head>
    <title>Updating the contact</title>
</svelte:head>

{#await $contact}
<p>Loading ...</p>
{:then response}

<div class="md:flex md:items-center">
    <form class="w-full max-w-lg md:mx-auto py-4">

        <h3 class="text-center my-4  uppercase tracking-wide text-gray-700 text-md font-bold">Updating the contact</h3>
        
        <div class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 my-4" role="alert">
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
            <p>
                A contact is either a phone number or an email address, fill only the one you need.
                You can fill both informations too.
            </p>
        </div>
        {#if messages.error}<Message message={messages.error} error={true} />{/if}
        {#if messages.success}<Message message={messages.success} success={true} />{/if}

        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                First Name
            </label>
            <input value={response.data.contact.first_name} on:change={handleFirstNameChange} class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
            {#if messages.first_name}<p class="text-red-500 text-xs italic">{messages.first_name}</p>{/if}
            </div>
            <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
            </label>
            <input value={response.data.contact.last_name} on:change={handleLastNameChange} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe">
            {#if messages.last_name}<p class="text-red-500 text-xs italic">{messages.last_name}</p>{/if}
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                Email
            </label>
            <input value={response.data.contact.email || ""} on:change={handleEmailChange} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="John.Doe@gmail.com">
            {#if messages.first_name}<p class="text-red-500 text-xs italic">{messages.first_name}</p>
            {:else}<p class="text-gray-600 text-xs italic">Be sure you entered the right email address</p>{/if}
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                Country Code
            </label>
            <input value={response.data.contact.country_code || 0} on:change={handleCountryCodeChange} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="+33">
            {#if messages.country_code}<p class="text-red-500 text-xs italic">{messages.country_code}</p>{/if}
            </div>
            <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Phone Number
            </label>
            <input disabled={variables.country_code !== 0} value={response.data.contact.phone_number || ""} on:change={handlePhoneNumberChange} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="6 1001 0034">
            {#if messages.phone_number}<p class="text-red-500 text-xs italic">{messages.phone_number}</p>{/if}
            </div>
        </div>

    <button on:click={handleSubmit} type="submit" class="w-full bg-blue-500 p-4 px-3 text-white">
        Update contact
    </button>
    </form>
</div>

{:catch ex}
<Message error={true} message={ex.message} />
{/await}