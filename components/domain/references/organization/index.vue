<template>
  <div>
    <div>
      <div>
        <Header />
      </div>
      <div class="mt-2 p-6">
        <div class="flex items-center p-2 bg-white rounded-lg">
          <div class="w-full">
            <Search @input="searchSuborganizations" />
          </div>
          <div class="pl-4">
            <Button @click="show_addsuborganization(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="mt-6 px-6">
        <Table
          :head="suborganizationsHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr
              v-for="suborganization in suborganizations"
              :key="suborganization.id"
            >
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ suborganization.name }}
                </span>
              </td>
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ suborganization.short_name }}
                </span>
              </td>
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ suborganization.bin }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditsuborganization(suborganization)"
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
                  @click="showDeletesuborganization(suborganization)"
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
        <AddModal key="add" v-if="isShowAddsuborganization" />
        <EditModal
          :activeSuborganization="activeSuborganization"
          key="edit"
          v-if="isShowEditsuborganization"
        />
        <DeleteModal
          :activeSuborganization="activeSuborganization"
          v-if="isShowDeletesuborganization"
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
      isLoading: (state) => state.suborganization.isLoading,
      suborganizations: (state) => state.suborganization.suborganizations,
      isShowAddsuborganization: (state) =>
        state.suborganization.isShowAddsuborganization,
      isShowEditsuborganization: (state) =>
        state.suborganization.isShowEditsuborganization,
      isShowDeletesuborganization: (state) =>
        state.suborganization.isShowDeletesuborganization,
      count: (state) => state.suborganization.count,
      search: (state) => state.suborganization.search,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      suborganizationsHead: [
        {
          id: 1,
          name: 'Полное название',
        },
        {
          id: 2,
          name: 'Сокращенное название',
        },
        {
          id: 3,
          name: 'БИН',
        },
        {
          id: 4,
          name: '',
        },
      ],
      activeSuborganization: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addsuborganization: 'suborganization/SHOW_ADDSUBORGANIZATION',
      show_editsuborganization: 'suborganization/SHOW_EDITSUBORGANIZATION',
      show_deletesuborganization: 'suborganization/SHOW_DELETESUBORGANIZATION',
      set_search: 'suborganization/SET_SEARCH',
    }),
    ...mapActions({
      get_suborganizations: 'suborganization/get_suborganizations',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_suborganizations({
        search: this.search,
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updatesuborganizations() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_suborganizations({ page: 1 })
    },
    showEditsuborganization(item) {
      this.activeSuborganization = item
      this.show_editsuborganization(true)
    },
    async searchSuborganizations() {
      await this.get_suborganizations({
        search: this.search,
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_suborganizations({
        search: this.search,
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletesuborganization(suborganization) {
      this.activeSuborganization = suborganization
      this.show_deletesuborganization(true)
    },
  },
  async mounted() {
    await this.get_suborganizations({ page: 1 })
  },
}
</script>
