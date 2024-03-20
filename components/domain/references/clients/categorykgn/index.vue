<template>
  <div>
    <div>
      <div>
        <Header />
      </div>
      <div class="mt-2 p-6">
        <div class="flex items-center">
          <div class="w-full">
            <p>
              <span
                class="cursor-pointer hover:text-[#0A7194]"
                @click="$router.push('/references/clients')"
                >Категория клиента /
              </span>
              Категория КГН
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addcategorykgn(true)" class="px-4"
            v-if="$checkPermission(197)">
              <template #prev-icon>
                <svg width="16" height="16" fill="none" stroke="#fff">
                  <use xlink:href="#plus" />
                </svg>
              </template>
              Добавить
            </Button>
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="categorykgnsHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="categorykgn in categorykgns" :key="categorykgn.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ categorykgn.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px]">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditcategorykgn(categorykgn)"
                  v-if="$checkPermission(198)"
                >
                  <use xlink:href="#edit" />
                </svg>
                <!-- <svg
                  v-if="categorykgn.id !== 4 && $checkPermission(199)"
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#5E6470"
                  @click="showDeletecategorykgn(categorykgn)"
                >
                  <use xlink:href="#delete" />
                </svg>
                <div class="w-5 h-5" v-else/> -->
              </td>
            </tr>
          </template>
        </Table>
      </div>
    </div>
    <div>
      <transition-group name="fade">
        <AddModal key="add" v-if="isShowAddcategorykgn" />
        <EditModal
          :activeCategorykgn="activeCategorykgn"
          :activePage="activePage"
          key="edit"
          v-if="isShowEditcategorykgn"
        />
        <DeleteModal
          :activeCategorykgn="activeCategorykgn"
          v-if="isShowDeletecategorykgn"
          key="delete"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Header from '@/components/ui/header.vue'
import Table from '@/components/ui/table.vue'
import Button from '@/components/ui/buttons/default.vue'
import AddModal from './modals/add.vue'
import EditModal from './modals/edit.vue'
import DeleteModal from './modals/delete.vue'

export default {
  head: {
    title: 'Категория КГН'
  },
  components: {
    Header,
    AddModal,
    EditModal,
    DeleteModal,
    Table,
    Button,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.categorykgn.isLoading,
      categorykgns: (state) => state.categorykgn.categorykgns,
      isShowAddcategorykgn: (state) => state.categorykgn.isShowAddcategorykgn,
      isShowEditcategorykgn: (state) => state.categorykgn.isShowEditcategorykgn,
      isShowDeletecategorykgn: (state) => state.categorykgn.isShowDeletecategorykgn,
      count: (state) => state.categorykgn.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      categorykgnsHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeCategorykgn: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addcategorykgn: 'categorykgn/SHOW_ADDCATEGORYKGN',
      show_editcategorykgn: 'categorykgn/SHOW_EDITCATEGORYKGN',
      show_deletecategorykgn: 'categorykgn/SHOW_DELETECATEGORYKGN',
      set_search: 'categorykgn/SET_SEARCH',
    }),
    ...mapActions({
      create_categorykgn: 'categorykgn/create_categorykgn',
      edit_categorykgn: 'categorykgn/edit_categorykgn',
      delete_categorykgn: 'categorykgn/delete_categorykgn',
      get_categorykgns: 'categorykgn/get_categorykgns',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_categorykgns({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updatecategorykgns() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_categorykgns({ page: 1 })
    },
    showEditcategorykgn(item) {
      this.activeCategorykgn = item
      this.show_editcategorykgn(true)
    },
    async searchCategorykgns() {
      await this.get_categorykgns({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_categorykgns({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletecategorykgn(categorykgn) {
      this.activeCategorykgn = categorykgn
      this.show_deletecategorykgn(true)
    },
  },
  async mounted() {
    await this.get_categorykgns({ page: 1 })
  },
}
</script>
