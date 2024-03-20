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
              Участника сопроводили к координатору по ДКП
            </p>
          </div>
          <!-- <div class="pl-4">
            <Button @click="show_addgender(true)" class="px-4">
              <span class="text-md">+</span><span>Добавить</span></Button
            >
          </div> -->
        </div>
      </div>
      <div class="px-6">
        <Table
          :head="gendersHead"
          :isLoading="isLoading"
          :count="count"
          @changePage="changePage"
          :isPagination="false"
        >
          <template #body>
            <tr v-for="gender in genders" :key="gender.id">
              <td class="bg-white">
                <span class="text-sm font-medium text-[#111827]">
                  {{ gender.name_ru }}
                </span>
              </td>
              <td class="flex items-center justify-end gap-[18px] bg-white">
                <p class="text-white">{{ gender.name_ru }}</p>
                <!-- <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="#5E6470"
                  @click="showEditgender(gender)"
                >
                  <use xlink:href="#edit" />
                </svg>
                <svg
                  class="cursor-pointer"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#5E6470"
                  @click="showDeletegender(gender)"
                >
                  <use xlink:href="#delete" />
                </svg> -->
              </td>
            </tr>
          </template>
        </Table>
      </div>
    </div>
    <div>
      <transition-group name="fade">
        <AddModal key="add" v-if="isShowAddgender" />
        <EditModal
          :activeGender="activeGender"
          key="edit"
          v-if="isShowEditgender"
        />
        <DeleteModal
          :activeGender="activeGender"
          v-if="isShowDeletegender"
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
      isLoading: (state) => state.gender.isLoading,
      genders: (state) => state.gender.genders,
      isShowAddgender: (state) => state.gender.isShowAddgender,
      isShowEditgender: (state) => state.gender.isShowEditgender,
      isShowDeletegender: (state) => state.gender.isShowDeletegender,
      count: (state) => state.gender.count,
    }),
  },
  data() {
    return {
      activeStatus: '',
      activePage: 1,
      gendersHead: [
        {
          id: 1,
          name: 'Название',
        },
        {
          id: 2,
          name: '',
        },
      ],
      genders: [
        {
          id: 1,
          name_ru: 'Да',
        },
        {
          id: 2,
          name_ru: 'Нет',
        },
      ],
      activeGender: {},
    }
  },
  methods: {
    ...mapMutations({
      show_addgender: 'gender/SHOW_ADDGENDER',
      show_editgender: 'gender/SHOW_EDITGENDER',
      show_deletegender: 'gender/SHOW_DELETEGENDER',
      set_search: 'gender/SET_SEARCH',
    }),
    ...mapActions({
      create_gender: 'gender/create_gender',
      edit_gender: 'gender/edit_gender',
      delete_gender: 'gender/delete_gender',
      get_genders: 'gender/get_genders',
    }),
    async changeStatus(status) {
      this.activeStatus = status.value
      await this.get_genders({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async updategenders() {
      this.activeStatus = ''
      this.set_search('')
      await this.get_genders({ page: 1 })
    },
    showEditgender(item) {
      this.activeGender = item
      this.show_editgender(true)
    },
    async searchGenders() {
      await this.get_genders({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    async changePage(page) {
      this.activePage = page
      await this.get_genders({
        page: this.activePage,
        is_deleted: this.activeStatus,
      })
    },
    showDeletegender(gender) {
      this.activeGender = gender
      this.show_deletegender(true)
    },
  },
  async mounted() {
    await this.get_genders({ page: 1 })
  },
}
</script>
