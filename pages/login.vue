<template>
  <div>
    <!-- <Header
      :is-guest="true"
      @openLoginModal="openLoginModal"
      @openSignUpModal="openSignUpModal"
    ></Header> -->
    <div class="content mt-16">
      <v-responsive max-width="600" class="text-center">
        <p class="text-h4 font-weight-bold">Welcome to my app!</p>
        <p class="mt-16">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, set do elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim adminim venian, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </p>
        <p class="font-weight-bold text-h5 mt-16">Please login or signup!</p>
        <div class="flex mt-3">
          <v-btn
            color="primary"
            width="180"
            height="44"
            tile
            @click="openSignUpModal"
            >Sign up free</v-btn
          >
          <v-btn
            color="primary ml-5"
            width="180"
            height="44"
            tile
            @click="openLoginModal"
            >Login</v-btn
          >
        </div>
      </v-responsive>

      <v-dialog v-model="loginModal" width="680">
        <v-card class="modal">
          <v-row justify="center" align-content="center" style="height: 100%">
            <v-col cols="12">
              <p class="text-center font-weight-bold text-h4">Login</p>
              <v-row justify="center">
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|email"
                    name="email"
                  >
                    <v-text-field
                      v-model="email"
                      label="email"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="|required"
                    name="password"
                  >
                    <v-text-field
                      v-model="password"
                      label="password"
                      type="password"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <div class="text-center">
                <div>
                  <p class="red--text">{{ errorMsg }}</p>
                  <v-btn
                    color="primary mt-3"
                    width="180"
                    height="44"
                    tile
                    @click="login"
                    >Login</v-btn
                  >
                </div>
                <div class="mt-4">
                  <p
                    class="text-decoration-underline"
                    @click="passwordResetModal = true"
                  >
                    Forgot password
                  </p>
                </div>
                <div class="mt-4">
                  <p
                    class="text-decoration-underline"
                    @click="loginModal = false"
                  >
                    キャンセル
                  </p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>

      <v-dialog v-model="signUpModal" width="680">
        <v-card class="modal">
          <v-row justify="center" align-content="center" style="height: 100%">
            <v-col cols="12">
              <p class="text-center font-weight-bold text-h4">Sample App</p>
              <p class="text-center text-h6 my-5">Sign Up</p>

              <div v-if="!isSendMail">
                <p class="text-center">
                  サインアップのURLをメールで送信します。
                </p>
                <p class="text-center">
                  メールアドレスを入力し[Send]ボタンをクリックしてください。
                </p>
                <v-row justify="center">
                  <v-col cols="6">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="email|required"
                      name="email"
                    >
                      <v-text-field
                        v-model="registerEmail"
                        label="your email"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <div class="text-center">
                  <div>
                    <v-btn color="primary mt-3" width="180" height="44" tile
                      >Send</v-btn
                    >
                  </div>
                  <div class="mt-4">
                    <p
                      class="text-decoration-underline"
                      @click="signUpModal = false"
                    >
                      キャンセル
                    </p>
                  </div>
                </div>
              </div>

              <div v-else class="text-center">
                <img src="/checkmark.png" />
                <p class="mt-5">
                  I sent a password registration email&lt; mail address&gt;.
                </p>
                <p>Please check your email.</p>
                <div class="mt-8">
                  <p
                    class="text-decoration-underline"
                    @click="signUpModal = false"
                  >
                    × Close
                  </p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>

      <v-dialog v-model="workspaceModal" width="680" persistent>
        <v-card class="modal">
          <v-row justify="center" align-content="center" style="height: 100%">
            <v-col cols="12">
              <p class="text-center font-weight-bold text-h4">
                Select Workspace
              </p>
              <v-row justify="center">
                <v-col cols="6">
                  <v-select
                    :items="workspaces"
                    item-text="workspace_name"
                    item-value="workspace_id"
                    label="select workspace"
                    v-model="workspaceId"
                  ></v-select>
                </v-col>
              </v-row>
              <div class="text-center">
                <div>
                  <v-btn
                    color="primary mt-3"
                    width="180"
                    height="44"
                    tile
                    @click="selectWorkSpace(workspaceId)"
                    >Go</v-btn
                  >
                </div>
                <div class="mt-4">
                  <p class="text-decoration-underline" @click="logout">
                    logout
                  </p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>

      <v-dialog v-model="passwordResetModal" width="680">
        <v-card class="modal">
          <v-row justify="center" align-content="center" style="height: 100%">
            <v-col cols="12">
              <p class="text-center font-weight-bold text-h4">
                Reset your password
              </p>
              <div v-if="!isSendPasswordResetMail">
                <p class="text-center">
                  パスワードリセットのURLをメールで送信します。
                </p>
                <p class="text-center">
                  メールアドレスを入力し[Send]ボタンをクリックしてください。
                </p>
                <v-row justify="center">
                  <v-col cols="6">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="email|required"
                      name="email"
                    >
                      <v-text-field
                        v-model="passwordResetEmail"
                        label="your email"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <div class="text-center">
                  <div>
                    <v-btn
                      color="primary mt-3"
                      width="180"
                      height="44"
                      tile
                      @click="passwordReset"
                      >Send</v-btn
                    >
                  </div>
                  <div class="mt-4">
                    <p
                      class="text-decoration-underline"
                      @click="passwordResetModal = false"
                    >
                      キャンセル
                    </p>
                  </div>
                </div>
              </div>

              <div v-else class="text-center">
                <img src="/checkmark.png" />
                <p class="mt-5">I sent an email to reissue your password.</p>
                <p>Please check your email.</p>
                <div class="mt-8">
                  <p
                    class="text-decoration-underline"
                    @click="passwordResetModal = false"
                  >
                    × Close
                  </p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export type DataType = {
  email: string;
  password: string;
  registerEmail: string;
  signUpModal: boolean;
  loginModal: boolean;
  workspaceModal: boolean;
  isSendMail: boolean;
  workspaces: Array<String>;
  workspace: string;
  name: string;
  passwordResetModal: boolean;
  passwordResetEmail: string;
  isSendPasswordResetMail: boolean;
  errorMsg: string;
  workspaceId: string;
};

