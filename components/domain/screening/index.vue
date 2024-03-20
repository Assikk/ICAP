<template>
  <div>
    <div>
      <div>
        <Header />
      </div>
      <div class="mt-2 p-6">
        <div class="flex justify-between items-center p-2 bg-white rounded-lg">
          <div class="flex px-4 py-2">
            <div class="h-12 flex items-center">
              Период с
              <input
                type="date"
                placeholder="дд-мм-гггг"
                class="border rounded-lg p-2 mx-2"
              />
              по
              <input
                type="date"
                placeholder="дд-мм-гггг"
                class="border rounded-lg p-2 mx-2"
              />
            </div>
            <div class="flex">
              <a
                href="javascript:location.reload()"
                class="flex items-center h-12 whitespace-nowrap bg-[#DAF4FF] text-[#0A7194] pl-3 pr-4 py-2 ml-4 mr-3 rounded-lg font-semibold"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="mx-2"
                >
                  <path
                    d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z"
                    stroke="#0A7194"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Применить фильтр</a
              >
              <a
                href="javascript:location.reload()"
                class="flex items-center h-12 whitespace-nowrap text-[#A1A1AA] border pl-3 pr-4 py-2 ml-3 mr-4 rounded-lg font-semibold"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="mx-2"
                >
                  <path
                    d="M8 14C6.46667 14 5.13067 13.4918 3.992 12.4753C3.0413 11.6267 2.42923 10.6016 2.1558 9.40004C2.06772 9.01295 2.38019 8.66667 2.77717 8.66667H2.81706C3.15088 8.66667 3.42792 8.91534 3.51045 9.2388C3.74072 10.1414 4.21791 10.9063 4.942 11.5333C5.81444 12.2889 6.83378 12.6667 8 12.6667C9.3 12.6667 10.4029 12.214 11.3087 11.3087C12.2144 10.4033 12.6671 9.30044 12.6667 8C12.6667 6.7 12.214 5.59733 11.3087 4.692C10.4033 3.78667 9.30044 3.33378 8 3.33333C7.23333 3.33333 6.51667 3.51111 5.85 3.86667C5.18333 4.22222 4.62222 4.71111 4.16667 5.33333H5.33333C5.70152 5.33333 6 5.63181 6 6C6 6.36819 5.70152 6.66667 5.33333 6.66667H2.66667C2.29848 6.66667 2 6.36819 2 6V3.33333C2 2.96514 2.29848 2.66667 2.66667 2.66667C3.03486 2.66667 3.33333 2.96514 3.33333 3.33333V4.23333C3.9 3.52222 4.59178 2.97222 5.40867 2.58333C6.22556 2.19444 7.08933 2 8 2C8.83333 2 9.614 2.15844 10.342 2.47533C11.07 2.79222 11.7033 3.21978 12.242 3.758C12.7807 4.29711 13.2084 4.93044 13.5253 5.658C13.8422 6.38556 14.0004 7.16622 14 8C14 8.83333 13.8418 9.614 13.5253 10.342C13.2089 11.07 12.7811 11.7033 12.242 12.242C11.7029 12.7807 11.0696 13.2084 10.342 13.5253C9.61444 13.8422 8.83378 14.0004 8 14Z"
                    fill="#6B7280"
                  />
                </svg>
                Сброс фильтра</a
              >
            </div>
          </div>
          <div class="flex px-4 py-2">
            <Button
              @click="showAddUser(true)"
              class="bg-[#038DB7] hover:bg-[#0A7194] text-[#F1FAFF] rounded-md p-3 flex items-center justify-center gap-3 text-sm"
            >
              <span class="text-md">+</span><span>Добавить</span></Button
            >

            <a
              href="#"
              class="text-[#0A7194] border-2 mx-4 rounded-md p-3 flex items-center justify-center gap-3 text-sm"
            >
              <span>Экспорт</span
              ><span class="text-md"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M2.38268 2.39835L12.8577 0.901683C12.9168 0.893203 12.977 0.89753 13.0343 0.914371C13.0916 0.931212 13.1447 0.960174 13.1898 0.999294C13.2349 1.03841 13.2711 1.08678 13.2959 1.14111C13.3207 1.19544 13.3335 1.25446 13.3335 1.31418V18.6867C13.3335 18.7463 13.3207 18.8053 13.2959 18.8595C13.2712 18.9138 13.2351 18.9621 13.1901 19.0012C13.145 19.0403 13.0921 19.0693 13.0349 19.0862C12.9777 19.1031 12.9176 19.1075 12.8585 19.0992L2.38185 17.6025C2.1832 17.5742 2.00143 17.4752 1.86992 17.3236C1.73842 17.1721 1.66602 16.9782 1.66602 16.7775V3.22335C1.66602 3.02269 1.73842 2.82878 1.86992 2.67722C2.00143 2.52566 2.18403 2.42664 2.38268 2.39835ZM3.33352 3.94585V16.0542L11.6668 17.2459V2.75418L3.33352 3.94585ZM14.1668 15.8334H16.6668V4.16668H14.1668V2.50002H17.5002C17.7212 2.50002 17.9332 2.58781 18.0894 2.74409C18.2457 2.90037 18.3335 3.11234 18.3335 3.33335V16.6667C18.3335 16.8877 18.2457 17.0997 18.0894 17.2559C17.9332 17.4122 17.7212 17.5 17.5002 17.5H14.1668V15.8334ZM8.50018 10L10.8335 13.3334H8.83352L7.50018 11.4284L6.16685 13.3334H4.16685L6.50018 10L4.16685 6.66668H6.16685L7.50018 8.57168L8.83352 6.66668H10.8335L8.50018 10Z"
                    fill="#0A7194"
                  /></svg></span
            ></a>

            <a
              href="#"
              class="text-[#0A7194] border-2 rounded-md p-3 flex items-center justify-center gap-3 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 11.25L5 3.125M5 11.25C5.69036 11.25 6.25 11.8096 6.25 12.5C6.25 13.1904 5.69036 13.75 5 13.75M5 11.25C4.30964 11.25 3.75 11.8096 3.75 12.5C3.75 13.1904 4.30964 13.75 5 13.75M5 16.875L5 13.75M15 11.25V3.125M15 11.25C15.6904 11.25 16.25 11.8096 16.25 12.5C16.25 13.1904 15.6904 13.75 15 13.75M15 11.25C14.3096 11.25 13.75 11.8096 13.75 12.5C13.75 13.1904 14.3096 13.75 15 13.75M15 16.875L15 13.75M10 6.25V3.125M10 6.25C10.6904 6.25 11.25 6.80964 11.25 7.5C11.25 8.19036 10.6904 8.75 10 8.75M10 6.25C9.30964 6.25 8.75 6.80964 8.75 7.5C8.75 8.19036 9.30964 8.75 10 8.75M10 16.875V8.75"
                  stroke="#0A7194"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                /></svg
            ></a>
          </div>
        </div>
      </div>
      <div class="mt-6 px-6">
        <Table
          :head="usersHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #search>
            <th>
              <Search @input="searchSubcity" />
            </th>
            <th>
              <Search @input="searchSubcity" />
            </th>
            <th>
              <Search @input="searchSubcity" />
            </th>
            <th>
              <Search @input="searchSubcity" />
            </th>
            <th>
              <Search @input="searchSubcity" />
            </th>
            <th>
              <Search @input="searchSubcity" />
            </th>
            <th>
              <Search @input="searchSubcity" />
            </th>
            <th>
              <p></p>
            </th>
          </template>
          <template #body>
            <tr v-for="user in users" :key="user.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ user.first_name }} {{ user.last_name }}
                  {{ user.middle_name }}
                </span>
              </td>
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ user.phone }}
                </span>
              </td>
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ user.groups[0] }}
                </span>
              </td>
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ user.region }}
                </span>
              </td>
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ user.city }}
                </span>
              </td>
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ user.organization }}
                </span>
              </td>
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ user.is_active }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditUser(user)"
                >
                  <use xlink:href="#edit" />
                </svg>
                <!-- <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#5E6470"
                  @click="showDeleteUser(user)"
                >
                  <use xlink:href="#delete" />
                </svg> -->
              </td>
            </tr>
          </template>
        </Table>
      </div>
    </div>
    <div>
      <transition-group name="fade">
        <AddModal key="add" v-if="isShowAddUser" />
        <EditModal :activeUser="activeUser" key="edit" v-if="isShowEditUser" />
        <DeleteModal
          :activeUser="activeUser"
          v-if="isShowDeleteUser"
          key="delete"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Header from '@/components/ui/header.vue'
