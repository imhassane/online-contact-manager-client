<script>

    import { getClient, mutate } from "svelte-apollo";
    import { navigateTo } from "svero";
    import { CREATE_USER } from "./query";

    import Message from "../general/message.svelte";

    const client = getClient();

    let messages = {}, variables = {};

    function handleEmailChange(event) {
        const email = event.target.value;
        if(!/\w+@\w+\.\w+/i.test(email))
            messages = { ...messages, email: "Enter a valid email address "};
        else {
            messages = { ...messages, email: null };
            variables = { ...variables, email };
        }
    }

    function handlePasswordChange(event) {
        const password = event.target.value;
        if(password.length < 5)
            messages = { ...messages, password: "Your password should be at least 5 characters long" };
        else {
            messages = { ...messages, password: null };
            variables = { ...variables, password };
        }
    }

    function handleRepeatPasswordChange(event) {
        const repeatPassword = event.target.value;
        if(repeatPassword != variables.password)
            messages = { ...messages, repeatPassword: "Your passwords are not the same" };
        else
            messages = { ...messages, repeatPassword: null };
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await mutate(client, { mutation: CREATE_USER, variables });
            messages = { ...messages, success: "You've been registered successfully, you'll be redirected to the log in page", error: null }
            setTimeout(() => navigateTo("/login"), 1000);
        } catch({ message }) {
            messages = { ...messages, error: message };
        }

    }
</script>

<svelte:head>
    <title>Register</title>
</svelte:head>
<div class="w-full px-3 md:flex md:items-center">
<form class="px-3 mx-auto">

    <p class="text-center font-bold">
        New account
    </p>

    {#if messages.error}<Message error={true} message={messages.error} />{/if}
    {#if messages.success}<Message success={true} message={messages.success} />{/if}

  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Email address
      </label>
    </div>
    <div class="md:w-2/3">
      <input on:change={handleEmailChange} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="email" placeholder="john.doe@gmail.com" />
      {#if messages.email}<p class="text-red-500 text-xs italic">{messages.email}</p>{/if}
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
        Password
      </label>
    </div>
    <div class="md:w-2/3">
      <input on:change={handlePasswordChange} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="password" placeholder="******************" />
      {#if messages.password}<p class="text-red-500 text-xs italic">{messages.password}</p>{/if}
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-username">
        Repeat the password
      </label>
    </div>
    <div class="md:w-2/3">
      <input on:change={handleRepeatPasswordChange} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="password" placeholder="******************" />
      {#if messages.repeatPassword}<p class="text-red-500 text-xs italic">{messages.repeatPassword}</p>{/if}
    </div>
  </div>
  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button on:click={handleSubmit} type="submit" class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
        Sign Up
      </button>
    </div>
  </div>

  <p class="text-left py-3 md:text-center">Go to the <a href="/login" class="text-blue-500">login</a> page</p>
</form>
</div>