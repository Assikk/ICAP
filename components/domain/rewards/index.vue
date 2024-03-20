<template>
  <div>
    <Header />
    <div class="p-6 flex flex-col gap-6">
      <div ref="rewardTest" class="bg-white rounded-md p-4 flex justify-between gap-4">
        <div class="flex gap-4">
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium text-[#64748B]">Период с</p>
            <Date v-model="filter.date_from" />
            <p class="text-sm font-medium text-[#64748B]">по</p>
            <Date v-model="filter.date_to" />
          </div>
          <Button blue @click="get_rewards(filter)">
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
          <Button @click="show_addReward(true)"
          v-if="$checkPermission(181)">
            <template #prev-icon>
              <svg width="16" height="16" fill="none" stroke="#fff">
                <use xlink:href="#plus" />
              </svg>
            </template>
            Добавить
          </Button>
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
      <Table :head="rewardsHead" :isLoading="isLoading" :count="count"
      v-if="isShowTable"
      class="overflow-x-auto scrollbar"
      :style="{ width: `${$refs.rewardTest.offsetWidth}px` }"
      @changePage="changePage">
        <template #search>
          <td>
            <Search placeholder="Поиск" v-model="filter.id"/>
          </td>
          <td>
            <Search placeholder="Поиск" v-model="filter.coupon"/>
          </td>
          <td>
            <span>
              <Select gray id="organizationFilter" :list="organizations" textList="name" valueList="id" placeholder="Все" v-model="filter.organization"/>
            </span>
          </td>
          <td>
            <span>
              <Select gray id="reason_issue" :list="reasonIssueList" textList="name" valueList="id" placeholder="Все" v-model="filter.issuance_reason"/>
            </span>
          </td>
          <td>
            <span>
              <Search placeholder="Поиск по клиенту" v-model="filter.client"/>
            </span>
          </td>
          <td>
            <span>
              <Date xs v-model="filter.notif_date"/>
            </span>
          </td>
          <td>
            <span>
              <Date xs v-model="filter.issuance_date"/>
            </span>
          </td>
          <td>
            <span>
              <Select gray id="statusList" :list="statusList" textList="name" valueList="id" placeholder="Все" v-model="filter.status"/>
            </span>
          </td>
          <td/>
        </template>
        <template #body>
          <tr v-for="reward in rewards" :key="reward.id" class="h-[77px]">
            <td class="min-w-[200px]">
              <span>
                {{reward.id}}
              </span>
            </td>
            <td class="min-w-[200px]">
              <span>
                {{reward.coupon ? reward.coupon : ''}}
              </span>
            </td>
            <td class="min-w-[200px]">
              <span>
                {{reward.organization.name}}
              </span>
            </td>
            <td class="min-w-[200px]">
              <span>
                {{reward.issuance_reason?.id == 1 ? 'Тест' : reward.issuance_reason?.id == 2 ? 'Привлечение' :  ''}}
              </span>
            </td>
            <td class="min-w-[300px]">
              <div v-if="reward.client" class="flex flex-col gap-1">
                <span>
                  {{reward.client.last_name}} {{reward.client.first_name}} {{reward.client.middle_name}}
                </span>
                <span class="text-[#6B7280]">
                  {{reward.client.phone ? reward.client.phone : ''}}
                </span>
              </div>
            </td>
            <td class="min-w-[200px]">
              <span>
                {{reward.notif_date}}
              </span>
            </td>
            <td class="min-w-[200px]">
              <span>
                {{reward.issuance_date}}
              </span>
            </td>
            <td class="min-w-[200px]">
              <p class="text-center py-0.5 rounded-[10px] text-xs font-medium"
              :class="reward.status.id == 1 ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#FEE2E2] text-[#991B1B]'">
                {{reward.status.id == 1 ? 'Выдан' : 'Не выдан'}}
              </p>
            </td>
            <td>
              <div class="flex items-center gap-[18px]">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditReward(reward)"
                  v-if="$checkPermission(182)">
                  <use xlink:href="#edit" />
                </svg>
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#5E6470"
                  @click="showDeleteReward(reward)"
                  v-if="$checkPermission(183)">
                  <use xlink:href="#delete" />
                </svg>
              </div>
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <transition-group name="fade">
      <AddModal key="add" v-if="isShowAddReward"/>
      <EditModal key="edit" v-if="isShowEditReward" :activeReward="activeReward" :activePage="filter.page"/>
      <DeleteModal key="delete" v-if="isShowDeleteModal" :activeReward="activeReward" :activePage="filter.page"/>
    </transition-group>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Header from '@/components/ui/header.vue'
import Date from '@/components/ui/inputs/date.vue'
import Button from '@/components/ui/buttons/default.vue'
import Table from '@/components/ui/table.vue'
import Search from '@/components/ui/inputs/search.vue'
import Select from '@/components/ui/selects/primary.vue'
import AddModal from './modals/add.vue'
import EditModal from './modals/edit.vue'
import DeleteModal from './modals/delete.vue'
export default {
  name: 'RewardsComponent',
  head: {
    title: 'Вознаграждения',
  },
  components: {
    Header,
    Date,
    Button,
    Table,
    Search,
    Select,
    AddModal,
    EditModal,
    DeleteModal
  },
  computed: {
    ...mapState({
      rewards: state => state.reward.rewards,
      count: state => state.reward.count,
      isLoading: state => state.reward.isLoading,
      organizations: state => state.organization.organizations,
      isShowAddReward: state => state.reward.isShowAddReward,
      isShowEditReward: state => state.reward.isShowEditReward,
      isShowDeleteModal: state => state.reward.isShowDeleteModal
    })
  },
  data() {
    return {
      filter: {
        date_from: null,
        date_to: null,
        page: 1,
        id: null,
        coupon: null,
        organization: null,
        issuance_reason: null,
        client: null,
        notif_date: null,
        issuance_date: null,
        status: null
      },
      rewardsHead: [
        {
          id: 1,
          name: 'ID вознаграждения'
        },
        {
          id: 2,
          name: 'ID купона'
        },
        {
          id: 3,
          name: 'Организация'
        },
        {
          id: 4,
          name: 'Причина выдачи'
        },
        {
          id: 5,
          name: 'Клиент'
        },
        {
          id: 6,
          name: 'Дата извещения'
        },
        {
          id: 7,
          name: 'Дата получания'
        },
        {
          id: 8,
          name: 'Статус'
        },
        {
          id: 9,
          name: ''
        }
      ],
      isShowTable: false,
      reasonIssueList: [
        {
          id: 1,
          name: 'Тест'
        },
        {
          id: 2,
          name: 'Привлечение'
        }
      ],
      statusList: [
        {
          id: 1,
          name: 'Выдан'
        },
        {
          id: 2,
          name: 'Не выдан'
        }
      ],
      activeReward: null
    }
  },
  methods: {
    ...mapMutations({
      show_addReward: 'reward/SHOW_ADDREWARD',
      show_editReward: 'reward/SHOW_EDITREWARD',
      show_deleteReward: 'reward/SHOW_DELETEREWARD',
      set_loading: 'loading/SET_LOADING'
    }),
    ...mapActions({
      get_rewards: 'reward/get_rewards',
      get_organizations: 'organization/getOrganizations'
    }),
    async clearFilter() {
      this.filter = {
        date_from: null,
        date_to: null,
        page: 1,
        id: null,
        coupon: null,
        organization: null,
        issuance_reason: null,
        client: null,
        notif_date: null,
        issuance_date: null,
        status: null
      }
      await this.get_rewards(this.filter)
    },
    async changePage(page) {
      this.filter.page = page
      await this.get_rewards(this.filter)
    },
    showEditReward(reward) {
      this.activeReward = reward
      this.show_editReward(true)
    },
    async showDeleteReward(reward) {
      this.activeReward = reward
      this.show_deleteReward(true)
    }
  },
  async mounted() {
    if(this.$checkPermission(184)) {
      this.isShowTable = true
      await this.get_organizations()
      await this.get_rewards(this.filter)
    } else this.$router.back(-1)
  },
  beforeDestroy() {
    this.set_loading(true)
  }
}
</script>
