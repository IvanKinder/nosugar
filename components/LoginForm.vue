<template>
  <div class="login-form">
    <label for="inputLogin" class="form-label">Login</label>
    <input
      id="inputLogin"
      class="form-control"
      type="text"
      placeholder="Please input login"
      v-model="username">
    <label for="inputPassword" class="form-label">Password</label>
    <input
      type="password"
      id="inputPassword"
      class="form-control"
      aria-labelledby="passwordHelpBlock"
      placeholder="Please input password"
      v-model="password">
    <button type="button" class="btn btn-light" @click="checkUser">Login</button>
    <div @click="logout" class="modal-container">
      <success-window v-if="isSuccess"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import SuccessWindow from "@/components/SuccessWindow"

const username = ref();
const password = ref();
const isSuccess = ref(false);

const checkUser = () => {
  axios.post(`api/check_user`,
    {username: username.value, password: password.value}).then((response) => {
    if (response.data.auth) {
      isSuccess.value = true;
    }
  });
}

const logout = () => {
  username.value = "";
  password.value = "";
  isSuccess.value = false;
}

</script>

<style scoped>
.login-form {
  display: grid;
  margin-top: 30vh;
  justify-items: center;
}

.login-form > input {
  width: 300px;
  margin-bottom: 20px;
}

.modal-container {
  position: absolute;
}
</style>
