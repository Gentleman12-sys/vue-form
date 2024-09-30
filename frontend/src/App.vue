<script setup>
import Registration from "./components/Registration.vue";
import Login from "./components/Login.vue";
import { ref } from "vue";
import axios from "axios";

const isLogin = ref(false);

const toggleLogin = () => {
  isLogin.value = !isLogin.value;
}
</script>


<template>
  <div>
    <div class="flex justify-center text-center h-screen">
      <div class="m-auto border border-black p-8 rounded-xl backdrop-blur-2xl bg-gray backdrop">
        <Registration v-if="!isLogin" @toggleLogin="toggleLogin"/>
        <Login v-if="isLogin" @toggleLogin="toggleLogin"/>
      </div>
    </div>
  </div>
</template>