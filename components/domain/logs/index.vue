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
          <Button outlined>
            Экспорт
            <template #next-icon>
              <svg width="16" height="16" fill="#0A7194">
                <use xlink:href="#excel"/>
              </svg>
            </template>
          </Button>
        </div>
      </div>
      <Table
        v-if="isShowTable"
        class="overflow-x-auto"
        :head="logsHead"
        :isLoading="isLoading"
        :count="count"
        :style="{ width: `${$refs.test.offsetWidth}px` }"
        @changePage="changePage"
      >
        <template #search>
          <td v-if="logsHead[0].isShow">
            <Search placeholder="Поиск по ФИО" v-model="filter.user" />
          </td>
          <td v-if="logsHead[1].isShow">
            <Select
              gray
              placeholder="Все действия"
              id="action"
              :list="actionList"
              valueList="value"
              textList="name"
              v-model="filter.action"
              iconLocation="97"
            />
          </td>
          <td v-if="logsHead[2].isShow">
            <Select
              gray
              placeholder="Все роли"
              id="group"
              :list="groups"
              valueList="id"
              textList="name"
              v-model="filter.group"
            />
          </td>
          <td v-if="logsHead[3].isShow">
            <Date xs v-model="filter.date"/>
          </td>
        </template>
        <template #body>
          <tr v-for="log in logs" :key="log.id">
            <td v-if="logsHead[0].isShow">
              <span v-if="log.actor">
                {{
                  log.actor.first_name && log.actor.last_name
                    ? `${log.actor.first_name} ${log.actor.last_name}`
                    : 'Нет данных'
                }}
              </span>
              <span v-else> Нет данных </span>
            </td>
            <td v-if="logsHead[1].isShow">
              <span>
                {{ getActionText(log.action) }} {{ log.object_repr }}
              </span>
            </td>
            <td v-if="logsHead[2].isShow" class="w-[250px]">
              <span>
                {{ log.groups?.name ? log.groups.name[0] : 'Нет роли' }}
              </span>
            </td>
            <td v-if="logsHead[3].isShow" class="w-[250px]">
              <span>
                {{ log.timestamp.split('T')[0] }}
              </span>
            </td>
          </tr>
        </template>
      </Table>
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
export default {
  name: 'LogsComponent',
  head: {
    title: 'Клиенты',
  },
  components: {
    Header,
    Date,
    Button,
    Select,
    Table,
    Search,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.log.isLoading,
      logs: (state) => state.log.logs,
      count: (state) => state.log.count,
      subregions: (state) => state.subregion.subregions,
      subcities: (state) => state.subcity.subcities,
      suborganizations: (state) => state.suborganization.suborganizations,
      groups: (state) => state.group.groups,
    }),
  },
  data() {
    return {
      logsHead: [
        {
          id: 1,
          name: 'Пользователь',
          isShow: true,
        },
        {
          id: 2,
          name: 'Действие',
          isShow: true,
        },
        {
          id: 3,
          name: 'Роль',
          isShow: true,
        },
        {
          id: 4,
          name: 'Дата',
          isShow: true,
        },
      ],
      filter: {
        page: 1,
        first_name: '',
        last_name: '',
        action: '',
        groups: '',
        timestamp: '',
        date_from: '',
        date_to: '',
      },
      isShowTable: false,
      actionList: [
        {
          id: 1,
          value: 0,
          name: 'Создал '
        },
        {
          id: 2,
          value: 1,
          name: 'Обновил '
        },
        {
          id: 3,
          value: 2,
          name: 'Удалил '
        },
        {
          id: 4,
          value: 3,
          name: 'Доступ '
        },
      ]
    }
  },
  methods: {
    ...mapMutations({
      set_loading: 'log/SET_LOADING'
    }),
    ...mapActions({
      get_logs: 'log/get_logs',
      get_subregions: 'subregion/get_subregions',
      get_subcities: 'subcity/get_subcities',
      get_groups: 'group/get_groups',
      get_suborganizations: 'suborganization/get_suborganizations',
    }),
    getActionText(action) {
      switch (action) {
        case 'ACCESS':
          return 'Доступ '
        case 'UPDATE':
          return 'Обновил '
        case 'CREATE':
          return 'Создал '
        case 'DELETE':
          return 'Удалил '
        default:
          return action
      }
    },
    async clickFilter() {
      await this.get_logs(this.filter)
    },
    async clearFilter() {
      this.filter = {
        page: 1,
        first_name: '',
        last_name: '',
        action: '',
        groups: '',
        timestamp: '',
        date_from: '',
        date_to: '',
      }
      await this.get_logs(this.filter)
    },
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_logs({
        search: this.search,
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.filter.page = page
      await this.get_logs(this.filter)
    },
  },
  async mounted() {
    if(this.$checkPermission(204)) {
      this.isShowTable = true
      await this.get_subregions()
      await this.get_subcities()
      await this.get_groups()
      await this.get_suborganizations()
      await this.get_logs(this.filter)
    } else this.$router.back(-1)
  },
  beforeDestroy() {
    this.set_loading(true)
  }
}
</script>
