<template>
  <v-app dark>
    <v-navigation-drawer
      class="blue-grey lighten-5"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-toolbar-title
          v-if="miniVariant"
          class="text-center pt-4 pb-4 blue-grey lighten-5"
          v-text="'W'"
        />
        <v-toolbar-title
          v-else
          class="text-center pt-4 pb-4 blue-grey lighten-5"
          v-text="title"
        />
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app class="blue-grey lighten-5">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on">mdi-account-circle</v-icon>
        </template>
        <v-list>
          <v-list-item>
            <p @click="switchUserModal">User Profile</p>
          </v-list-item>
          <v-list-item>
            <p @click="switchChangePasswordModal">Change Password</p>
          </v-list-item>
          <v-list-item>
            <p @click="logout">logout</p>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <div class="ma-10">
        <Nuxt />
      </div>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; Copyright 2021 Hexabase, Inc.</span>
    </v-footer>

    <v-dialog v-model="changePasswordModal" width="680" persistent>
      <ChangePasswordModal
        @switchChangePasswordModal="switchChangePasswordModal"
      ></ChangePasswordModal>
    </v-dialog>

    <v-dialog v-model="userModal" width="680" persistent class="oveflow-hidden">
      <UserModal @switchUserModal="switchUserModal"></UserModal>
    </v-dialog>
  </v-app>
</template>

<script>
import Vue from "vue";
import UserModal from "../components/UserModal.vue";
import ChangePasswordModal from "../components/ChangePasswordModal.vue";
export default Vue.extend({
  middleware: ["auth"],
  components: {
    UserModal,
    ChangePasswordModal
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Home",
          to: "/"
        },
        {
          icon: "mdi-format-list-checks",
          title: "Works",
          to: "/work"
        },
        {
          icon: "mdi-account-supervisor-outline",
          title: "Users",
          to: "/users"
        },
        {
          icon: "mdi-google-maps",
          title: "Map",
          to: "/map"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Work admin sample",
      changePasswordModal: false,
      userModal: false
    };
  },
  methods: {
    switchChangePasswordModal() {
      this.changePasswordModal = !this.changePasswordModal;
    },

    switchUserModal() {
      this.userModal = !this.userModal;
    },

    logout() {
      this.$cookies.remove("token");
      this.$router.push("/login");
    }
  }
});
</script>
