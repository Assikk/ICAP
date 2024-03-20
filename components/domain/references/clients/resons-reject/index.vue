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
              Причины отказа
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addresonsreject(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="resonsrejectsHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="resonsreject in resonsrejects" :key="resonsreject.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ resonsreject.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditresonsreject(resonsreject)"
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
                  @click="showDeleteresonsreject(resonsreject)"
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
        <AddModal key="add" v-if="isShowAddresonsreject" />
        <EditModal
          :activeResonsreject="activeResonsreject"
          key="edit"
          v-if="isShowEditresonsreject"
        />
        <DeleteModal
          :activeResonsreject="activeResonsreject"
          v-if="isShowDeleteresonsreject"
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
      isLoading: (state) => state.resonsreject.isLoading,
      resonsrejects: (state) => state.resonsreject.resonsrejects,
      isShowAddresonsreject: (state) =>
        state.resonsreject.isShowAddresonsreject,
      isShowEditresonsreject: (state) =>
        state.resonsreject.isShowEditresonsreject,
      isShowDeleteresonsreject: (state) =>
        state.resonsreject.isShowDeleteresonsreject,
      count: (state) => state.resonsreject.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      resonsrejectsHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeResonsreject: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addresonsreject: 'resonsreject/SHOW_ADDRESONSREJECT',
      show_editresonsreject: 'resonsreject/SHOW_EDITRESONSREJECT',
      show_deleteresonsreject: 'resonsreject/SHOW_DELETERESONSREJECT',
      set_search: 'resonsreject/SET_SEARCH',
    }),
    ...mapActions({
      create_resonsreject: 'resonsreject/create_resonsreject',
      edit_resonsreject: 'resonsreject/edit_resonsreject',
      delete_resonsreject: 'resonsreject/delete_resonsreject',
      get_resonsrejects: 'resonsreject/get_resonsrejects',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_resonsrejects({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updateresonsrejects() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_resonsrejects({ page: 1 })
    },
    showEditresonsreject(item) {
      this.activeResonsreject = item
      this.show_editresonsreject(true)
    },
    async searchResonsrejects() {
      await this.get_resonsrejects({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_resonsrejects({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeleteresonsreject(resonsreject) {
      this.activeResonsreject = resonsreject
      this.show_deleteresonsreject(true)
    },
  },
  async mounted() {
    await this.get_resonsrejects({ page: 1 })
  },
}
</script>
