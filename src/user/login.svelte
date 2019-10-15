<script>
    import { mutate, getClient } from "svelte-apollo";
    import { navigateTo, Link } from "svero";

    import { AUTHENTICATE } from "./query";
    import Message from "../general/message.svelte";
    
    const client = getClient();

    let messages = {}, variables = { email: "imthassane@gmail.com", password: "imthassane" };

    function handleEmailChange(event) {
        const email = event.target.value;
        if(!/\w+@\w+\.\w+/i.test(email))
            messages = { ...messages, email: "Please enter a valid email address" };
        else {
            variables = { ...variables, email };
            messages = { ...messages, email: null };
        }
    }

    function handlePasswordChange(event) {
        const password = event.target.value;
        if(password.length < 5)
            messages = { ...messages, password: "Please enter a valid password, must be at least 5 characters long" };
        else {
            variables = { ...variables, password };
            messages = { ...messages, password: null };
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {

            const { data: { authenticate } } = await mutate(client, { mutation: AUTHENTICATE, variables });

            if(authenticate.token) {
                localStorage.setItem('x-auth-token', authenticate.token);

              messages = { ...messages, success: "You've been succesfully authentified, you'll be redirected to your repertory", error: null };
              setTimeout(() => window.location.href="/repertory", 1000);
            }
        } catch({ message }) {
            messages = { ...messages, error: message, success: null };
        }
    }
</script>
<div class="w-full md:flex md:items-center">
    <div class="mx-auto md:w-2/3">
    {#if messages.error}<Message message={messages.error} error={true} />{/if}
    {#if messages.success}<Message message={messages.success} success={true} />{/if}

  <form class="bg-white rounded px-8 pt-6 pb-8 mb-4 mx-auto">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Email address
      </label>
      <input on:change={handleEmailChange} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="John.Doe@example.com">
        {#if messages.email}<p class="text-red-500 text-xs italic">{messages.email}</p>{/if}
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input on:change={handlePasswordChange} class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
      {#if messages.password}<p class="text-red-500 text-xs italic">{messages.password}</p>{/if}
    </div>
    <div class="flex items-center justify-between">
      <button on:click={handleSubmit} class="bg-gray-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-gray-700 hover:text-gray-800" href="/">
        Forgot Password?
      </a>
    </div>
    <p class="text-left md:text-center py-4">
        <Link href="/register" class="text-center text-gray-700 text-sm font-bold mb-2">Create new account</Link>
    </p>
  </form>
  </div>
</div>