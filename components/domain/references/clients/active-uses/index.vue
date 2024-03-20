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
                >Скрининг /
              </span>
              Активно употребляет наркотики
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addactiveuses(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="activeusessHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="activeuses in activeusess" :key="activeuses.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ activeuses.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditactiveuses(activeuses)"
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
                  @click="showDeleteactiveuses(activeuses)"
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
        <AddModal key="add" v-if="isShowAddactiveuses" />
        <EditModal
          :activeActiveuses="activeActiveuses"
          key="edit"
          v-if="isShowEditactiveuses"
        />
        <DeleteModal
          :activeActiveuses="activeActiveuses"
          v-if="isShowDeleteactiveuses"
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
  layout: 'sidebar',
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
      isLoading: (state) => state.activeuses.isLoading,
      activeusess: (state) => state.activeuses.activeusess,
      isShowAddactiveuses: (state) => state.activeuses.isShowAddactiveuses,
      isShowEditactiveuses: (state) => state.activeuses.isShowEditactiveuses,
      isShowDeleteactiveuses: (state) =>
        state.activeuses.isShowDeleteactiveuses,
      count: (state) => state.activeuses.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      activeusessHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeActiveuses: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addactiveuses: 'activeuses/SHOW_ADDACTIVEUSES',
      show_editactiveuses: 'activeuses/SHOW_EDITACTIVEUSES',
      show_deleteactiveuses: 'activeuses/SHOW_DELETEACTIVEUSES',
      set_search: 'activeuses/SET_SEARCH',
    }),
    ...mapActions({
      create_activeuses: 'activeuses/create_activeuses',
      edit_activeuses: 'activeuses/edit_activeuses',
      delete_activeuses: 'activeuses/delete_activeuses',
      get_activeusess: 'activeuses/get_activeusess',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_activeusess({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updateactiveusess() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_activeusess({ page: 1 })
    },
    showEditactiveuses(item) {
      this.activeActiveuses = item
      this.show_editactiveuses(true)
    },
    async searchActiveusess() {
      await this.get_activeusess({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_activeusess({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeleteactiveuses(activeuses) {
      this.activeActiveuses = activeuses
      this.show_deleteactiveuses(true)
    },
  },
  async mounted() {
    await this.get_activeusess({ page: 1 })
  },
}
</script>
