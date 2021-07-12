<template>
  <v-card class="modal">
    <v-row justify="center" align-content="center" style="height: 100%">
      <v-col cols="12">
        <p class="text-center font-weight-bold text-h4">Change password</p>
        <v-row justify="center">
          <v-col cols="6">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="oldPassword"
            >
              <v-text-field
                v-model="oldPassword"
                label="old password"
                :error-messages="errors"
                type="password"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="newPassword"
            >
              <v-text-field
                v-model="newPassword"
                label="new password"
                :error-messages="errors"
                type="password"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="confirmPassword"
            >
              <v-text-field
                v-model="confirmPassword"
                label="comfirm password"
                :error-messages="errors"
                type="password"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col cols="6">
            <p class="text-decoration-underline" @click="close">キャンセル</p>
          </v-col>
          <v-col cols="6" class="pt-0">
            <v-btn
              color="primary"
              width="180"
              height="44"
              tile
              @click="changePassword()"
              >Save</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export type Datatype = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export default Vue.extend({
  name: 'ChangePasswordModal',

  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    } as Datatype
  },

  methods: {
    changePassword(): void {
      this.$axios
        .$put('users/password', {
          old_password: this.oldPassword,
          new_password: this.newPassword,
          confirm_password: this.confirmPassword,
        })
        .then(() => {
          this.$emit('switchChangePasswordModal')
        })
        .catch((err) => {
          console.log(err)
        })
    },

    close(): void {
      this.$emit('switchChangePasswordModal')
    },
  },
})
</script>
