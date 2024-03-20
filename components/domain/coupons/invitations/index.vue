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
          <!-- <Button @click="showAddInvitation(true)">
            <template #prev-icon>
              <svg width="16" height="16" fill="none" stroke="#fff">
                <use xlink:href="#plus" />
              </svg>
            </template>
            Добавить
          </Button> -->
          <Button outlined>
            Экспорт
            <template #next-icon>
              <svg width="16" height="16" fill="#0A7194">
                <use xlink:href="#excel" />
              </svg>
            </template>
          </Button>
        </div>
      </div>
      <Table
        v-if="isShowTable"
        class="overflow-x-auto scrollbar"
        :head="invitationsHead"
        :isLoading="isLoading"
        :count="count"
        :style="{ width: `${$refs.test.offsetWidth}px` }"
        @changePage="changePage"
      >
        <template #search>
          <td v-if="invitationsHead[0].isShow">
            <Search placeholder="Поиск по ID" v-model="filter.id" />
          </td>
          <td v-if="invitationsHead[1].isShow">
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
          <td v-if="invitationsHead[2].isShow">
            <Search
              placeholder="Поиск по первичному респонденту"
              v-model="filter.seed_name"
            />
          </td>
          <td v-if="invitationsHead[3].isShow">
            <Search
              placeholder="Поиск по респонденту"
              v-model="filter.child_name"
            />
          </td>
          <td v-if="invitationsHead[4].isShow">
            <input
              type="date"
              class="px-3 py-2 border border-[#D1D5DB] outline-none rounded-md text-xs text-[#6B7280] bg-transparent"
              v-model="filter.participation_date"
            />
          </td>
          <td v-if="invitationsHead[5].isShow">
            <Select
              gray
              placeholder="Все статусы"
              id="statusList"
              class="w-40"
              :list="statusList"
              valueList="value"
              textList="name"
              v-model="filter.status"
            />
          </td>
          <td></td>
        </template>
        <template #body>
          <tr v-for="invitation in invitations" :key="invitation.id">
            <td v-if="invitationsHead[0].isShow" class="w-[200px]">
              <span>
                {{ invitation?.id }}
              </span>
            </td>
            <td v-if="invitationsHead[1].isShow" class="min-w-[200px]">
              <span>
                {{ invitation?.organization.name }}
              </span>
            </td>
            <td v-if="invitationsHead[2].isShow" class="min-w-[350px]">
              <span>
                {{
                  invitation?.parent
                    ? `${invitation.parent.last_name} ${invitation.parent.first_name} ${invitation.parent.middle_name}`
                    : 'Нет данных'
                }}
              </span>
            </td>
            <td v-if="invitationsHead[3].isShow" class="min-w-[350px]">
              <span>
                {{
                  invitation?.client
                    ? `${invitation.client.last_name} ${invitation.client.first_name} ${invitation.client.middle_name}`
                    : 'Нет данных'
                }}
              </span>
            </td>
            <td v-if="invitationsHead[4].isShow" class="min-w-[200px]">
              <span>
                {{
                  invitation.client_participate_date
                    ? invitation.client_participate_date.split('T')[0]
                    : 'Нет данных'
                }}
              </span>
            </td>
            <td v-if="invitationsHead[5].isShow" class="min-w-[200px]">
              <p
                class="text-center py-0.5 rounded-[10px] text-xs font-medium"
                :class="{
                  'bg-yellow-200 text-yellow-800':
                    invitation.status.name === 'ACTIVE',
                  'bg-gray-200 text-gray-800':
                    invitation.status.name === 'INACTIVE',
                  'bg-green-200 text-green-800':
                    invitation.status.name === 'VALID',
                  'bg-red-200 text-red-800':
                    invitation.status.name === 'INVALID',
                }"
              >
                {{
                  invitation.status
                    ? getStatusText(invitation.status.name)
                    : 'Нет данных'
                }}
              </p>
            </td>
            <td>
              <div class="flex items-center gap-[18px]">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#5E6470"
                  @click="showDeleteInvitation(invitation)"
                  v-if="$checkPermission(183)">
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
        <AddModal key="add" v-if="isShowAddInvitation" />
        <EditModal
          :activeInvitation="activeInvitation"
          key="edit"
          v-if="isShowEditInvitation"
        />
        <DeleteModal
          :activeInvitation="activeInvitation"
          :activePage="filter.page"
          v-if="isShowDeleteInvitation"
          key="delete"
        />
      </transition-group>
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
import DeleteModal from './modals/delete.vue'
import Input from '@/components/ui/inputs/default.vue'

