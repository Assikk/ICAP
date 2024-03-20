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
              Причины не взятия на АРТ
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addreasonstaking(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="reasonstakingsHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="reasonstaking in reasonstakings" :key="reasonstaking.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ reasonstaking.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditreasonstaking(reasonstaking)"
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
                  @click="showDeletereasonstaking(reasonstaking)"
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
        <AddModal key="add" v-if="isShowAddreasonstaking" />
        <EditModal
          :activeReasonstaking="activeReasonstaking"
          key="edit"
          v-if="isShowEditreasonstaking"
        />
        <DeleteModal
          :activeReasonstaking="activeReasonstaking"
          v-if="isShowDeletereasonstaking"
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
      isLoading: (state) => state.reasonstaking.isLoading,
      reasonstakings: (state) => state.reasonstaking.reasonstakings,
      isShowAddreasonstaking: (state) =>
        state.reasonstaking.isShowAddreasonstaking,
      isShowEditreasonstaking: (state) =>
        state.reasonstaking.isShowEditreasonstaking,
      isShowDeletereasonstaking: (state) =>
        state.reasonstaking.isShowDeletereasonstaking,
      count: (state) => state.reasonstaking.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      reasonstakingsHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeReasonstaking: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addreasonstaking: 'reasonstaking/SHOW_ADDREASONSTAKING',
      show_editreasonstaking: 'reasonstaking/SHOW_EDITREASONSTAKING',
      show_deletereasonstaking: 'reasonstaking/SHOW_DELETEREASONSTAKING',
      set_search: 'reasonstaking/SET_SEARCH',
    }),
    ...mapActions({
      create_reasonstaking: 'reasonstaking/create_reasonstaking',
      edit_reasonstaking: 'reasonstaking/edit_reasonstaking',
      delete_reasonstaking: 'reasonstaking/delete_reasonstaking',
      get_reasonstakings: 'reasonstaking/get_reasonstakings',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_reasonstakings({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updatereasonstakings() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_reasonstakings({ page: 1 })
    },
    showEditreasonstaking(item) {
      this.activeReasonstaking = item
      this.show_editreasonstaking(true)
    },
    async searchReasonstakings() {
      await this.get_reasonstakings({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_reasonstakings({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletereasonstaking(reasonstaking) {
      this.activeReasonstaking = reasonstaking
      this.show_deletereasonstaking(true)
    },
  },
  async mounted() {
    await this.get_reasonstakings({ page: 1 })
  },
}
</script>
