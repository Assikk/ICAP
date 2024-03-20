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
              Набор проф. материалов
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addpromaterials(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="promaterialssHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="promaterials in promaterialss" :key="promaterials.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ promaterials.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditpromaterials(promaterials)"
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
                  @click="showDeletepromaterials(promaterials)"
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
        <AddModal key="add" v-if="isShowAddpromaterials" />
        <EditModal
          :activePromaterials="activePromaterials"
          key="edit"
          v-if="isShowEditpromaterials"
        />
        <DeleteModal
          :activePromaterials="activePromaterials"
          v-if="isShowDeletepromaterials"
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
      isLoading: (state) => state.promaterials.isLoading,
      promaterialss: (state) => state.promaterials.promaterialss,
      isShowAddpromaterials: (state) =>
        state.promaterials.isShowAddpromaterials,
      isShowEditpromaterials: (state) =>
        state.promaterials.isShowEditpromaterials,
      isShowDeletepromaterials: (state) =>
        state.promaterials.isShowDeletepromaterials,
      count: (state) => state.promaterials.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      promaterialssHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activePromaterials: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addpromaterials: 'promaterials/SHOW_ADDPROMATERIALS',
      show_editpromaterials: 'promaterials/SHOW_EDITPROMATERIALS',
      show_deletepromaterials: 'promaterials/SHOW_DELETEPROMATERIALS',
      set_search: 'promaterials/SET_SEARCH',
    }),
    ...mapActions({
      create_promaterials: 'promaterials/create_promaterials',
      edit_promaterials: 'promaterials/edit_promaterials',
      delete_promaterials: 'promaterials/delete_promaterials',
      get_promaterialss: 'promaterials/get_promaterialss',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_promaterialss({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updatepromaterialss() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_promaterialss({ page: 1 })
    },
    showEditpromaterials(item) {
      this.activePromaterials = item
      this.show_editpromaterials(true)
    },
    async searchPromaterialss() {
      await this.get_promaterialss({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_promaterialss({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletepromaterials(promaterials) {
      this.activePromaterials = promaterials
      this.show_deletepromaterials(true)
    },
  },
  async mounted() {
    await this.get_promaterialss({ page: 1 })
  },
}
</script>
