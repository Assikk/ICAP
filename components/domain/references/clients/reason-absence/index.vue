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
                >Тестирование на ВИЧ /
              </span>
              Причина отсутствия подтверждающего теста
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addreasonabsence(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="reasonabsencesHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="reasonabsence in reasonabsences" :key="reasonabsence.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ reasonabsence.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditreasonabsence(reasonabsence)"
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
                  @click="showDeletereasonabsence(reasonabsence)"
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
        <AddModal key="add" v-if="isShowAddreasonabsence" />
        <EditModal
          :activeReasonabsence="activeReasonabsence"
          key="edit"
          v-if="isShowEditreasonabsence"
        />
        <DeleteModal
          :activeReasonabsence="activeReasonabsence"
          v-if="isShowDeletereasonabsence"
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
      isLoading: (state) => state.reasonabsence.isLoading,
      reasonabsences: (state) => state.reasonabsence.reasonabsences,
      isShowAddreasonabsence: (state) =>
        state.reasonabsence.isShowAddreasonabsence,
      isShowEditreasonabsence: (state) =>
        state.reasonabsence.isShowEditreasonabsence,
      isShowDeletereasonabsence: (state) =>
        state.reasonabsence.isShowDeletereasonabsence,
      count: (state) => state.reasonabsence.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      reasonabsencesHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeReasonabsence: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addreasonabsence: 'reasonabsence/SHOW_ADDREASONABSENCE',
      show_editreasonabsence: 'reasonabsence/SHOW_EDITREASONABSENCE',
      show_deletereasonabsence: 'reasonabsence/SHOW_DELETEREASONABSENCE',
      set_search: 'reasonabsence/SET_SEARCH',
    }),
    ...mapActions({
      create_reasonabsence: 'reasonabsence/create_reasonabsence',
      edit_reasonabsence: 'reasonabsence/edit_reasonabsence',
      delete_reasonabsence: 'reasonabsence/delete_reasonabsence',
      get_reasonabsences: 'reasonabsence/get_reasonabsences',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_reasonabsences({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updatereasonabsences() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_reasonabsences({ page: 1 })
    },
    showEditreasonabsence(item) {
      this.activeReasonabsence = item
      this.show_editreasonabsence(true)
    },
    async searchReasonabsences() {
      await this.get_reasonabsences({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_reasonabsences({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletereasonabsence(reasonabsence) {
      this.activeReasonabsence = reasonabsence
      this.show_deletereasonabsence(true)
    },
  },
  async mounted() {
    await this.get_reasonabsences({ page: 1 })
  },
}
</script>
