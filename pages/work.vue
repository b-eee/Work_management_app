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
          <v-col :cols="!detailView ? 12 : 7">
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              @click:row="showDetailView"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="search"
                  label="Search (UPPER CASE ONLY)"
                  class="mx-4"
                ></v-text-field>
              </template>
            </v-data-table>
          </v-col>
          <v-col v-if="detailView" cols="5">
            <v-card elevation="4">
              <v-row class="pa-4">
                <v-col col="2" offset="7">
                  <v-icon class="mr-1" @click="edit = true">mdi-pencil</v-icon>
                  <v-icon class="mr-1" @click="deleteModal = true"
                    >mdi-delete</v-icon
                  >
                  <v-icon @click="detailView = false">mdi-close</v-icon>
                </v-col>
              </v-row>
              <div class="pa-4" v-if="!edit">
                <p class="text-h6">{{ nowItem.work_title }}</p>
                <p>担当者： {{ nowItem.viewAssignee }}</p>
                <p>作成者： {{ nowItem.creator }}</p>
                <p>カテゴリー： {{ nowItem.viewCategory }}</p>
                <p>ステータス： {{ nowItem.status }}</p>
                <p>期限： {{ nowItem.deadline }}</p>
              </div>
              <div class="pa-4" v-else>
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
                <v-select
                  v-model="nowItem.status"
                  label="ステータス"
                  :items="status"
                  item-text="text"
                  item-value="value"
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

export type NewWork = {
  work_title: string;
  assignee: string;
  creator: string;
  category: string;
  status: string;
  deadline: string;
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
  nowItem: NewWork;
  edit: boolean;
  createModal: boolean;
  newWork: NewWork;
  users: [];
  categories: [];
  deleteModal: boolean;
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
      edit: false,
      createModal: false,
      newWork: {
        work_title: "",
        assignee: "",
        category: "",
        deadline: ""
      },
      users: [],
      categories: [],
      deleteModal: false
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
          this.edit = false;
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
          this.categories = data.result[1].options;
        })
        .catch(err => {
          console.log(err);
        });
    },

    showDetailView(item: any) {
      this.nowItem = JSON.parse(JSON.stringify(item));
      const userIndex = this.users.findIndex(
        u => u.username == [item.assignee]
      );
      this.nowItem.assignee = this.users[userIndex].u_id;
      const categoryIndex = this.categories.findIndex(
        u => u.value == [item.category]
      );
      this.nowItem.category = this.categories[categoryIndex].option_id;
      this.nowItem.viewCategory = this.categories[categoryIndex].value;
      this.nowItem.viewAssignee = this.users[userIndex].username;
      this.detailView = true;
    }
  }
});
</script>
