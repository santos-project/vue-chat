<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-sheet color="grey lighten-4" class="pa-4">
      <v-avatar color="indigo">
        <input
          type="file"
          ref="fileInput"
          accept="image/jpeg,image/jpg,image/png"
          style="display: none"
          @change="updateIcon"
        />

        <v-icon @click="changeIcon" v-if="!photoUrl" dark> mdi-account-circle </v-icon>
        <img @click="changeIcon" :src="photoUrl" v-if="photoUrl" />
      </v-avatar>

      <div class="username">{{ auth && auth.displayName }}</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="[icon, text, to] in links" :key="icon" :to="to" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="logout" link>
        <v-list-item-icon>
          <v-icon color="blue">mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import firebase from "@/firebase/firebase";

export default {
  mounted() {
    this.auth = JSON.parse(sessionStorage.getItem("user"));
    this.photoUrl = this.auth.photoURL;
  },
  data: () => ({
    drawer: null,
    links: [
      ["mdi-account", "Profile", "/profile"],
      ["mdi-chat", "Room", "/"],
    ],
    auth: null,
    photoUrl: "",
  }),
  methods: {
    logout() {
      console.log("logout called.");

      firebase
        .auth()
        .signOut()
        .then((result) => {
          console.log(result);

          localStorage.message = "ログアウトに成功しました";
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeIcon() {
      this.$refs.fileInput.click();
    },
    updateIcon() {
      const user = this.getAuth();
      if (!user) {
        sessionStorage.removeItem("user");
        this.$router.push("/login");
      }

      const file = this.$refs.fileInput.files[0];
      const filePath = `/user/${file.name}`;
      console.log(file);
      console.log(filePath);

      firebase
        .storage()
        .ref()
        .child(filePath)
        .put(file)
        .then(async (snapshot) => {
          // console.log("snapshot", snapshot)

          const photoUrl = await snapshot.ref.getDownloadURL();
          // console.log('photoURL', photoUrl)

          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              user.updateProfile({
                photoURL: photoUrl,
              });

              this.auth.photoURL = photoUrl;
              sessionStorage.setItem("user", JSON.stringify(this.auth));

              this.photoUrl = photoUrl;
            }
          });
        });
    },
    getAuth() {
      return firebase.auth().onAuthStateChanged((user) => {
        return user;
      });
    },
  },
};
</script>

<style></style>