import Search from './components/search.vue'
import Table from '@/components/ui/table.vue'
import Button from '@/components/ui/buttons/default.vue'
import AddModal from './modals/add.vue'
import EditModal from './modals/edit.vue'
import DeleteModal from './modals/delete.vue'
export default {
  layout: 'sidebar',
  components: {
    Header,
    Search,
    AddModal,
    EditModal,
    DeleteModal,
    Table,
    Button,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.user.isLoading,
      users: (state) => state.user.users,
      isShowAddUser: (state) => state.user.isShowAddUser,
      isShowEditUser: (state) => state.user.isShowEditUser,
      isShowDeleteUser: (state) => state.user.isShowDeleteUser,
      count: (state) => state.user.count,
      search: (state) => state.user.search,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      usersHead: [
        {
          id: 1,
          name: 'ФИО',
        },
        {
          id: 2,
          name: 'Телефон',
        },
        {
          id: 3,
          name: 'Роль',
        },
        {
          id: 4,
          name: 'Область',
        },
        {
          id: 5,
          name: 'Город',
        },
        {
          id: 6,
          name: 'Организация',
        },
        {
          id: 7,
          name: 'Статус',
        },
        {
          id: 8,
          name: '',
        },
      ],
      activeUser: {},
    }
  },
  methods: {
    ...mapMutations({
      showAddUser: 'user/SHOW_ADDUSER',
      SHOW_EDITUSER: 'user/SHOW_EDITUSER',
      showDeleteUser: 'user/SHOW_DELETEUSER',
      setSearch: 'user/SET_SEARCH',
    }),
    ...mapActions({
      getUsers: 'user/getUsers',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.getUsers({
        search: this.search,
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updateUsers() {
      this.activeStatus = ''
      this.setSearch('')
      await this.getUsers({ page: 1 })
    },
    showEditUser(item) {
      this.activeUser = item
      this.SHOW_EDITUSER(true)
    },
    async searchUsers() {
      await this.getUsers({
        search: this.search,
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.getUsers({
        search: this.search,
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeleteUser(user) {
      this.activeUser = user
      this.showDeleteUser(true)
    },
    searchUsers(search) {
      console.log(search)
    },
  },
  async mounted() {
    await this.getUsers({ page: 1 })
  },
}
</script>
