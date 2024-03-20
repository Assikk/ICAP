<template>
  <div>
    <div>
      <div>
        <Header />
      </div>
      <div class="mt-2 p-6">
        <div class="flex items-center p-2 bg-white rounded-lg">
          <div class="w-full">
            <Search @input="searchSubregions" />
          </div>
          <div class="pl-4">
            <Button @click="show_addsubregion(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="mt-6 px-6">
        <Table
          :head="subregionsHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="subregion in subregions" :key="subregion.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ subregion.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditsubregion(subregion)"
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
                  @click="showDeletesubregion(subregion)"
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
        <AddModal key="add" v-if="isShowAddsubregion" />
        <EditModal
          :activeSubregion="activeSubregion"
          key="edit"
          v-if="isShowEditsubregion"
        />
        <DeleteModal
          :activeSubregion="activeSubregion"
          v-if="isShowDeletesubregion"
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
      isLoading: (state) => state.subregion.isLoading,
      subregions: (state) => state.subregion.subregions,
      isShowAddsubregion: (state) => state.subregion.isShowAddsubregion,
      isShowEditsubregion: (state) => state.subregion.isShowEditsubregion,
      isShowDeletesubregion: (state) => state.subregion.isShowDeletesubregion,
      count: (state) => state.subregion.count,
      search: (state) => state.subregion.search,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      subregionsHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeSubregion: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addsubregion: 'subregion/SHOW_ADDSUBREGION',
      show_editsubregion: 'subregion/SHOW_EDITSUBREGION',
      show_deletesubregion: 'subregion/SHOW_DELETESUBREGION',
      set_search: 'subregion/SET_SEARCH',
    }),
    ...mapActions({
      get_subregions: 'subregion/get_subregions',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_subregions({
        search: this.search,
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updatesubregions() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_subregions({ page: 1 })
    },
    showEditsubregion(item) {
      this.activeSubregion = item
      this.show_editsubregion(true)
    },
    async searchSubregions() {
      await this.get_subregions({
        search: this.search,
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_subregions({
        search: this.search,
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletesubregion(subregion) {
      this.activeSubregion = subregion
      this.show_deletesubregion(true)
    },
  },
  async mounted() {
    await this.get_subregions({ page: 1 })
  },
}
</script>
