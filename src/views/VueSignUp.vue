<template>
  <v-app>
    <div class="login-box">
      <v-card class="login-form">
        <v-card-title class="login-title">SignUp</v-card-title>
        <v-card-subtitle>ユーザー情報をご入力ください</v-card-subtitle>
        <v-btn text color="light-blue" to="login">ログイン画面はこちら</v-btn>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="UserName"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="[rules.required, rules.min]"
            type="password"
            label="Passwoerd"
            counter
          ></v-text-field>

          <v-btn
            color="success"
            class="login-btn"
            :disabled="isValid"
            @click="submit"
            >Sign Up</v-btn
          >
          <v-btn>CLEAR</v-btn>

          <v-alert dense outlined type="error" class="mt-3" v-if="errorMessage">
            {{ errorMessage }}
          </v-alert>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import firebase from "@/firebase/firebase";

export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "名前を入力してください",
      (v) => (v && v.length <= 10) || "名前は10文字以内になります",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "メールアドレスを入力してください",
      (v) => /.+@.+\..+/.test(v) || "メールアドレスが不正です",
    ],
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    errorMessage: "",
  }),
  computed: {
    isValid() {
      return !this.valid;
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submit() {
      console.log("call");

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async (result) => {
          console.log("success", result);
          await result.user.updateProfile({ displayName: this.name });

          localStorage.message = "新規作成に成功しました";

          this.$router.push("/login");
        })
        .catch((error) => {
          console.log("false", error);

          this.errorMessage = "ユーザーの新規作成に失敗しました";
        });
    },
  },
};
</script>

<style scoped>
.login-box {
  width: 50%;
  margin: 0 auto;
  padding: 30px;
}

.login-title {
  display: inline-block;
}

.login-form {
  margin: 150px;
  padding: 30px;
}

.login-btn {
  margin-right: 20px;
}
</style>
