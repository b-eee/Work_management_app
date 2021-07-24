<template>
  <div>
    <div>
      <div v-if="isLoading">loading...</div>
      <v-responsive v-else class="mx-10 mt-16">
        <div class="d-flex justify-space-between">
          <p class="text-h4">Works list</p>
          <v-btn
            color="primary"
            width="180"
            height="44"
            tile
            @click="createModal = true"
            >新規作成</v-btn
          >
        </div>
        <v-row class="mt-12">
          <v-col :cols="!detailView ? 12 : 6">
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              @click:row="showDetailView"
              :footer-props="{
                'items-per-page-options': itemPerPage
              }"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </template>
              <template #[`item.status`]="{ item }">
                <v-menu offset-y>
                  <template #activator="{ on, attrs }">
                    <span
                      v-bind="attrs"
                      v-on="on"
                      :style="`background: ${btnColor[item.status]}`"
                      class="pa-1 rounded"
                      >{{ item.status }}</span
                    >
                  </template>
                  <v-list>
                    <v-list-item v-if="item.status !== 'new'">
                      <span @click="changeStatus('new', item)">
                        newにする
                      </span>
                    </v-list-item>
                    <v-list-item v-if="item.status !== 'assigned'">
                      <span @click="changeStatus('assigned', item)">
                        assignedにする
                      </span>
                    </v-list-item>
                    <v-list-item v-if="item.status !== 'in progress'">
                      <span @click="changeStatus('in progress', item)">
                        in progressにする
                      </span>
                    </v-list-item>
                    <v-list-item v-if="item.status !== 'in review'">
                      <span @click="changeStatus('in review', item)">
                        in_recviewにする
                      </span>
                    </v-list-item>
                    <v-list-item v-if="item.status !== 'close'">
                      <span @click="changeStatus('close', item)">
                        closeにする
                      </span>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-col>
          <v-col v-if="detailView" cols="6">
            <v-card elevation="4">
              <v-row class="pa-4">
                <v-col col="2" offset="10">
                  <v-icon class="mr-1" @click="deleteModal = true"
                    >mdi-delete</v-icon
                  >
                  <v-icon @click="detailView = false">mdi-close</v-icon>
                </v-col>
              </v-row>
              <div class="pa-4">
                <div class="d-flex">
                  <div
                    class="status"
                    v-for="(val, key) in status"
                    :key="key"
                    :class="`${val.value === nowItem.status ? 'active' : ''}`"
                  >
                    {{ val.text }}
                  </div>
                </div>
                <v-text-field
                  v-model="nowItem.work_title"
                  label="タイトル"
                ></v-text-field>
                <v-select
                  v-model="nowItem.assignee"
                  label="担当者"
                  :items="users"
                  item-text="username"
                  item-value="u_id"
                ></v-select>
                <v-select
                  v-model="nowItem.category"
                  label="カテゴリー"
                  :items="categories"
                  item-text="value"
                  item-value="option_id"
                ></v-select>
                <v-text-field
                  v-model="nowItem.deadline"
                  label="期限"
                  type="date"
                ></v-text-field>
                <div class="mt-8">
                  <v-btn
                    color="primary mt-3"
                    width="180"
                    height="44"
                    tile
                    @click="updateWork"
                    >保存</v-btn
                  >
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-responsive>
    </div>
    <v-dialog v-model="createModal" width="680">
      <v-card class="modal">
        <v-row justify="center" align-content="center" style="height: 100%">
          <v-col cols="12">
            <p class="text-center font-weight-bold text-h4">新規作成</p>
            <v-row justify="center">
              <v-col cols="6">
                <v-text-field
                  v-model="newWork.work_title"
                  label="タイトル"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="6">
                <v-select
                  v-model="newWork.assignee"
                  label="担当者"
                  :items="users"
                  item-text="username"
                  item-value="u_id"
                ></v-select>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="6">
                <v-select
                  v-model="newWork.category"
                  label="カテゴリー"
                  :items="categories"
                  item-text="value"
                  item-value="option_id"
                ></v-select>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="6">
                <v-text-field
                  v-model="newWork.deadline"
                  label="期限"
                  type="date"
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="text-center">
              <div>
                <v-btn
                  color="primary mt-3"
                  width="180"
                  height="44"
                  tile
                  @click="createWork"
                  >作成</v-btn
                >
              </div>
              <div class="mt-4">
                <p
                  class="text-decoration-underline"
                  @click="createModal = false"
                >
                  キャンセル
                </p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteModal" width="680">
      <v-card class="modal pa-5">
        <v-row justify="center" align-content="center" style="height: 100%">
          <v-col cols="12">
            <p class="text-center font-weight-bold text-h4">
              本当に削除しますか？
            </p>
          </v-col>
          <v-col cols="6" align="center">
            <v-btn
              color="primary mt-3"
              width="180"
              height="44"
              tile
              @click="deleteWork"
            >
              削除
            </v-btn>
          </v-col>
          <v-col cols="6" align="center">
            <v-btn
              color="mt-3"
              width="180"
              height="44"
              tile
              @click="deleteModal = false"
            >
              キャンセル
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export type headers = {
  text: string;
  value: string;
};

