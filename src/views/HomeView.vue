<template>
  <NewChatView
    v-if="add_task_view"
    @addTube="addTube"
    @close="showAddTubeView" />
  <div class="flex justify-center bg-individual h-screen p-10">
    <div class="flex flex-row w-11/12 bg-white rounded-xl shadow-2xl">
      <div class="flex flex-col bg-white-800 w-96 border-r-2 border-black-900">
        <div
          class="flex flex-row border-b-2 border-black-900 w-full justify-between static">
          <p class="text-xl text-indigo font-sans mt-3 ml-2 px-3 py-2 mb-3">
            {{ username }}
          </p>
          <div class="mt-3">
            <i
              class="f7-icons mr-2 inset-y-0 font-light hover:bg-gray-200 hover:cursor-pointer p-2 rounded-full"
              @click="logout">
              lock
            </i>
            <i
              class="f7-icons inset-y-0 mr-2 font-light hover:bg-gray-200 hover:cursor-pointer p-2 rounded-full"
              @click="showAddTubeView">
              paperplane
            </i>
          </div>
        </div>
        <div
          class="flex flex-col max-h-90 overflow-auto"
          :key="tube.tube_id"
          v-for="(tube, i) in tubes">
          <div
            @click="selectTube(tube, i)"
            class="h-15 px-5 py-5"
            v-bind:class="i == current_tube_index ? 'bg-gray-200' : 'bg-white'">
            <p class="text-base text-black font-extrabold">{{ tube.name }}</p>
            <p class="text-base text-slate-400 font-regular">
              {{ tube.tube_id }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full" v-if="tubes.length > 0">
        <div
          class="flex flex-row border-b-2 border-black-900 w-full justify-between">
          <p class="text-xl text-indigo font-sans mt-2 px-3 py-2 mb-4">
            {{ tubes[current_tube_index].name }}
          </p>
          <div class="flex items-center">
            <p class="mr-5 bg-gray-800 text-white p-1.5 px-3 rounded-full">
              {{ this.tubes[this.current_tube_index].tube_id }}
            </p>
          </div>
        </div>
        <ChatElement
          :current_chat="current_chat"
          :username="username"></ChatElement>
        <div
          class="flex flex-row border-t-2 border-black-900 w-full justify-between static">
          <input
            class="appearance-none rounded w-full py-2 px-3 ml-4 text-black-700 leading-tight focus:outline-none outline-0 text-xl"
            type="text"
            placeholder="Geben Sie eine Nachricht ein..."
            v-on:keyup.enter="emitMessage"
            v-model="message" />
          <i
            class="f7-icons mt-5 ml-2 inset-y-0 mr-4 font-light mb-5"
            @click="emitMessage">
            paperplane_fill
          </i>
        </div>
      </div>
      <div v-if="tubes.length == 0" class="grid content-center mr-auto ml-auto">
        <img
          src="../assets/no_chat.svg"
          alt="alt"
          class="w-36 ml-auto mr-auto" />
        <p class="mt-10 text-gray-700 font-light text-3xl ml-auto mr-auto">
          Hier ist es aber leise...
        </p>
        <button
          @click="showAddTubeView"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-full inline-flex mt-10 w-50 mr-auto ml-auto">
          <span tag="button" class="font-weight text-xl">Tube hinzufügen</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import "framework7-icons";
import ChatElement from "../components/ChatElement.vue";
import NewChatView from "../components/NewChatView.vue";
import { getAuthData } from "../auth/auth";
import { array_move } from "../functions/array_move.js";

const example = [
  {
    tube_id: "room1",
    name: "Secret Brothers",
  },
  {
    tube_id: "room2",
    name: "Die Gebrüder Hellwig",
  },
];

export default {
  name: "home",
  data() {
    return {
      username: "",
      message: "",
      add_task_view: false,
      current_tube_index: 0,
      tubes: [
        {
          tube_id: "main",
          name: "Hauptkanal",
        },
      ],
      current_chat: [],
    };
  },
  methods: {
    logout: function () {
      localStorage.removeItem("token");
      this.$router.push({ path: "/auth" });
    },
    moveToTop: function (id) {
      array_move(this.tubes, id, 0);
    },
    showAddTubeView: function () {
      this.add_task_view = !this.add_task_view;
    },
    addTube: function (tube_id) {
      this.showAddTubeView();
      this.tubes.push({
        tube_id: tube_id,
        name: tube_id,
      });
    },
    emitMessage: function () {
      /*
      this.$socket.emit("send", {
        room: this.tubes[this.current_tube_index].tube_id,
        message: this.message,
        author: this.username,
      });
      */
      fetch("http://127.0.0.1:4001/emit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room: this.tubes[this.current_tube_index].tube_id,
          message: this.message,
          token: localStorage.getItem("token"),
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {})
        .catch((error) => {
          console.log("Request failed", error);
        });
    },
    selectTube: function (tube, i) {
      this.$socket.emit(
        "unsubscribe",
        this.tubes[this.current_tube_index].tube_id
      );
      this.current_tube_index = i;
      this.$socket.emit(
        "subscribe",
        this.tubes[this.current_tube_index].tube_id
      );
      this.current_chat = [];
      this.fetchTubeHistory();
    },
    fetchTubeHistory: function () {
      fetch("http://127.0.0.1:4001/get_tube", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tube_id: this.tubes[this.current_tube_index].tube_id,
          token: localStorage.getItem("token"),
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log(result);
          this.current_chat = result.messages;
        })
        .catch((error) => {
          console.log("Request failed", error);
        });
    },
  },
  sockets: {
    connect: function () {},
    message: function (data) {
      this.current_chat.push({ text: data.message, username: data.author });
    },
  },
  components: {
    ChatElement,
    NewChatView,
  },
  mounted: async function () {
    const auth = await getAuthData();
    this.username = auth.user.username;
    this.$socket.emit("subscribe", this.tubes[this.current_tube_index].tube_id);
    this.fetchTubeHistory();
  },
};
</script>

<style>
.bg-individual {
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px);
  background-size: 10px 10px;
}
</style>
