<template>
  <div class="home">
    <template>
      <v-app id="inspire">
        <vue-sidebar />
        <v-app-bar app shrink-on-scroll>
          <v-toolbar-title>ルーム一覧</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>

        <v-main>
          <v-container>
            <create-room class="mb-3" />
            <v-row>
              <v-col v-for="room in rooms" :key="room.id" cols="4">
                <router-link
                  :to="{ path: '/chat', query: { room_id: room.id } }"
                >
                  <v-avatar color="grey lighten-2" size="128">
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                      v-if="!room.thumbnailUrl"
                    />

                    <img
                      :src="room.thumbnailUrl"
                      alt="John"
                      v-if="room.thumbnailUrl"
                    />
                  </v-avatar>
                </router-link>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </template>
  </div>
</template>

<script>
import VueSidebar from "@/components/layouts/VueSidebar.vue";
import CreateRoom from "@/components/modal/CreateRoom.vue";
import firebase from "@/firebase/firebase";
// @ is an alias to /src

export default {
  name: "HomeView",
  components: { VueSidebar, CreateRoom },
  data: () => ({
    rooms: [],
  }),
  mounted() {
    this.getRooms();
  },
  methods: {
    async getRooms() {
      this.rooms = [];
      const roomRef = firebase.firestore().collection("rooms");
      const snapshot = await roomRef.get();
      // snapshot.forEach((doc) => {
      //   console.log("snapshot", doc.data());
      // });

      // mapを使って処理を書きたい場合はdocsを使用するとできる
      snapshot.docs.map((doc) => {
        // console.log("map", doc.data());
        // const data = {
        //   name: doc.data().name,
        //   thumbnailUrl: doc.data().thumbnailUrl,
        //   createdAt: doc.data().createdAt
        // }

        const data = { ...doc.data() };
        data.id = doc.id;
        console.log(data);

        this.rooms.push(data);
      });
    },
  },
};
</script>
