<template>
  <div
    class="imessage flex flex-col mt-auto overflow-scroll" ref="container">
    <p :key="message" v-for="(message, i) in current_chat" v-bind:class="message.username == username ? 'from-me' : 'from-them', i == 0 ? 'margin-b_none': ''">{{message.text}} <div class="text-[12px]">{{message.username}}</div></p>
  </div>
</template>

<script>
import "framework7-icons";
import ChatElement from "../components/ChatElement.vue";

export default {
  name: "ChatElement",
  props: {
    current_chat: Array,
    username: String,
  },
  methods: {
    
  },
  watch: {
    current_chat: {
      deep: true,
      handler: function (newVal, oldVal) {
        setTimeout(() => {
          var container = this.$refs.container;
          container.scrollTop = container.scrollHeight + 2000;
        }, 50)
      },
    },
  },
};
</script>

/* Source: https://codepen.io/AllThingsSmitty/pen/jommGQ?editors=1010 */
<style scoped>
.imessage {
  background-color: #fff;
  border-radius: 0.25rem;
  font-family: "SanFrancisco";
  font-size: 1.25rem;
  padding: 0.5rem 1.5rem;
  width: 100%;
}

.imessage p {
  border-radius: 1.15rem;
  line-height: 1.25;
  padding: 0.5rem 0.875rem;
  position: relative;
  word-wrap: break-word;
}

.imessage p::before,
.imessage p::after {
  bottom: -0.1rem;
  content: "";
  height: 1rem;
  position: absolute;
}

p.from-me {
  align-self: flex-end;
  background-color: #248bf5;
  color: #fff;
}

p.from-me::before {
  border-bottom-left-radius: 0.8rem 0.7rem;
  border-right: 1rem solid #248bf5;
  right: -0.35rem;
  transform: translate(0, -0.1rem);
}

p.from-me::after {
  background-color: #fff;
  border-bottom-left-radius: 0.5rem;
  right: -40px;
  transform: translate(-30px, -2px);
  width: 10px;
}

p[class^="from-"] {
  margin: 0.5rem 0;
  width: fit-content;
}

p.from-me ~ p.from-me {
  margin: 0.25rem 0 0;
}

p.from-me ~ p.from-me:not(:last-child) {
  margin: 0.25rem 0 0;
}

p.from-me ~ p.from-me:last-child {
  margin-bottom: 0.5rem;
}

p.from-them {
  align-items: flex-start;
  background-color: #e5e5ea;
  color: #000;
}

p.from-them:before {
  border-bottom-right-radius: 0.8rem 0.7rem;
  border-left: 1rem solid #e5e5ea;
  left: -0.35rem;
  transform: translate(0, -0.1rem);
}

p.from-them::after {
  background-color: #fff;
  border-bottom-right-radius: 0.5rem;
  left: 20px;
  transform: translate(-30px, -2px);
  width: 10px;
}

p[class^="from-"].emoji {
  background: none;
  font-size: 2.5rem;
}

p[class^="from-"].emoji::before {
  content: none;
}

.no-tail::before {
  display: none;
}

.margin-b_none {
  margin-bottom: 0 !important;
}

.margin-b_one {
  margin-bottom: 1rem !important;
}

.margin-t_one {
  margin-top: 1rem !important;
}

/* general styling */
@font-face {
  font-family: "SanFrancisco";
  src: url("https://cdn.rawgit.com/AllThingsSmitty/fonts/25983b71/SanFrancisco/sanfranciscodisplay-regular-webfont.woff2")
      format("woff2"),
    url("https://cdn.rawgit.com/AllThingsSmitty/fonts/25983b71/SanFrancisco/sanfranciscodisplay-regular-webfont.woff")
      format("woff");
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  font-weight: normal;
  margin: 0;
}

.container {
  margin: 0 auto;
  max-width: 600px;
  padding: 1rem;
}

h1 {
  font-weight: normal;
  margin-bottom: 0.5rem;
}

h2 {
  border-bottom: 1px solid #e5e5ea;
  color: #666;
  font-weight: normal;
  margin-top: 0;
  padding-bottom: 1.5rem;
}

.comment {
  color: #222;
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  max-width: 100%;
  padding: 0;
}

@media screen and (max-width: 800px) {
  .container {
    padding: 0.5rem;
  }

  .imessage {
    font-size: 1.05rem;
    max-width: 600px;
    padding: 0.25rem 0.875rem;
  }

  .imessage p {
    margin: 0.5rem 0;
  }
}
</style>
