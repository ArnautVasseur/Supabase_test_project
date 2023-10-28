<template>
	<div class="border-2 border-teal-500 w-1/2 relative m-auto p-5 bg-gray-700 text-white rounded-md mt-10">
		<div class="mb-5 ml-5 mr-5">
			<label for="email"> Email: </label>
			<input class="w-full border-teal-500 border rounded-md bg-gray-700 p-3" type="email" id="email" v-model="email">
		</div>

		<div class="m-5">
			<label for="email"> Password: </label>
			<input class="w-full border-teal-500 border rounded-md bg-gray-700 p-3" type="password" id="password" v-model="password">
		</div>

		<div class="flex flex-col gap-3 items-center">
			<button @click="login" class="border border-teal-500 w-1/2 rounded-md"> Login </button>
			<button @click="seeUser" class="border border-teal-500 w-1/2 rounded-md"> See user </button>
			<button @click="logout" class="border border-teal-500 w-1/2 rounded-md"> Logout </button>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../lib/supabaseClient"

let email = ref("");
let password = ref("");

async function login() {
	console.log("run")
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email.value,
		password: password.value
	})
	if (error) {
		console.log(error);
	}
	else {
		console.log(data);
	}
}

async function seeUser() {
	const localUser = await supabase.auth.getSession();
	console.log(localUser.data.session)
}

async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.log(error);
	}
	else {
		console.log("Sign out success")
	}
}
</script>

<style scoped></style>