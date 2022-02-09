<template>
  <div class="h-screen w-screen absolute grid place-items-center">
    <div
      class="bg-black opacity-60 z-30 h-screen w-screen absolute"
      @click="closeWindow"></div>
    <div
      class="bg-white opacity-100 z-40 w-96 h-60 absolute rounded-2xl grid place-items-center">
      <div class="border-b-2 border-black-900 flex flex-row">
        <p
          class="flex flex-row mt-3 text-gray-700 font-bold text-lg mb-3 ml-auto mr-auto">
          Tube hinzufügen
        </p>
      </div>
      <div class="flex flex-row items-center mt-5">
        <input
          class="appearance-none rounded-xl py-3 px-5 text-black-700 leading-tight focus:outline-none outline-0 text-xl bg-gray-200 min-w-[300px] ml-auto mr-auto"
          type="text"
          v-model="tube_id"
          placeholder="tube id" />
      </div>
      <p class="mt-2 text-blue-800 font-bold">{{error_text}}</p>
      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-full inline-flex mt-4 mb-5">
        <i class="f7-icons inset-y-0 font-light gray">
          arrow_right_circle_fill
        </i>
        <span tag="button" class="ml-2 font-weight text-xl" @click="addTube">
          Weiter
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  emits: ["addTube"],
  data() {
    return {
      tube_id: "",
      error_text: ""
    }
  },
  methods: {
    continue: function () {},
    closeWindow: function () {
      this.$emit("close");
      this.tube_id = "";
      this.error_text = "";
    },
    addTube: function () {
      if (this.tube_id !== "") {
        this.$emit("addTube", this.tube_id);
      } else {
        this.error_text = "Diesen Tube gibt es nicht.";
      }
    },
  },
};
</script>

<style scoped></style>
