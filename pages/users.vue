<template>
  <div>
    <Header
      :is-guest="false"
      :name="$cookies.get('userData').username"
    ></Header>
    <div>
      <div v-if="isLoading"></div>
      <v-responsive v-else class="mx-10 mt-16">
        <p class="text-h4">Users list</p>

        <v-row>
          <v-col cols="12">
            <v-data-table :headers="headers" :items="items">
              <template #[`item.status`]="{ item }">
                <v-menu offset-y>
                  <template #activator="{ on, attrs }">
                    <span
                      :style="`background: ${btnColor[item.status]}`"
                      class="pa-1 rounded"
                      v-bind="attrs"
                      v-on="on"
                      >{{ item.status }}</span
                    >
                  </template>
                  <v-list>
                    <v-list-item v-if="item.status === 'suspended'">
                      <span @click="updateUserData(item)"> activeにする </span>
                    </v-list-item>
                    <v-list-item v-else>
                      <span @click="updateUserData(item)"> suspendにする </span>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-responsive>
    </div>
    <v-dialog v-model="statusModal" width="680" persistent>
      <v-card class="modal">
        <v-row justify="center" align-content="center" style="height: 100%">
          <v-col cols="12">
            <p class="text-center font-weight-bold text-h4">UserProfile</p>
            <v-row justify="center">
              <v-col cols="6">
                <v-select
                  v-model="userData.status"
                  :items="status"
                  item-text="text"
                  item-value="value"
                  label="status"
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="text-center">
              <v-col cols="6">
                <p
                  class="text-decoration-underline"
                  @click="statusModal = false"
                >
                  キャンセル
                </p>
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
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export type headers = {
  text: string
  value: string
}

/* eslint-disable camelcase */
export type userData = {
  i_id: string
  status: string
}

export type detailUser = {
  user: object
  i_id: string
}

export type btnColor = {
  active: string
  suspended: string
}

export type DataType = {
  headers: headers[]
  items: detailUser[]
  userData: userData
  status: headers[]
  userStatus: string
  statusModal: boolean
  isLoading: boolean
  itemLength: number
  btnColor: btnColor
}

export default Vue.extend({
  name: 'Users',
  layout: 'loggedin',

  data() {
    return {
      headers: [
        {
          text: 'name',
          value: 'user.field_values[0].value[0].user_name',
        },
        {
          text: 'email',
          value: 'user.field_values[0].value[0].email',
        },
        {
          text: 'note',
          value: 'note',
        },
        {
          text: 'status',
          value: 'status',
        },
      ],
      isLoading: true,
      items: {},
      itemLength: 0,
      status: [
        {
          value: 'active',
          text: 'active',
        },
        {
          value: 'suspended',
          text: 'suspended',
        },
      ],
      userData: {},
      userStatus: '',
      statusModal: false,
      btnColor: {
        active: '#82b1ff',
        suspended: '#a5cdb6',
      }
    } as DataType
  },

  created() {
    this.getUsers()
  },

  methods: {
    updateUserData(item: userData): void {
      const items = {
        item: {
          status: item.status,
        },
        is_force_update: true,
        return_item_result: true,
        action_id: '',
      }

      if (item.status === 'suspended') {
        items.action_id = 'active'
      } else {
        items.action_id = 'suspendAccount'
      }

      this.$axios
        .$post(
          `applications/${process.env.app_id}/datastores/users/items/edit/${item.i_id}`,
          items
        )
        .then(() => {
          this.isLoading = true
          this.getUsers()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    async getUsers() {
      await this.$axios
        .$post(`applications/${process.env.app_id}/datastores/users/items/search`, {
          conditions: [],
          page: 1,
          per_page: 0,
          use_display_id: true,
          include_links: true,
        })
        .then((data) => {
          this.items = data.items
          this.itemLength = data.totalItems
          this.getDetailUser()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    async getDetailUser() {
      for (let i = 0; i < this.itemLength; i++) {
        this.items[i].user = await this.test(this.items[i].i_id)
      }
      this.isLoading = false
    },

    async test(id: string) {
      const userDetail = await this.$axios
        .$get(`applications/${process.env.app_id}/datastores/users/items/details/${id}`)
        .then((data) => {
          return data
        })
        .catch((err) => {
          console.log(err)
        })
      return userDetail
    },
  },
})
</script>
