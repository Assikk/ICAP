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
              Результат подтверждающего теста на ВИЧ
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addconfirmationresult(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="confirmationresultsHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr
              v-for="confirmationresult in confirmationresults"
              :key="confirmationresult.id"
            >
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ confirmationresult.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditconfirmationresult(confirmationresult)"
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
                  @click="showDeleteconfirmationresult(confirmationresult)"
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
        <AddModal key="add" v-if="isShowAddconfirmationresult" />
        <EditModal
          :activeConfirmationresult="activeConfirmationresult"
          :activePage="activePage"
          key="edit"
          v-if="isShowEditconfirmationresult"
        />
        <DeleteModal
          :activeConfirmationresult="activeConfirmationresult"
          v-if="isShowDeleteconfirmationresult"
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
    title: 'Результат подтверждающего теста на ВИЧ'
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
      isLoading: (state) => state.confirmationresult.isLoading,
      confirmationresults: (state) =>
        state.confirmationresult.confirmationresults,
      isShowAddconfirmationresult: (state) =>
        state.confirmationresult.isShowAddconfirmationresult,
      isShowEditconfirmationresult: (state) =>
        state.confirmationresult.isShowEditconfirmationresult,
      isShowDeleteconfirmationresult: (state) =>
        state.confirmationresult.isShowDeleteconfirmationresult,
      count: (state) => state.confirmationresult.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      confirmationresultsHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeConfirmationresult: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addconfirmationresult:
        'confirmationresult/SHOW_ADDCONFIRMATIONRESULT',
      show_editconfirmationresult:
        'confirmationresult/SHOW_EDITCONFIRMATIONRESULT',
      show_deleteconfirmationresult:
        'confirmationresult/SHOW_DELETECONFIRMATIONRESULT',
      set_search: 'confirmationresult/SET_SEARCH',
    }),
    ...mapActions({
      create_confirmationresult: 'confirmationresult/create_confirmationresult',
      edit_confirmationresult: 'confirmationresult/edit_confirmationresult',
      delete_confirmationresult: 'confirmationresult/delete_confirmationresult',
      get_confirmationresults: 'confirmationresult/get_confirmationresults',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_confirmationresults({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updateconfirmationresults() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_confirmationresults({ page: 1 })
    },
    showEditconfirmationresult(item) {
      this.activeConfirmationresult = item
      this.show_editconfirmationresult(true)
    },
    async searchConfirmationresults() {
      await this.get_confirmationresults({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_confirmationresults({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeleteconfirmationresult(confirmationresult) {
      this.activeConfirmationresult = confirmationresult
      this.show_deleteconfirmationresult(true)
    },
  },
  async mounted() {
    await this.get_confirmationresults({ page: 1 })
  },
}
</script>
