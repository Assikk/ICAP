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
                >Купоны и Вознаграждения /
              </span>
              Причина невыдачи
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addreasonissue(true)" class="px-4"
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
          :head="reasonissuesHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="reasonissue in reasonissues" :key="reasonissue.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ reasonissue.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditreasonissue(reasonissue)"
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
                  @click="showDeletereasonissue(reasonissue)"
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
        <AddModal key="add" v-if="isShowAddreasonissue" />
        <EditModal
          :activeReasonissue="activeReasonissue"
          :activePage="activePage"
          key="edit"
          v-if="isShowEditreasonissue"
        />
        <DeleteModal
          :activeReasonissue="activeReasonissue"
          v-if="isShowDeletereasonissue"
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
    title: 'Причина невыдачи'
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
      isLoading: (state) => state.reasonissue.isLoading,
      reasonissues: (state) => state.reasonissue.reasonissues,
      isShowAddreasonissue: (state) => state.reasonissue.isShowAddreasonissue,
      isShowEditreasonissue: (state) => state.reasonissue.isShowEditreasonissue,
      isShowDeletereasonissue: (state) => state.reasonissue.isShowDeletereasonissue,
      count: (state) => state.reasonissue.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      reasonissuesHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeReasonissue: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addreasonissue: 'reasonissue/SHOW_ADDREASONISSUE',
      show_editreasonissue: 'reasonissue/SHOW_EDITREASONISSUE',
      show_deletereasonissue: 'reasonissue/SHOW_DELETEREASONISSUE',
      set_search: 'reasonissue/SET_SEARCH',
    }),
    ...mapActions({
      create_reasonissue: 'reasonissue/create_reasonissue',
      edit_reasonissue: 'reasonissue/edit_reasonissue',
      delete_reasonissue: 'reasonissue/delete_reasonissue',
      get_reasonissues: 'reasonissue/get_reasonissues',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_reasonissues({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updatereasonissues() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_reasonissues({ page: 1 })
    },
    showEditreasonissue(item) {
      this.activeReasonissue = item
      this.show_editreasonissue(true)
    },
    async searchReasonissues() {
      await this.get_reasonissues({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_reasonissues({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletereasonissue(reasonissue) {
      this.activeReasonissue = reasonissue
      this.show_deletereasonissue(true)
    },
  },
  async mounted() {
    await this.get_reasonissues({ page: 1 })
  },
}
</script>
