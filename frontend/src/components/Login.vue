<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const emit = defineEmits(["toggleLogin"]);
const error = ref("");

const sendLogin = (username, password) => {
  axios
    .post("http://127.0.0.1:3000/api/get-user", {
      username: username,
      password: password
    })
    .then(response => {
      const data = JSON.parse(response.request.response).docs;
      if (data){
        sessionStorage.setItem("user_id", data._id);
      } else {
        error.value = "Wrong username or password";
      }
    })
    .catch(error => {
      console.log(error);
    });
}

const username = ref("");
const password = ref("");
</script>

<template>
    <div>
        <h2 class="uppercase text-2xl font-bold border-b border-slate-200">Login</h2>

        <div class="flex flex-col gap-2">
            <div class="flex flex-col">
                <label for="username" class="pl-2 pt-6 text-left pb-1">Username:</label>
                <div>
                    <img src="../assets/svg/user.svg" class="w-4 h-4 left-11 absolute mt-3">
                    <input type="text" name="username"
                        class="pl-8 pr-4 w-80 outline-none border border-gray-500 p-2 rounded-xl focus:border-gray-400"
                        placeholder="Kobra723"
                        v-model="username">
                </div>
            </div>
            <div class="flex flex-col mb-3">
                <label for="password" class="pl-2 pt-2 text-left pb-1">Password:</label>
                <div>
                    <img src="../assets/svg/password.svg" class="w-4 h-4 left-11 absolute mt-3">
                    <input type="password" name="password"
                        class="pl-8 pr-4 w-80 outline-none border border-gray-500 p-2 rounded-xl focus:border-gray-400"
                        placeholder="••••••"
                        v-model="password">
                </div>
            </div>

            <div class="flex flex-col">
                <p>Do you have account? <span @click="() => emit('toggleLogin')" class="inline cursor-pointer text-blue-600">Registration</span></p>
                <button
                    @click="() => sendLogin(username, password)"
                    class="mt-2 hover:-translate-y-0.5 hover:shadow-md bg-blue-500 p-2 pt-3 pb-3 rounded-xl text-white hover:bg-blue-600 transition duration-250 active:bg-blue-700">Submit</button>
            </div>
            <h2 v-if="error" class="text-red-600 -mb-4 mt-2">{{ error }}</h2>
        </div>
    </div>
</template>