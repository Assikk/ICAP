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
          <Button @click="$router.push('/clients/add')"
          v-if="$checkPermission(205)">
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
        :head="clientsHead"
        :isLoading="isLoading"
        :count="count"
        :style="{ width: `${$refs.test.offsetWidth}px` }"
        @changePage="changePage"
      >
        <template #search>
          <td v-if="clientsHead[0].isShow">
            <Search placeholder="Поиск по УИК" v-model="filter.uik" />
          </td>
          <td v-if="clientsHead[1].isShow">
            <Search placeholder="Поиск по ФИО" v-model="filter.name" />
          </td>
          <td v-if="clientsHead[2].isShow">
            <Search placeholder="Поиск по телефону" v-model="filter.phone" />
          </td>
          <td v-if="clientsHead[3].isShow">
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
          <td v-if="clientsHead[4].isShow">
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
          <td v-if="clientsHead[5].isShow">
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
          <td v-if="clientsHead[6].isShow">
            <input
              type="date"
              class="px-3 py-2 border border-[#D1D5DB] outline-none rounded-md text-xs text-[#6B7280] bg-transparent"
              v-model="filter.participation_date"
            />
          </td>
          <td v-if="clientsHead[7].isShow">
            <Select
              gray
              placeholder="Все статусы"
              id="statusList"
              class="w-40"
              :list="statusList"
              valueList="value"
              textList="name"
              v-model="filter.screening"
            />
          </td>
          <td></td>
        </template>
        <template #body>
          <tr v-for="client in clients" :key="client.id">
            <td v-if="clientsHead[0].isShow" class="min-w-[200px]">
              <span>
                {{ client.uik }}
              </span>
            </td>
            <td v-if="clientsHead[1].isShow" class="min-w-[300px]">
              <span>
                {{ client.full_name }}
              </span>
            </td>
            <td v-if="clientsHead[2].isShow" class="min-w-[220px]">
              <span>
                {{ client?.phone }}
              </span>
            </td>
            <td v-if="clientsHead[3].isShow" class="min-w-[200px]">
              <span>
                {{ client.region?.name }}
              </span>
            </td>
            <td v-if="clientsHead[4].isShow" class="min-w-[200px]">
              <span>
                {{ client.city?.name }}
              </span>
            </td>
            <td v-if="clientsHead[5].isShow" class="min-w-[200px]">
              <span>
                {{ client.organization?.name }}
              </span>
            </td>
            <td v-if="clientsHead[6].isShow" class="min-w-[200px]">
              <span>
                {{ client.participation_date }}
              </span>
            </td>
            <td v-if="clientsHead[7].isShow" class="min-w-[200px]">
              <p
                class="text-center py-0.5 rounded-[10px] text-xs font-medium"
                :class="
                  client.screening?.is_complies_requirements
                    ? 'bg-[#D1FAE5] text-[#065F46]'
                    : 'bg-[#FEE2E2] text-[#991B1B]'
                "
              >
                {{ client.screening?.is_complies_requirements ? 'Соответствует' : 'Не соответствует' }}
              </p>
            </td>
            <td>
              <div class="flex items-center gap-[18px]">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="$router.push(`/clients/${client.id}`)"
                  v-if="$checkPermission(206)">
                  <use xlink:href="#edit" />
                </svg>
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#5E6470"
                  v-if="$checkPermission(207)"
                  @click="showDeleteClient(client)">
                  <use xlink:href="#delete" />
                </svg>
              </div>
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <transition-group name="fade">
      <EditColumnsModal key="editColumns" :list="clientsHead" v-if="isShowEditColumns" />
      <DeleteModal key="delete" v-if="isShowDeleteClient" :activeClient="activeClient" :activePage="filter.page"/>
    </transition-group>
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
import EditColumnsModal from './modals/editColumns.vue'
import DeleteModal from './modals/delete.vue'
export default {
  name: 'ClientsComponent',
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
    EditColumnsModal,
    DeleteModal
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.client.isLoading,
      clients: (state) => state.client.clients,
      count: (state) => state.client.count,
      subregions: (state) => state.subregion.subregions,
      subcities: (state) => state.subcity.subcities,
      suborganizations: (state) => state.suborganization.suborganizations,
      isShowEditColumns: (state) => state.client.isShowEditColumns,
      isShowDeleteClient: state => state.client.isShowDeleteClient
    }),
  },
  data() {
    return {
      participansList: [
        {
          id: 1,
          name: 'Участник 1',
          value: 1,
        },
        {
          id: 2,
          name: 'Участник 2',
          value: 2,
        },
        {
          id: 3,
          name: 'Участник 3',
          value: 3,
        },
      ],
      clientsHead: [
        {
          id: 1,
          name: 'УИК участника',
          isShow: true,
        },
        {
          id: 2,
          name: 'ФИО',
          isShow: true,
        },
        {
          id: 3,
          name: 'Телефон',
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
          name: 'Дата регистрации',
          isShow: true,
        },
        {
          id: 8,
          name: 'Результат скрининга',
          isShow: true,
        },
        {},
      ],
      filter: {
        page: 1,
        uik: '',
        name: '',
        phone: '',
        region: '',
        city: '',
        organization: '',
        participation_date: '',
        screening: '',
        date_from: '',
        date_to: '',
      },
      isShowTable: false,
      statusList: [
        {
          id: 1,
          name: 'Соответствует',
          value: 1,
        },
        {
          id: 2,
          name: 'Не соответствует',
          value: 0,
        },
      ],
      activeClient: null
    }
  },
  methods: {
    ...mapMutations({
      show_editColumns: 'client/SHOW_EDITCOLUMNS',
      show_deleteClient: 'client/SHOW_DELETECLIENT',
      set_loading: 'client/SET_LOADING'
    }),
    ...mapActions({
      get_clients: 'client/get_clients',
      get_subregions: 'subregion/get_subregions',
      get_subcities: 'subcity/get_subcities',
      get_suborganizations: 'suborganization/get_suborganizations',
    }),
    async clickFilter() {
      await this.get_clients(this.filter)
    },
    async clearFilter() {
      this.filter = {
        page: 1,
        uik: '',
        name: '',
        phone: '',
        region: '',
        city: '',
        organization: '',
        participation_date: '',
        screening: '',
        date_from: '',
        date_to: '',
      }
      await this.get_clients(this.filter)
    },
    async changePage(page) {
      this.filter.page = page
      await this.get_clients(this.filter)
    },
    showDeleteClient(client) {
      this.activeClient = client
      this.show_deleteClient(true)
    }
  },
  async mounted() {
    this.isShowTable = true
    if(this.$checkPermission(208)) {
      await this.get_subregions()
      await this.get_subcities()
      await this.get_suborganizations()
      await this.get_clients(this.filter)
    } else this.$router.back(-1)
  },
  beforeDestroy() {
    this.set_loading(true)
  }
}
</script>
