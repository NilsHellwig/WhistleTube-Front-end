<template>
  <div class="flex justify-center bg-individual h-screen">
    <div
      class="flex flex-col w-[90%] md:w-[600px] bg-white rounded-3xl shadow-2xl h-auto mt-auto mb-auto items-center">
      <p class="mt-20 text-gray-700 font-thin text-4xl">
        WhistleTube - {{ register ? "Register" : "Login" }}
      </p>
      <img
        src="../assets/logo.svg"
        alt="alt"
        class="w-36 ml-auto mr-auto mt-20 mb-20" />
      <div class="flex flex-row items-center mt-5" v-if="register">
        <i class="f7-icons inset-y-0 font-light gray">person_alt_circle_fill</i>
        <input
          class="appearance-none rounded-xl py-3 px-5 ml-4 text-black-700 leading-tight focus:outline-none outline-0 text-xl bg-gray-200 min-w-[300px]"
          type="text"
          v-model="username"
          placeholder="Username" />
      </div>
      <div class="flex flex-row items-center mt-5">
        <i class="f7-icons inset-y-0 font-light gray">envelope_fill</i>
        <input
          class="appearance-none rounded-xl py-3 px-5 ml-4 text-black-700 leading-tight focus:outline-none outline-0 text-xl bg-gray-200 min-w-[300px]"
          type="email"
          v-model="email"
          placeholder="E-Mail" />
      </div>
      <div class="flex flex-row items-center mt-5">
        <i class="f7-icons inset-y-0 font-light gray">lock_fill</i>
        <input
          class="appearance-none rounded-xl py-3 px-5 ml-4 text-black-700 leading-tight focus:outline-none outline-0 text-xl bg-gray-200 min-w-[300px]"
          type="password"
          v-model="password"
          placeholder="Password" />
      </div>
      <div class="min-w-[300px]">
        <p class="font-light text-red-600 -ml-5 mt-5">{{ error_text }}</p>
      </div>
      <div class="mt-10 self-end mr-5 mb-5">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-full inline-flex mr-5"
          @click="switch_register">
          <i class="f7-icons inset-y-0 font-light gray">lock_circle_fill</i>
          <span tag="button" class="ml-2 font-weight text-xl">
            {{ !register ? "Register" : "Login" }}
          </span>
        </button>
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-full inline-flex"
          v-on="register ? { click: register_user } : { click: login_user }">
          <i class="f7-icons inset-y-0 font-light gray">
            arrow_right_circle_fill
          </i>
          <span tag="button" class="ml-2 font-weight text-xl">Weiter</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import "framework7-icons";

export default {
  name: "auth",
  data() {
    return {
      email: "",
      password: "",
      username: "",
      error_text: "",
      server_url: "",
      register: false,
    };
  },
  methods: {
    login_user(e) {
      e.preventDefault();
      console.log(this.email, this.password);
      fetch("http://127.0.0.1:4001/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.email, password: this.password }),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log(result);
          localStorage.setItem("token", result.token);
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          console.log("Request failed", error);
          this.error_text = "Ein Fehler ist aufgetreten.";
        });
    },
    register_user(e) {
      e.preventDefault();
      console.log(this.email, this.password);
      fetch("http://127.0.0.1:4001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
          username: this.username,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
          return response.json();
        })
        .then((result) => {
          console.log(result);
          localStorage.setItem("token", result.token);
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          console.log("Request failed", error);
          this.error_text = `${error}`;
        });
    },
    switch_register() {
      this.register = !this.register;
      this.error_text = "";
    },
  },
};
</script>

<style>
.bg-individual {
  background-color: #aef5d9;
  opacity: 0.8;
  background-image: radial-gradient(#08aa5e 0.5px, #e5f7f3 0.5px);
  background-size: 10px 10px;
}

.gray {
  color: rgb(37, 37, 37);
}
</style>
