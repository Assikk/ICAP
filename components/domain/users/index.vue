<template>
  <div>
    <Header />
    <div class="p-6 flex flex-col gap-6">
      <div
        ref="test"
        class="bg-white rounded-md p-4 flex justify-between gap-4"
      >
        <div class="flex gap-4">
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium text-[#64748B]">Период с</p>
            <Date v-model="filter.date_from" />
            <p class="text-sm font-medium text-[#64748B]">по</p>
            <Date v-model="filter.date_to" />
          </div>
          <Button blue @click="clickFilter">
            <template #prev-icon>
              <svg width="16" height="16" fill="#0A7194">
                <use xlink:href="#search" />
              </svg>
            </template>
            Применить фильтр
          </Button>
          <Button white @click="clearFilter">
            <template #prev-icon>
              <svg width="16" height="16" fill="#6B7280">
                <use xlink:href="#update" />
              </svg>
            </template>
            Сброс фильтра
          </Button>
        </div>
        <div class="flex gap-4">
          <Button @click="showAddUser(true)"
          v-if="$checkPermission(193)">
            <template #prev-icon>
              <svg width="16" height="16" fill="none" stroke="#fff">
                <use xlink:href="#plus" />
              </svg>
            </template>
            Добавить
          </Button>
          <Button outlined @click="exportUser(true)">
            Экспорт
            <template #next-icon>
              <svg width="16" height="16" fill="#0A7194">
                <use xlink:href="#excel" />
              </svg>
            </template>
          </Button>
          <Button outlined @click="show_editColumns(true)">
            <template #next-icon>
              <svg width="16" height="16" fill="none" stroke="#0A7194">
                <use xlink:href="#filter" />
              </svg>
            </template>
          </Button>
        </div>
      </div>
      <Table
        v-if="isShowTable"
        class="overflow-x-auto scrollbar"
        :head="usersHead"
        :isLoading="isLoading"
        :count="count"
        :style="{ width: `${$refs.test.offsetWidth}px` }"
        @changePage="changePage"
      >
        <template #search>
          <td v-if="usersHead[0].isShow">
            <Search placeholder="Поиск по ФИО" v-model="filter.name" />
          </td>
          <td v-if="usersHead[1].isShow">
            <Search placeholder="Поиск по телефон" v-model="filter.phone" />
          </td>
          <td v-if="usersHead[2].isShow">
            <Select
              gray
              placeholder="Все роли"
              id="group"
              class="w-40"
              :list="groups"
              valueList="id"
              textList="name"
              v-model="filter.group"
            />
          </td>
          <td v-if="usersHead[3].isShow">
            <Select
              gray
              placeholder="Все области"
              id="region"
              class="w-40"
              :list="subregions"
              valueList="id"
              textList="name"
              v-model="filter.region"
            />
          </td>
          <td v-if="usersHead[4].isShow">
            <Select
              gray
              placeholder="Все города"
              id="city"
              class="w-40"
              :list="subcities"
              valueList="id"
              textList="name"
              v-model="filter.city"
            />
          </td>
          <td v-if="usersHead[5].isShow">
            <Select
              gray
              placeholder="Все организации"
              id="organizations"
              class="w-40"
              :list="suborganizations"
              valueList="id"
              textList="name"
              v-model="filter.organization"
            />
          </td>
          <td v-if="usersHead[6].isShow">
            <Select
              gray
              placeholder="Все статусы"
              id="statusList"
              class="w-40"
              :list="statusList"
              valueList="value"
              textList="name"
              v-model="filter.is_active"
            />
          </td>
          <td></td>
        </template>
        <template #body>
          <tr v-for="user in users" :key="user.id"
          v-show="user.id !== 1">
            <td v-if="usersHead[0].isShow" class="min-w-[300px]">
              <span>
                {{ user?.first_name }} {{ user?.last_name }}
                  {{ user?.middle_name }}
              </span>
            </td>
            <td v-if="usersHead[1].isShow" class="min-w-[200px]">
              <span>
                {{ user?.phone }}
              </span>
            </td>
            <td v-if="usersHead[2].isShow" class="min-w-[200px]">
              <span>
                {{ user.groups?.name[0] }}
              </span>
            </td>
            <td v-if="usersHead[3].isShow" class="min-w-[200px]">
              <span>
                {{ user.region?.name }}
              </span>
            </td>
            <td v-if="usersHead[4].isShow" class="min-w-[200px]">
              <span>
                {{ user.city?.name }}
              </span>
            </td>
            <td v-if="usersHead[5].isShow" class="min-w-[200px]">
              <span>
                {{ user.organization?.name }}
              </span>
            </td>
            <td v-if="usersHead[6].isShow" class="min-w-[200px]">
              <p
                class="text-center py-0.5 rounded-[10px] text-xs font-medium"
                :class="
                  user.is_active
                    ? 'bg-[#D1FAE5] text-[#065F46]'
                    : 'bg-[#FEE2E2] text-[#991B1B]'
                "
              >
                {{ user.is_active ? 'Активный' : 'Не активный' }}
              </p>
            </td>
            <td>
              <div class="flex items-center gap-[18px]">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditUser(user)"
                  v-if="$checkPermission(194)"
                >
                  <use xlink:href="#edit" />
                </svg>
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#5E6470"
                  v-if="$checkPermission(195)">
                  <use xlink:href="#delete" />
                </svg>
              </div>
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <div>
      <transition-group name="fade">
        <AddModal key="add" v-if="isShowAddUser" />
        <EditModal :activeUser="activeUser" :activePage="filter.page" key="edit" v-if="isShowEditUser" />
      </transition-group>
      <transition name="fade">
        <EditColumnsModal :list="usersHead" v-if="isShowEditColumns" />
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Header from '@/components/ui/header.vue'
import Date from '@/components/ui/inputs/date.vue'
import Button from '@/components/ui/buttons/default.vue'
import Select from '@/components/ui/selects/primary.vue'
import Table from '@/components/ui/table.vue'
import Search from '@/components/ui/inputs/search.vue'
import AddModal from './modals/add.vue'
import EditModal from './modals/edit.vue'
import Input from '@/components/ui/inputs/default.vue'
import EditColumnsModal from './modals/editColumns.vue'
export default {
  name: 'usersComponent',
  head: {
    title: 'Пользователи',
  },
  components: {
    Header,
    Date,
    Button,
    Select,
    Table,
    Search,
    AddModal,
    EditModal,
    Input,
    EditColumnsModal,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.user.isLoading,
      users: (state) => state.user.users,
      count: (state) => state.user.count,
      subregions: (state) => state.subregion.subregions,
      groups: (state) => state.group.groups,
      subcities: (state) => state.subcity.subcities,
      suborganizations: (state) => state.suborganization.suborganizations,
      isShowAddUser: (state) => state.user.isShowAddUser,
      isShowEditUser: (state) => state.user.isShowEditUser,
      search: (state) => state.user.search,
      isShowEditColumns: (state) => state.client.isShowEditColumns,
    }),
  },
  data() {
    return {
      usersHead: [
        {
          id: 1,
          name: 'ФИО',
          isShow: true,
        },
        {
          id: 2,
          name: 'Телефон',
          isShow: true,
        },
        {
          id: 3,
          name: 'Роль',
          isShow: true,
        },
        {
          id: 4,
          name: 'Область',
          isShow: true,
        },
        {
          id: 5,
          name: 'Город',
          isShow: true,
        },
        {
          id: 6,
          name: 'Организация',
          isShow: true,
        },
        {
          id: 7,
          name: 'Статус',
          isShow: true,
        },
        {},
      ],
      filter: {
        page: 1,
        name: '',
        phone: '',
        region: '',
        city: '',
        organization: '',
        is_active: '',
        date_from: '',
        date_to: '',
      },
      isShowTable: false,
      statusList: [
        {
          id: 1,
          name: 'Активный',
          value: 1,
        },
        {
          id: 2,
          name: 'Не активный',
          value: 0,
        },
      ],
    }
  },
  methods: {
    ...mapMutations({
      showAddUser: 'user/SHOW_ADDUSER',
      SHOW_EDITUSER: 'user/SHOW_EDITUSER',
      setSearch: 'user/SET_SEARCH',
      show_editColumns: 'client/SHOW_EDITCOLUMNS',
      set_loading: 'user/SET_LOADING'
    }),
    ...mapActions({
      getUsers: 'user/getUsers',
      get_subregions: 'subregion/get_subregions',
      get_groups: 'group/get_groups',
      get_subcities: 'subcity/get_subcities',
      get_suborganizations: 'suborganization/get_suborganizations',
    }),
    async clickFilter() {
      await this.getUsers(this.filter)
    },
    async clearFilter() {
      this.filter = {
        page: 1,
        name: '',
        phone: '',
        region: '',
        city: '',
        organization: '',
        is_active: '',
        date_from: '',
        date_to: '',
      }
      await this.getUsers(this.filter)
    },
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
    showDeleteUser(user) {
      this.activeUser = user
      this.showDeleteUser(true)
    },
    async changePage(page) {
      this.filter.page = page
      await this.getUsers(this.filter)
    },
    async exportUser() {
      alert('Export')
    }
  },
  async mounted() {
    if(this.$checkPermission(196)) {
      this.isShowTable = true
      await this.get_subregions()
      await this.get_groups()
      await this.get_subcities()
      await this.get_suborganizations()
      await this.getUsers(this.filter)
    } else this.$router.back(-1)
  },
  beforeDestroy() {
    this.set_loading(true)
  }
}
</script>

