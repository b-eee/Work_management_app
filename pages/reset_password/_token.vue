<template>
  <div>
    <Header :is-guest="true"></Header>
    <div class="content">
      <v-responsive max-width="600" class="mx-auto text-center mt-16">
        <v-row
          class="my-0"
          justify="center"
          align-content="center"
          style="height: 100%"
        >
          <p class="text-center font-weight-bold text-h4">
            Registertion password
          </p>
          <v-col v-if="!isSend" cols="12">
            <v-row justify="center">
              <v-col cols="6">
                <p class="text-center mt-4">パスワードを再設定してください。</p>
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
            <v-row justify="center">
              <v-col cols="6">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="|required"
                  name="password"
                >
                  <v-text-field
                    v-model="confirmPassword"
                    label="confirm new password"
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
                  @click="resetPassword"
                  >Re-register</v-btn
                >
              </div>
            </div>
          </v-col>

          <v-col v-else class="text-center" cols="12">
            <img src="/checkmark.png" />
            <p class="mt-5">I registered your new password.</p>
            <p>Please login again.</p>
            <div class="mt-8">
              <v-btn
                color="primary mt-3"
                width="180"
                height="44"
                tile
                @click="$router.push('/login')"
                >Login</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-responsive>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export type DataType = {
  password: string
  confirmPassword: string
  isSend: boolean
  errorMsg: string
}

export default Vue.extend({
  name: 'ResetPassword',

  data() {
    return {
      password: '',
      confirmPassword: '',
      isSend: false,
      errorMsg: '',
    } as DataType
  },

  methods: {
    resetPassword(): void {
      if (this.password === this.confirmPassword) {
        this.$axios
          .$put('users/password/forgot', {
            new_password: this.password,
            confirm_password: this.confirmPassword,
            id: this.$route.params.token,
          })
          .then(() => {
            this.isSend = true
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.errorMsg = 'パスワードが一致していません'
      }
    },
  },
})
</script>
