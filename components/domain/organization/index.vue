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
          <Button @click="showAddOrganization(true)"
          v-if="$checkPermission(189)">
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
        :head="organizationsHead"
        :isLoading="isLoading"
        :count="count"
        :style="{ width: `${$refs.test.offsetWidth}px` }"
        @changePage="changePage"
      >
        <template #search>
          <td v-if="organizationsHead[0].isShow">
            <Search
              placeholder="Поиск по названию"
              v-model="filter.full_name"
            />
          </td>
          <td v-if="organizationsHead[1].isShow">
            <Search
              placeholder="Поиск по сокр. назв."
              v-model="filter.short_name"
            />
          </td>
          <td v-if="organizationsHead[2].isShow">
            <Search placeholder="Поиск по БИН" v-model="filter.bin" />
          </td>
          <td v-if="organizationsHead[3].isShow">
            <Search
              placeholder="Поиск по конт. лицу"
              v-model="filter.contact_name"
            />
          </td>
          <td v-if="organizationsHead[4].isShow">
            <Search
              placeholder="Поиск по номер тел."
              v-model="filter.contact_phone"
            />
          </td>
          <td v-if="organizationsHead[5].isShow">
            <Search
              placeholder="Поиск по должности"
              v-model="filter.contact_designation"
            />
          </td>
          <td v-if="organizationsHead[6].isShow">
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
          <td v-if="organizationsHead[7].isShow">
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
          <td></td>
        </template>
        <template #body>
          <tr v-for="organization in organizations" :key="organization.id">
            <td v-if="organizationsHead[0].isShow" class="min-w-[220px]">
              <span>
                {{ organization?.organization_name.name }}
              </span>
            </td>
            <td v-if="organizationsHead[1].isShow" class="min-w-[230px]">
              <span>
                {{ organization?.organization_name.short_name }}
              </span>
            </td>
            <td v-if="organizationsHead[2].isShow" class="min-w-[180px]">
              <span>
                {{ organization?.organization_name.bin }}
              </span>
            </td>
            <td v-if="organizationsHead[3].isShow" class="min-w-[230px]">
              <span>
                {{ organization?.contact_last_name }}
                {{ organization?.contact_first_name }}
                {{ organization?.contact_middle_name }}
              </span>
            </td>
            <td v-if="organizationsHead[4].isShow" class="min-w-[230px]">
              <span>
                {{ organization?.contact_phone }}
              </span>
            </td>
            <td v-if="organizationsHead[5].isShow" class="min-w-[220px]">
              <span>
                {{ organization?.contact_designation }}
              </span>
            </td>
            <td v-if="organizationsHead[6].isShow" class="min-w-[200px]">
              <span>
                {{ organization?.region.name }}
              </span>
            </td>
            <td v-if="organizationsHead[7].isShow" class="min-w-[200px]">
              <span>
                {{ organization?.city.name }}
              </span>
            </td>
            <td>
              <div class="flex items-center gap-[18px]">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditOrganization(organization)"
                  v-if="$checkPermission(190)"
                >
                  <use xlink:href="#edit" />
                </svg>
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#5E6470"
                  v-if="$checkPermission(191)"
                  @click="show_deleteOrganization(organization)">
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
        <AddModal key="add" v-if="isShowAddOrganization" />
        <EditModal
          :activeOrganization="activeOrganization"
          :activePage="filter.page"
          key="edit"
          v-if="isShowEditOrganization"
        />
        <DeleteModal
          :activeOrganization="activeOrganization"
          :activePage="filter.page"
          v-if="isShowDeleteOrganization"
          key="delete"
        />
      </transition-group>
      <transition name="fade">
        <EditColumnsModal :list="organizationsHead" v-if="isShowEditColumns" />
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
import DeleteModal from './modals/delete.vue'
import Input from '@/components/ui/inputs/default.vue'
import EditColumnsModal from './modals/editColumns.vue'

export default {
  name: 'OrganizationsComponent',
  head: {
    title: 'Организации',
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
    EditColumnsModal,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.organization.isLoading,
      organizations: (state) => state.organization.organizations,
      count: (state) => state.organization.count,
      subregions: (state) => state.subregion.subregions,
      subcities: (state) => state.subcity.subcities,
      isShowAddOrganization: (state) => state.organization.isShowAddOrganization,
      isShowEditOrganization: (state) => state.organization.isShowEditOrganization,
      isShowDeleteOrganization: (state) => state.organization.isShowDeleteOrganization,
      search: (state) => state.organization.search,
      isShowEditColumns: (state) => state.client.isShowEditColumns,
    }),
  },
  data() {
    return {
      organizationsHead: [
        {
          id: 1,
          name: 'Полное название',
          isShow: true,
        },
        {
          id: 2,
          name: 'Сокращенное название',
          isShow: true,
        },
        {
          id: 3,
          name: 'БИН',
          isShow: true,
        },
        {
          id: 4,
          name: 'Контактное лицо',
          isShow: true,
        },
        {
          id: 5,
          name: 'Номер телефона',
          isShow: true,
        },
        {
          id: 6,
          name: 'Должность',
          isShow: true,
        },
        {
          id: 7,
          name: 'Область',
          isShow: true,
        },
        {
          id: 8,
          name: 'Город',
          isShow: true,
        },
        {},
      ],
      filter: {
        page: 1,
        organization_name: '',
        short_name: '',
        bin: '',
        contact_first_name: '',
        contact_last_name: '',
        contact_last_name: '',
        contact_phone: '',
        contact_designation: '',
        region: '',
        city: '',
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
  validations() {
    return {
      form: {
        contact_first_name: {isText: (value) => /^[a-zA-Zа-яА-Я]+$/.test(value)},
        contact_last_name: {isText: (value) => /^[a-zA-Zа-яА-Я]+$/.test(value)},
        contact_middle_name: {isText: (value) => /^[a-zA-Zа-яА-Я]+$/.test(value)}
      },
    }
  },
  methods: {
    ...mapMutations({
      showAddOrganization: 'organization/SHOW_ADDORGANIZATION',
      SHOW_EDITORGANIZATION: 'organization/SHOW_EDITORGANIZATION',
      showDeleteOrganization: 'organization/SHOW_DELETEORGANIZATION',
      show_editColumns: 'client/SHOW_EDITCOLUMNS',
      set_loading: 'organization/SET_LOADING'
    }),
    ...mapActions({
      getOrganizations: 'organization/getOrganizations',
      get_subregions: 'subregion/get_subregions',
      get_subcities: 'subcity/get_subcities',
    }),
    async clickFilter() {
      await this.getOrganizations(this.filter)
    },
    async clearFilter() {
      this.filter = {
        page: 1,
        organization_name: '',
        short_name: '',
        bin: '',
        contact_first_name: '',
        contact_last_name: '',
        contact_last_name: '',
        contact_phone: '',
        contact_designation: '',
        region: '',
        city: '',
        date_from: '',
        date_to: '',
      }
      await this.getOrganizations(this.filter)
    },
    showEditOrganization(item) {
      this.activeOrganization = item
      this.SHOW_EDITORGANIZATION(true)
    },
    show_deleteOrganization(organization) {
      this.activeOrganization = organization
      this.showDeleteOrganization(true)
    },
    async changePage(page) {
      this.filter.page = page
      await this.getOrganizations(this.filter)
    },
  },
  async mounted() {
    if(this.$checkPermission(192)) {
      this.isShowTable = true
      await this.get_subregions()
      await this.get_subcities()
      await this.getOrganizations(this.filter)
    } else this.$router.back(-1)
  },
  beforeDestroy() {
    this.set_loading(true)
  }
}
</script>
