<script>
	import ApolloClient from 'apollo-boost';
	import { setClient } from 'svelte-apollo';

	import { Router, Route } from "svero";
	import Navigation from "./general/navigation.svelte";
	import Home from "./general/home.svelte";
	import Register from "./user/register.svelte";
	import Login from "./user/login.svelte";

	import Repertory from "./repertory/repertory.svelte";
	import CreateContact from "./repertory/create.svelte";
	import Contact from "./repertory/contact.svelte";
	import UpdateContact from "./repertory/edit.svelte";
	import DeleteContact from "./repertory/delete.svelte";
	import Me from "./user/me.svelte";

	const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });
  	setClient(client);
</script>

<div class="h-full md:max-w-lg mt-5 bg-white rounded px-8 pt-6 pb-8 mb-4 mx-auto">

	<div class="container px-2 py-3">
		<Router>
			<Navigation />

			<Route exact path="/" 					component={Home} />
			<Route exact path="/register" 			component={Register} />
			<Route exact path="/login" 				component={Login} />
			<Route exact path="/repertory" 			component={Repertory} />
			<Route exact path="/create-contact"		component={CreateContact} />
			<Route exact path="/contact/:_id"		component={Contact} />
			<Route exact path="/edit-contact/:_id"			component={UpdateContact} />
			<Route exact path="/delete-contact/:_id"		component={DeleteContact} />
			<Route exact path="/me"					component={Me} />
			<Route exact path="/update-profil" component={Me} />
		</Router>
	</div>

	
  <p class="text-center text-gray-500 text-xs">
    &copy;2019 by <a href="https://instagram.com/imhassane" target="_blank">Hassane Sow</a>
  </p>
</div>