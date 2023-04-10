<template>
  <v-app id="inspire">
    <vue-sidebar />
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="(data, index) in messages">
                  <v-list-item :key="index">
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-subtitle class="message">
                        {{ data.message }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="index !== 6"
                    :key="`divider-${index}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-textarea
        v-model="body"
        append-icon="mdi-comment"
        class="mx-2"
        label="メッセージを送信する"
        rows="3"
        auto-grow
      ></v-textarea>

      <v-btn class="me-4" type="submit" :disabled="invalid" @click="submit">
        submit
      </v-btn>

      <v-btn @click="clear"> clear </v-btn>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "@/firebase/firebase";
import VueSidebar from '@/components/layouts/VueSidebar.vue';

export default {
  components: { VueSidebar },
  async created() {
    this.user_id = this.$route.query.user_id;

    const chatRef = firebase.firestore().collection("chats");
    console.log(chatRef);
    const snapshot = await chatRef.get();
    console.log("snapshot", snapshot);

    snapshot.forEach((doc) => {
      console.log(doc.data());
      this.messages.push(doc.data());
    });
  },
  data: () => ({
    messages: [
      // {
      //   message: "message 1",
      // },
      // {
      //   message: "message 2",
      // },
      // {
      //   message: "message 3",
      // },
      // {
      //   message: "message 4",
      // },
      // {
      //   message: "message 5",
      // },
    ],
    body: "",
    user_id: "",
    cards: ["Today"],
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],
  }),
  computed: {
    invalid() {
      console.log("invalid called.", this.body);
      if (!this.body) {
        return true;
      }
      return false;
    },
  },
  methods: {
    submit() {
      console.log("submit", this.body);
      this.messages.unshift({ message: this.body });
      this.body = "";
    },
    clear() {
      console.log("clear");
      this.body = "";
    },
  },
};
</script>

<style scoped>
.message {
  text-align: left;
}
</style>
