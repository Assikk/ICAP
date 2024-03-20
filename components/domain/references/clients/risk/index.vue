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
              Рискованное поведение
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addrisk(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="risksHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="risk in risks" :key="risk.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ risk.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditrisk(risk)"
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
                  @click="showDeleterisk(risk)"
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
        <AddModal key="add" v-if="isShowAddrisk" />
        <EditModal :activeRisk="activeRisk" key="edit" v-if="isShowEditrisk" />
        <DeleteModal
          :activeRisk="activeRisk"
          v-if="isShowDeleterisk"
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
      isLoading: (state) => state.risk.isLoading,
      risks: (state) => state.risk.risks,
      isShowAddrisk: (state) => state.risk.isShowAddrisk,
      isShowEditrisk: (state) => state.risk.isShowEditrisk,
      isShowDeleterisk: (state) => state.risk.isShowDeleterisk,
      count: (state) => state.risk.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      risksHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeRisk: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addrisk: 'risk/SHOW_ADDRISK',
      show_editrisk: 'risk/SHOW_EDITRISK',
      show_deleterisk: 'risk/SHOW_DELETERISK',
      set_search: 'risk/SET_SEARCH',
    }),
    ...mapActions({
      create_risk: 'risk/create_risk',
      edit_risk: 'risk/edit_risk',
      delete_risk: 'risk/delete_risk',
      get_risks: 'risk/get_risks',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_risks({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updaterisks() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_risks({ page: 1 })
    },
    showEditrisk(item) {
      this.activeRisk = item
      this.show_editrisk(true)
    },
    async searchRisks() {
      await this.get_risks({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_risks({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeleterisk(risk) {
      this.activeRisk = risk
      this.show_deleterisk(true)
    },
  },
  async mounted() {
    await this.get_risks({ page: 1 })
  },
}
</script>
