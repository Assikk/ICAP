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
                >Категория клиента /
              </span>
              Вид наркотиков
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_adddrug(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="drugsHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="drug in drugs" :key="drug.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ drug.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditdrug(drug)"
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
                  @click="showDeletedrug(drug)"
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
        <AddModal key="add" v-if="isShowAdddrug" />
        <EditModal :activeDrug="activeDrug" key="edit" v-if="isShowEditdrug" />
        <DeleteModal
          :activeDrug="activeDrug"
          v-if="isShowDeletedrug"
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
      isLoading: (state) => state.drug.isLoading,
      drugs: (state) => state.drug.drugs,
      isShowAdddrug: (state) => state.drug.isShowAdddrug,
      isShowEditdrug: (state) => state.drug.isShowEditdrug,
      isShowDeletedrug: (state) => state.drug.isShowDeletedrug,
      count: (state) => state.drug.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      drugsHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeDrug: {},
    }
  },
  methods: {
    ...mapMutations({
      show_adddrug: 'drug/SHOW_ADDDRUG',
      show_editdrug: 'drug/SHOW_EDITDRUG',
      show_deletedrug: 'drug/SHOW_DELETEDRUG',
      set_search: 'drug/SET_SEARCH',
    }),
    ...mapActions({
      create_drug: 'drug/create_drug',
      edit_drug: 'drug/edit_drug',
      delete_drug: 'drug/delete_drug',
      get_drugs: 'drug/get_drugs',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_drugs({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updatedrugs() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_drugs({ page: 1 })
    },
    showEditdrug(item) {
      this.activeDrug = item
      this.show_editdrug(true)
    },
    async searchDrugs() {
      await this.get_drugs({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_drugs({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletedrug(drug) {
      this.activeDrug = drug
      this.show_deletedrug(true)
    },
  },
  async mounted() {
    await this.get_drugs({ page: 1 })
  },
}
</script>
