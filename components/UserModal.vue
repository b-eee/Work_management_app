<template>
  <v-card class="modal">
    <v-row justify="center" align-content="center" style="height: 100%">
      <v-col cols="12">
        <p class="text-center font-weight-bold text-h4">UserProfile</p>
        <v-row justify="center">
          <v-col cols="6">
            <v-text-field v-model="userData.email" label="email" readonly>
            </v-text-field>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="name"
            >
              <v-text-field
                v-model="userData.username"
                label="name"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <v-text-field v-model="userData.note" label="note"></v-text-field>
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
              @click="updateUserData()"
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

/* eslint-disable camelcase */
export type userData = {
  username: string
  i_id: string
  user_id: { [user_id: string]: string }
  note: string
  email: string
}

export default Vue.extend({
  name: 'UserModal',

  data() {
    return {
      userData: {
        username: '',
        user_id: [{ user_id: '' }],
        note: '',
        i_id: '',
        email: '',
      },
    }
  },

  created() {
    this.userData.email = this.$cookies.get('hexaUserData').email
    this.userData.username = this.$cookies.get('hexaUserData').username
    this.userData.note = this.$cookies.get('userData').note
    this.userData.i_id = this.$cookies.get('userData').i_id
  },

  methods: {
    close(): void {
      this.$emit('switchUserModal')
    },

    updateUserData(): void {
      if (this.userData.username !== '') {
        const items = {
          item: {
            note: this.userData.note,
          },
          is_force_update: true,
          return_item_result: true,
          action_id: '',
        }
        this.$axios
          .$post(
            `applications/${process.env.app_id}/datastores/users/items/edit/${this.userData.i_id}`,
            items
          )
          .then((data) => {
            this.$cookies.set('userData', data.item)
            this.userData.note = data.item.note
            this.updateUserDataToHexabase()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },

    updateUserDataToHexabase(): void {
      this.$axios
        .$put('userinfo', {
          username: this.userData.username,
          user_id: this.$cookies.get('hexaUserData').u_id,
        })
        .then(() => {
          this.$emit('switchUserModal')
          const hexaUserData = this.$cookies.get('hexaUserData')
          hexaUserData.username = this.userData.username
          this.$cookies.set('hexaUserData', hexaUserData)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})
</script>
