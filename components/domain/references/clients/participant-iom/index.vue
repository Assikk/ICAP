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
                >Профилактика /
              </span>
              Участнику выданы ИОМ
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addparticipantiom(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="participantiomsHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr
              v-for="participantiom in participantioms"
              :key="participantiom.id"
            >
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ participantiom.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditparticipantiom(participantiom)"
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
                  @click="showDeleteparticipantiom(participantiom)"
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
        <AddModal key="add" v-if="isShowAddparticipantiom" />
        <EditModal
          :activeParticipantiom="activeParticipantiom"
          key="edit"
          v-if="isShowEditparticipantiom"
        />
        <DeleteModal
          :activeParticipantiom="activeParticipantiom"
          v-if="isShowDeleteparticipantiom"
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
      isLoading: (state) => state.participantiom.isLoading,
      participantioms: (state) => state.participantiom.participantioms,
      isShowAddparticipantiom: (state) =>
        state.participantiom.isShowAddparticipantiom,
      isShowEditparticipantiom: (state) =>
        state.participantiom.isShowEditparticipantiom,
      isShowDeleteparticipantiom: (state) =>
        state.participantiom.isShowDeleteparticipantiom,
      count: (state) => state.participantiom.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      participantiomsHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeParticipantiom: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addparticipantiom: 'participantiom/SHOW_ADDPARTICIPANTIOM',
      show_editparticipantiom: 'participantiom/SHOW_EDITPARTICIPANTIOM',
      show_deleteparticipantiom: 'participantiom/SHOW_DELETEPARTICIPANTIOM',
      set_search: 'participantiom/SET_SEARCH',
    }),
    ...mapActions({
      create_participantiom: 'participantiom/create_participantiom',
      edit_participantiom: 'participantiom/edit_participantiom',
      delete_participantiom: 'participantiom/delete_participantiom',
      get_participantioms: 'participantiom/get_participantioms',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_participantioms({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updateparticipantioms() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_participantioms({ page: 1 })
    },
    showEditparticipantiom(item) {
      this.activeParticipantiom = item
      this.show_editparticipantiom(true)
    },
    async searchParticipantioms() {
      await this.get_participantioms({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_participantioms({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeleteparticipantiom(participantiom) {
      this.activeParticipantiom = participantiom
      this.show_deleteparticipantiom(true)
    },
  },
  async mounted() {
    await this.get_participantioms({ page: 1 })
  },
}
</script>
