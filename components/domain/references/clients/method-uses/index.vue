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
              Преимущественный способ употребления
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addmethoduses(true)" class="px-4">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="methodusessHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="methoduses in methodusess" :key="methoduses.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ methoduses.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditmethoduses(methoduses)"
                >
                  <use xlink:href="#edit" />
                </svg>
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#5E6470"
                  @click="showDeletemethoduses(methoduses)"
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
        <AddModal key="add" v-if="isShowAddmethoduses" />
        <EditModal
          :activeMethoduses="activeMethoduses"
          key="edit"
          v-if="isShowEditmethoduses"
        />
        <DeleteModal
          :activeMethoduses="activeMethoduses"
          v-if="isShowDeletemethoduses"
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
      isLoading: (state) => state.methoduses.isLoading,
      methodusess: (state) => state.methoduses.methodusess,
      isShowAddmethoduses: (state) => state.methoduses.isShowAddmethoduses,
      isShowEditmethoduses: (state) => state.methoduses.isShowEditmethoduses,
      isShowDeletemethoduses: (state) =>
        state.methoduses.isShowDeletemethoduses,
      count: (state) => state.methoduses.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      methodusessHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeMethoduses: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addmethoduses: 'methoduses/SHOW_ADDMETHODUSES',
      show_editmethoduses: 'methoduses/SHOW_EDITMETHODUSES',
      show_deletemethoduses: 'methoduses/SHOW_DELETEMETHODUSES',
      set_search: 'methoduses/SET_SEARCH',
    }),
    ...mapActions({
      create_methoduses: 'methoduses/create_methoduses',
      edit_methoduses: 'methoduses/edit_methoduses',
      delete_methoduses: 'methoduses/delete_methoduses',
      get_methodusess: 'methoduses/get_methodusess',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_methodusess({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updatemethodusess() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_methodusess({ page: 1 })
    },
    showEditmethoduses(item) {
      this.activeMethoduses = item
      this.show_editmethoduses(true)
    },
    async searchMethodusess() {
      await this.get_methodusess({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_methodusess({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletemethoduses(methoduses) {
      this.activeMethoduses = methoduses
      this.show_deletemethoduses(true)
    },
  },
  async mounted() {
    await this.get_methodusess({ page: 1 })
  },
}
</script>
