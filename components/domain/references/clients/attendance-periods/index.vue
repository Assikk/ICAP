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
              Когда участник состоял на ОЗТ
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addattendanceperiods(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="attendanceperiodssHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr
              v-for="attendanceperiods in attendanceperiodss"
              :key="attendanceperiods.id"
            >
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ attendanceperiods.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditattendanceperiods(attendanceperiods)"
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
                  @click="showDeleteattendanceperiods(attendanceperiods)"
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
        <AddModal key="add" v-if="isShowAddattendanceperiods" />
        <EditModal
          :activeAttendanceperiods="activeAttendanceperiods"
          key="edit"
          v-if="isShowEditattendanceperiods"
        />
        <DeleteModal
          :activeAttendanceperiods="activeAttendanceperiods"
          v-if="isShowDeleteattendanceperiods"
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
      isLoading: (state) => state.attendanceperiods.isLoading,
      attendanceperiodss: (state) => state.attendanceperiods.attendanceperiodss,
      isShowAddattendanceperiods: (state) =>
        state.attendanceperiods.isShowAddattendanceperiods,
      isShowEditattendanceperiods: (state) =>
        state.attendanceperiods.isShowEditattendanceperiods,
      isShowDeleteattendanceperiods: (state) =>
        state.attendanceperiods.isShowDeleteattendanceperiods,
      count: (state) => state.attendanceperiods.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      attendanceperiodssHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeAttendanceperiods: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addattendanceperiods: 'attendanceperiods/SHOW_ADDATTENDANCEPERIODS',
      show_editattendanceperiods:
        'attendanceperiods/SHOW_EDITATTENDANCEPERIODS',
      show_deleteattendanceperiods:
        'attendanceperiods/SHOW_DELETEATTENDANCEPERIODS',
      set_search: 'attendanceperiods/SET_SEARCH',
    }),
    ...mapActions({
      create_attendanceperiods: 'attendanceperiods/create_attendanceperiods',
      edit_attendanceperiods: 'attendanceperiods/edit_attendanceperiods',
      delete_attendanceperiods: 'attendanceperiods/delete_attendanceperiods',
      get_attendanceperiodss: 'attendanceperiods/get_attendanceperiodss',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_attendanceperiodss({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updateattendanceperiodss() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_attendanceperiodss({ page: 1 })
    },
    showEditattendanceperiods(item) {
      this.activeAttendanceperiods = item
      this.show_editattendanceperiods(true)
    },
    async searchAttendanceperiodss() {
      await this.get_attendanceperiodss({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_attendanceperiodss({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeleteattendanceperiods(attendanceperiods) {
      this.activeAttendanceperiods = attendanceperiods
      this.show_deleteattendanceperiods(true)
    },
  },
  async mounted() {
    await this.get_attendanceperiodss({ page: 1 })
  },
}
</script>
