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
              Тип опросника
            </p>
          </div>
          <div class="pl-4">
            <Button @click="show_addquestionnaire(true)" class="px-4"
            v-if="$checkPermission(197)">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div>
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="questionnairesHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
        >
          <template #body>
            <tr v-for="questionnaire in questionnaires" :key="questionnaire.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ questionnaire.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditquestionnaire(questionnaire)"
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
                  @click="showDeletequestionnaire(questionnaire)"
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
        <AddModal key="add" v-if="isShowAddquestionnaire" />
        <EditModal
          :activeQuestionnaire="activeQuestionnaire"
          key="edit"
          v-if="isShowEditquestionnaire"
        />
        <DeleteModal
          :activeQuestionnaire="activeQuestionnaire"
          v-if="isShowDeletequestionnaire"
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
      isLoading: (state) => state.questionnaire.isLoading,
      questionnaires: (state) => state.questionnaire.questionnaires,
      isShowAddquestionnaire: (state) =>
        state.questionnaire.isShowAddquestionnaire,
      isShowEditquestionnaire: (state) =>
        state.questionnaire.isShowEditquestionnaire,
      isShowDeletequestionnaire: (state) =>
        state.questionnaire.isShowDeletequestionnaire,
      count: (state) => state.questionnaire.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      questionnairesHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      activeQuestionnaire: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addquestionnaire: 'questionnaire/SHOW_ADDQUESTIONNAIRE',
      show_editquestionnaire: 'questionnaire/SHOW_EDITQUESTIONNAIRE',
      show_deletequestionnaire: 'questionnaire/SHOW_DELETEQUESTIONNAIRE',
      set_search: 'questionnaire/SET_SEARCH',
    }),
    ...mapActions({
      create_questionnaire: 'questionnaire/create_questionnaire',
      edit_questionnaire: 'questionnaire/edit_questionnaire',
      delete_questionnaire: 'questionnaire/delete_questionnaire',
      get_questionnaires: 'questionnaire/get_questionnaires',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_questionnaires({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updatequestionnaires() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_questionnaires({ page: 1 })
    },
    showEditquestionnaire(item) {
      this.activeQuestionnaire = item
      this.show_editquestionnaire(true)
    },
    async searchQuestionnaires() {
      await this.get_questionnaires({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_questionnaires({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletequestionnaire(questionnaire) {
      this.activeQuestionnaire = questionnaire
      this.show_deletequestionnaire(true)
    },
  },
  async mounted() {
    await this.get_questionnaires({ page: 1 })
  },
}
</script>
