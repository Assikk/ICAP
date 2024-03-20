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
                >Личная информация /
              </span>
              Предпочитаемый метод связи
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addcommunication(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="communicationsHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="communication in communications" :key="communication.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ communication.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditcommunication(communication)"
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
                  @click="showDeletecommunication(communication)"
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
        <AddModal key="add" v-if="isShowAddcommunication" />
        <EditModal
          :activeCommunication="activeCommunication"
          :activePage="activePage"
          key="edit"
          v-if="isShowEditcommunication"
        />
        <DeleteModal
          :activeCommunication="activeCommunication"
          v-if="isShowDeletecommunication"
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
    title: 'Предпочитаемый метод связи'
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
      isLoading: (state) => state.communication.isLoading,
      communications: (state) => state.communication.communications,
      isShowAddcommunication: (state) =>
        state.communication.isShowAddcommunication,
      isShowEditcommunication: (state) =>
        state.communication.isShowEditcommunication,
      isShowDeletecommunication: (state) =>
        state.communication.isShowDeletecommunication,
      count: (state) => state.communication.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      communicationsHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeCommunication: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addcommunication: 'communication/SHOW_ADDCOMMUNICATION',
      show_editcommunication: 'communication/SHOW_EDITCOMMUNICATION',
      show_deletecommunication: 'communication/SHOW_DELETECOMMUNICATION',
      set_search: 'communication/SET_SEARCH',
    }),
    ...mapActions({
      create_communication: 'communication/create_communication',
      edit_communication: 'communication/edit_communication',
      delete_communication: 'communication/delete_communication',
      get_communications: 'communication/get_communications',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_communications({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updatecommunications() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_communications({ page: 1 })
    },
    showEditcommunication(item) {
      this.activeCommunication = item
      this.show_editcommunication(true)
    },
    async searchCommunications() {
      await this.get_communications({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_communications({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletecommunication(communication) {
      this.activeCommunication = communication
      this.show_deletecommunication(true)
    },
  },
  async mounted() {
    await this.get_communications({ page: 1 })
  },
}
</script>
