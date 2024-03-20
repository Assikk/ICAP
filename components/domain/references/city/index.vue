<template>
  <div>
    <div>
      <div>
        <Header />
      </div>
      <div class="mt-2 p-6">
        <div class="flex items-center p-2 bg-white rounded-lg">
          <div class="w-full">
            <Search @input="searchSubcity" />
          </div>
          <div class="pl-4">
            <Button @click="show_addsubcity(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="mt-6 px-6">
        <Table
          :head="subcitiesHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="subcity in subcities" :key="subcity.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ subcity.name_ru }}
                </span>
              </td>
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ subcity.region?.name }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditsubcity(subcity)"
                  v-if="$checkPermission(198)"
                >
                  <use xlink:href="#edit" />
                </svg>
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#5E6470"
                  @click="showDeletesubcity(subcity)"
                  v-if="$checkPermission(199)"
                >
                  <use xlink:href="#delete" />
                </svg>
              </td>
            </tr>
          </template>
        </Table>
      </div>
    </div>
    <div>
      <transition-group name="fade">
        <AddModal key="add" v-if="isShowAddsubcity" />
        <EditModal
          :activeSubcity="activeSubcity"
          key="edit"
          v-if="isShowEditsubcity"
        />
        <DeleteModal
          :activeSubcity="activeSubcity"
          v-if="isShowDeletesubcity"
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
      isLoading: (state) => state.subcity.isLoading,
      subcities: (state) => state.subcity.subcities,
      isShowAddsubcity: (state) => state.subcity.isShowAddsubcity,
      isShowEditsubcity: (state) => state.subcity.isShowEditsubcity,
      isShowDeletesubcity: (state) => state.subcity.isShowDeletesubcity,
      count: (state) => state.subcity.count,
      search: (state) => state.subcity.search,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      subcitiesHead: [
        {
          id: 1,
          name: 'Город',
        },
        {
          id: 2,
          name: 'Область',
        },
        {
          id: 3,
          name: '',
        },
      ],
      activeSubcity: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addsubcity: 'subcity/SHOW_ADDSUBCITY',
      show_editsubcity: 'subcity/SHOW_EDITSUBCITY',
      show_deletesubcity: 'subcity/SHOW_DELETESUBCITY',
      set_search: 'subcity/SET_SEARCH',
    }),
    ...mapActions({
      get_subcities: 'subcity/get_subcities',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_subcities({
        search: this.search,
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updatesubcities() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_subcities({ page: 1 })
    },
    showEditsubcity(item) {
      this.activeSubcity = item
      this.show_editsubcity(true)
    },
    async searchSubcity() {
      await this.get_subcities({
        search: this.search,
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_subcities({
        search: this.search,
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletesubcity(subcity) {
      this.activeSubcity = subcity
      this.show_deletesubcity(true)
    },
  },
  async mounted() {
    await this.get_subcities({ page: 1 })
  },
}
</script>