export default Vue.extend({
  name: "Login",

  data(): DataType {
    return {
      email: "",
      name: "",
      password: "",
      registerEmail: "",
      signUpModal: false,
      loginModal: false,
      workspaceModal: false,
      isSendMail: false,
      workspaces: [],
      workspace: "",
      passwordResetModal: false,
      passwordResetEmail: "",
      isSendPasswordResetMail: false,
      errorMsg: "",
      workspaceId: ""
    };
  },

  methods: {
    openLoginModal(): void {
      this.loginModal = true;
    },

    openSignUpModal(): void {
      this.signUpModal = true;
    },

    login(): void {
      this.$axios
        .$post("login", {
          email: this.email,
          password: this.password
        })
        .then(data => {
          console.log(data);
          this.$cookies.set("token", data.token);
          this.$axios.defaults.headers.common.Authorization = `Bearer ${this.$cookies.get(
            "token"
          )}`;
          this.getHexebaseUserData();
        })
        .catch(err => {
          this.errorMsg = "メールアドレスまたはパスワードをご確認ください";
          console.log(err);
        });
    },

    getHexebaseUserData(): void {
      this.$axios
        .$get("userinfo")
        .then(data => {
          if (data.is_ws_admin) {
            this.$cookies.set("is_ws_admin", true);
          } else {
            this.$cookies.set("is_ws_admin", false);
          }
          this.$cookies.set("hexaUserData", data);
          this.getUserData();
        })
        .catch(err => {
          console.log(err);
        });
    },

    getUserData(): void {
      this.$axios
        .$post("applications/work_management/datastores/users/items/search", {
          conditions: [
            {
              id: "user_id",
              search_value: [this.$cookies.get("hexaUserData").u_id],
              exact_match: true
            }
          ],
          page: 1,
          per_page: 0,
          use_display_id: true
        })
        .then(data => {
          if (data.items[0].status === "suspended") {
            this.errorMsg = "アクセス権限のないアカウントです";
            this.$cookies.remove("token");
          } else {
            this.$cookies.set("userData", data.items[0]);
            this.getWorkSpace();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    getWorkSpace(): void {
      this.loginModal = false;
      this.workspaceModal = true;
      this.$axios
        .$get("workspaces")
        .then(data => {
          this.workspaces = data.workspaces;
        })
        .catch(err => {
          console.log(err);
        });
    },

    passwordReset(): void {
      this.$axios
        .$post("users/password/forgot", {
          email: this.passwordResetEmail,
          email_template_id: "ab9d1404-120b-4c09-85e8-bc4bb1617c67",
          host: "localhost:3000"
        })
        .then(() => {
          this.isSendPasswordResetMail = true;
        })
        .catch(err => {
          console.log(err);
        });
    },

    selectWorkSpace(id: string): void {
      this.$axios
        .$post(`workspaces/${id}/select`)
        .then(() => {
          this.$cookies.set("workspace_id", id);
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    },

    logout(): void {
      this.$cookies.remove("token");
      this.workspaceModal = false;
    }
  }
});
</script>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.modal {
  height: 420px;
}
</style>