/* eslint-disable camelcase */
export type workData = {
  i_id: string;
  status: string;
};

export type detailUser = {
  user: object;
  i_id: string;
};

export type users = {
  username: string;
  u_id: string;
  id: string;
};

export type categories = {
  option_id: string;
  value: string;
};

export type itemData = {
  work_title: string;
  assignee: string;
  creator: string;
  category: string;
  status: string;
  deadline: string;
  i_id: string;
  status_id: string;
  viewCategory: string;
  viewAssignee: string;
};

export type btnColor = {
  new: string;
  assigned: string;
  "in progress": string;
  "in review": string;
  closed: string;
};

export type DataType = {
  headers: headers[];
  items: detailUser[];
  workData: workData;
  status: headers[];
  userStatus: string;
  statusModal: boolean;
  isLoading: boolean;
  itemLength: number;
  search: string;
  detailView: boolean;
  nowItem: itemData;
  createModal: boolean;
  newWork: itemData;
  users: users[];
  categories: categories[];
  deleteModal: boolean;
  itemPerPage: object;
  btnColor: btnColor;
};

export default Vue.extend({
  name: "Users",
  layout: "loggedin",

  data() {
    return {
      headers: [
        {
          text: "タイトル",
          value: "work_title"
        },
        {
          text: "担当者",
          value: "assignee"
        },
        {
          text: "作成者",
          value: "creator"
        },
        {
          text: "カテゴリー",
          value: "category"
        },
        {
          text: "ステータス",
          value: "status"
        },
        {
          text: "期限",
          value: "deadline"
        }
      ],
      isLoading: true,
      items: {},
      itemLength: 0,
      search: "",
      status: [
        {
          value: "new",
          text: "new"
        },
        {
          value: "assigned",
          text: "assigned"
        },
        {
          value: "in progress",
          text: "in_progress"
        },
        {
          value: "in review",
          text: "in_review"
        },
        {
          value: "close",
          text: "close"
        }
      ],
      workData: {},
      userStatus: "",
      statusModal: false,
      detailView: false,
      nowItem: {},
      createModal: false,
      newWork: {
        work_title: "",
        assignee: "",
        category: "",
        deadline: ""
      },
      users: [{}],
      categories: [{}],
      deleteModal: false,
      itemPerPage: [10, 20, 30, -1],
      btnColor: {
        new: "#82b1ff",
        assigned: "#a5cdb6",
        "in review": "#50d0d0",
        "in progress": "#788bc5",
        closed: "#e43b80"
      }
    } as DataType;
  },

  created() {
    this.getWorkData();
    this.getUserData();
    this.getCategory();
  },

  methods: {
    updateWork() {
      let items = {
        item: {
          work_title: this.nowItem.work_title,
          assignee: [this.nowItem.assignee],
          category: this.nowItem.category,
          deadline: this.nowItem.deadline
        },
        is_force_update: true,
        return_item_result: true,
        action_id: ""
      };

      switch (this.nowItem.status) {
        case "new":
          items.action_id = "new";
          break;
        case "assigned":
          items.action_id = "assigned";
          break;
        case "in progress":
          items.action_id = "in_progress";
          break;
        case "in review":
          items.action_id = "in_review";
          break;
        case "close":
          items.action_id = "close";
          break;
      }

      this.$axios
        .$post(
          `applications/work_management/datastores/works/items/edit/${this.nowItem.i_id}`,
          items
        )
        .then(() => {
          this.detailView = false;
          this.getWorkData();
        })
        .catch(err => {
          console.log(err);
        });
    },

    createWork(): void {
      this.$axios
        .$post(`applications/work_management/datastores/works/items/new`, {
          item: {
            work_title: this.newWork.work_title,
            category: this.newWork.category,
            assignee: [this.newWork.assignee],
            creator: [this.$cookies.get("hexaUserData").u_id],
            deadline: this.newWork.deadline,
            status: "new"
          },
          return_item_result: true
        })
        .then(() => {
          this.createModal = false;
          this.getWorkData();
        })
        .catch(err => {
          console.log(err);
        });
    },

    deleteWork(): void {
      this.$axios
        .$delete(
          `applications/work_management/datastores/works/items/delete/${this.nowItem.i_id}`,
          {
            data: {}
          }
        )
        .then(data => {
          this.deleteModal = false;
          this.detailView = false;
          this.getWorkData();
        })
        .catch(err => {
          console.log(err);
        });
    },

    getWorkData(): void {
      this.$axios
        .$post("applications/work_management/datastores/works/items/search", {
          conditions: [],
          page: 1,
          per_page: 0,
          use_display_id: true,
          include_links: true
        })
        .then(data => {
          const items = Object.keys(data.items).map(i => {
            let date = data.items[i].deadline.split("T");
            data.items[i].deadline = date[0];
            return data.items[i];
          });
          this.items = items;
          this.itemLength = data.totalItems;
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getUserData() {
      this.$axios
        .$get("workspaces/60b59b11ccd0a76131b0cef2/users")
        .then(data => {
          this.users = data["60b59b11ccd0a76131b0cef3"];
        })
        .catch(err => {
          console.log(err);
        });
    },

    getCategory() {
      this.$axios
        .$get("applications/work_management/datastores/works/items/conditions")
        .then(data => {
          this.categories = data.result[2].options;
        })
        .catch(err => {
          console.log(err);
        });
    },

    showDetailView(item: itemData) {
      this.selectNowItem(item);
      this.detailView = true;
    },

    selectNowItem(item: itemData) {
      this.nowItem = JSON.parse(JSON.stringify(item));
      // @ts-ignore
      const userIndex: number = Object.keys(this.users).findIndex((u: number) => {return this.users[u].username == [item.assignee]});
      this.nowItem.assignee = this.users[userIndex].u_id;
      // @ts-ignore
      const categoryIndex: number = Object.keys(this.categories).findIndex((u: number) => {return this.categories[u].value == [item.category]});
      this.nowItem.category = this.categories[categoryIndex].option_id;
      this.nowItem.viewCategory = this.categories[categoryIndex].value;
      this.nowItem.viewAssignee = this.users[userIndex].username;
    },

    changeStatus(status: string, item: itemData) {
      this.selectNowItem(item);
      this.nowItem.status = status;
      this.updateWork();
    }
  }
});
</script>

<style scoped>
.status {
  background: #d6d6d6;
  width: 80px;
  text-align: center;
  height: 30px;
  font-size: 12px;
  position: relative;
  padding-top: 5px;
}

.status:before {
  content: " ";
  display: block;
  width: 0;
  height: 0;
  border-left: 5px solid #d6d6d6;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  position: absolute;
  right: -6%;
  top: 0%;
  z-index: 1;
}

.status:after {
  content: " ";
  display: block;
  width: 0;
  height: 0;
  border-left: 5px solid #fff;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  position: absolute;
  right: 92%;
  top: 0%;
}

.status:first-child:after {
  display: none;
}

.status:last-child:before {
  display: none;
}

.active {
  background: #1976d2;
  color: #fff;
}

.active:before {
  border-left: 5px solid #1976d2;
}
</style>