export default {
  name: 'invitationsComponent',
  head: {
    title: 'Купоны',
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
    DeleteModal,
    Input,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.invitation.isLoading,
      invitations: (state) => state.invitation.invitations,
      count: (state) => state.invitation.count,
      subregions: (state) => state.subregion.subregions,
      groups: (state) => state.group.groups,
      subcities: (state) => state.subcity.subcities,
      suborganizations: (state) => state.suborganization.suborganizations,
      isShowAddInvitation: (state) => state.invitation.isShowAddInvitation,
      isShowEditInvitation: (state) => state.invitation.isShowEditInvitation,
      isShowDeleteInvitation: (state) =>
        state.invitation.isShowDeleteInvitation,
    }),
  },
  data() {
    return {
      activeInvitation: null,
      invitationsHead: [
        {
          id: 1,
          name: 'ID купона',
          isShow: true,
        },
        {
          id: 2,
          name: 'Организация',
          isShow: true,
        },
        {
          id: 3,
          name: 'Первичный респондент',
          isShow: true,
        },
        {
          id: 4,
          name: 'Респондент',
          isShow: true,
        },
        {
          id: 5,
          name: 'Дата участие в SNS',
          isShow: true,
        },
        {
          id: 6,
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
          value: 2,
        },
        {
          id: 2,
          name: 'Действительный',
          value: 3,
        },
        {
          id: 2,
          name: 'Недействительный',
          value: 4,
        },
      ],
    }
  },
  methods: {
    ...mapMutations({
      showAddInvitation: 'invitation/SHOW_ADDINVITATION',
      SHOW_EDITINVITATION: 'invitation/SHOW_EDITINVITATION',
      show_delete_invitation: 'invitation/SHOW_DELETEINVITATION',
      setSearch: 'invitation/SET_SEARCH',
      show_editColumns: 'client/SHOW_EDITCOLUMNS',
      set_loading: 'invitation/SET_LOADING'
    }),
    ...mapActions({
      getInvitations: 'invitation/getInvitations',
      get_subregions: 'subregion/get_subregions',
      get_groups: 'group/get_groups',
      get_subcities: 'subcity/get_subcities',
      get_suborganizations: 'suborganization/get_suborganizations',
    }),
    async clickFilter() {
      await this.getInvitations(this.filter)
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
      await this.getInvitations(this.filter)
    },
    showEditInvitation(item) {
      this.activeInvitation = item
      this.SHOW_EDITINVITATION(true)
    },
    showDeleteInvitation(invitation) {
      this.activeInvitation = invitation
      this.show_delete_invitation(true)
    },
    async changePage(page) {
      this.filter.page = page
      await this.getInvitations(this.filter)
    },
    getStatusText(status) {
      switch (status) {
        case 'ACTIVE':
          return 'Активный'
        case 'INACTIVE':
          return 'Не активный'
        case 'VALID':
          return 'Действителен'
        case 'INVALID':
          return 'Не действителен'
        default:
          return 'Нет данных'
      }
    },
  },
  async mounted() {
    if(this.$checkPermission(184)) {
      this.isShowTable = true
      await this.get_subregions()
      await this.get_groups()
      await this.get_subcities()
      await this.get_suborganizations()
      await this.getInvitations(this.filter)
    } else this.$router.back(-1)
  },
  beforeDestroy() {
    this.set_loading(true)
  }
}
</script>
