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
              Последняя дата тестирования на ВИЧ
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addlasttest(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="lasttestsHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="lasttest in lasttests" :key="lasttest.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ lasttest.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditlasttest(lasttest)"
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
                  @click="showDeletelasttest(lasttest)"
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
        <AddModal key="add" v-if="isShowAddlasttest" />
        <EditModal
          :activeLasttest="activeLasttest"
          key="edit"
          v-if="isShowEditlasttest"
        />
        <DeleteModal
          :activeLasttest="activeLasttest"
          v-if="isShowDeletelasttest"
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
      isLoading: (state) => state.lasttest.isLoading,
      lasttests: (state) => state.lasttest.lasttests,
      isShowAddlasttest: (state) => state.lasttest.isShowAddlasttest,
      isShowEditlasttest: (state) => state.lasttest.isShowEditlasttest,
      isShowDeletelasttest: (state) => state.lasttest.isShowDeletelasttest,
      count: (state) => state.lasttest.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      lasttestsHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeLasttest: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addlasttest: 'lasttest/SHOW_ADDLASTTEST',
      show_editlasttest: 'lasttest/SHOW_EDITLASTTEST',
      show_deletelasttest: 'lasttest/SHOW_DELETELASTTEST',
      set_search: 'lasttest/SET_SEARCH',
    }),
    ...mapActions({
      create_lasttest: 'lasttest/create_lasttest',
      edit_lasttest: 'lasttest/edit_lasttest',
      delete_lasttest: 'lasttest/delete_lasttest',
      get_lasttests: 'lasttest/get_lasttests',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_lasttests({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updatelasttests() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_lasttests({ page: 1 })
    },
    showEditlasttest(item) {
      this.activeLasttest = item
      this.show_editlasttest(true)
    },
    async searchLasttests() {
      await this.get_lasttests({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_lasttests({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletelasttest(lasttest) {
      this.activeLasttest = lasttest
      this.show_deletelasttest(true)
    },
  },
  async mounted() {
    await this.get_lasttests({ page: 1 })
  },
}
</script>
