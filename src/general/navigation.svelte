<script>
    import { Link, navigateTo } from "svero"

    const isLogged = localStorage.getItem('x-auth-token') ? true : false;

    function handleLogout(event) {
        event.preventDefault();
        localStorage.removeItem('x-auth-token');
        window.location.href = "/login";
    }
</script>

<nav class="py-4">
    <div>
        <ul class="flex items-center justify-around">
            
            {#if isLogged}
            <li class="m-2"><Link class="block text-gray-700 text-sm font-bold mb-2" href="/repertory">Home</Link></li>
            <li class="m-2"><Link class="block text-gray-700 text-sm font-bold mb-2" href="/me">My account</Link></li>
            <li class="m-2"><span on:click={handleLogout} class="cursor-pointer block text-gray-700 text-sm font-bold mb-2">Log out</span></li>
            {:else}
            <li class="m-2"><Link class="block text-gray-700 text-sm font-bold mb-2" href="/">Home</Link></li>
            <li class="m-2"><Link class="block text-gray-700 text-sm font-bold mb-2" href="/privacy">Privacy</Link></li>
            {/if}
        </ul>
    </div>
</nav>