<script>
    import { navigateTo, Link } from "svero";
    
    localStorage.removeItem('x-auth-token');
</script>

<div class="bg-gray-500">

    <div class="p-4 bg-white max-w-2xl w-full">
        
        <p class="text-gray-700 text-xl text-center font-bold mb-2">
            A secure and free application to save your contacts
        </p>

        <p class="py-4 text-gray-700 text-sm text-center mb-2">
            We value your privacy and assure that you are the only one who have access to your datas
        </p>

        <div class="text-center m-4">
            <button
                on:click={ _ => navigateTo("/register") }
                class="bg-transparent hover:bg-gray-700 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-700 hover:border-transparent rounded">
                Create an account
            </button>
        </div>

        <p class="m-4">Already have an account ? <Link class="text-gray-700 text-sm font-bold mb-2" href="/login">Access to your account</Link></p>
    </div>

</div>