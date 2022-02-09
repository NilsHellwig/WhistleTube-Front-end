import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'
import {server_ip} from "./server_ip.js"

const app = createApp(App);

app.use(router);

app.use(new VueSocketIO({
    debug: true,
    connection: SocketIO(server_ip), //options object is Optional
    vuex: {
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

app.mount("#app");
