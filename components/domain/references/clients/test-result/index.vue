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
              Результат экспресс-теста на ВИЧ
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addtestresult(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="testresultsHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="testresult in testresults" :key="testresult.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ testresult.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEdittestresult(testresult)"
                  v-if="$checkPermission(198)"
                >
                  <use xlink:href="#edit" />
                </svg>
                <svg class="cursor-pointer" width="20" height="20" fill="none" stroke="#5E6470"
                  @click="showDeletetestresult(testresult)"
                  v-if="$checkPermission(199)">
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
        <AddModal key="add" v-if="isShowAddtestresult" />
        <EditModal
          :activeTestresult="activeTestresult"
          key="edit"
          v-if="isShowEdittestresult"
        />
        <DeleteModal
          :activeTestresult="activeTestresult"
          v-if="isShowDeletetestresult"
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
    title: 'Результат экспресс-теста на ВИЧ'
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
      isLoading: (state) => state.testresult.isLoading,
      testresults: (state) => state.testresult.testresults,
      isShowAddtestresult: (state) => state.testresult.isShowAddtestresult,
      isShowEdittestresult: (state) => state.testresult.isShowEdittestresult,
      isShowDeletetestresult: (state) =>
        state.testresult.isShowDeletetestresult,
      count: (state) => state.testresult.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      testresultsHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeTestresult: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addtestresult: 'testresult/SHOW_ADDTESTRESULT',
      show_edittestresult: 'testresult/SHOW_EDITTESTRESULT',
      show_deletetestresult: 'testresult/SHOW_DELETETESTRESULT',
      set_search: 'testresult/SET_SEARCH',
    }),
    ...mapActions({
      create_testresult: 'testresult/create_testresult',
      edit_testresult: 'testresult/edit_testresult',
      delete_testresult: 'testresult/delete_testresult',
      get_testresults: 'testresult/get_testresults',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_testresults({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updatetestresults() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_testresults({ page: 1 })
    },
    showEdittestresult(item) {
      this.activeTestresult = item
      this.show_edittestresult(true)
    },
    async searchTestresults() {
      await this.get_testresults({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_testresults({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletetestresult(testresult) {
      this.activeTestresult = testresult
      this.show_deletetestresult(true)
    },
  },
  async mounted() {
    await this.get_testresults({ page: 1 })
  },
}
</script>
