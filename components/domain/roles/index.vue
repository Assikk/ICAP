<template>
  <div class="flex flex-col">
    <Header/>
    <div class="flex-1 p-6 flex flex-col gap-6">
      <div class="flex items-center justify-between px-4">
        <h3 class="text-xl text-[#111827] font-bold">
          Роли
        </h3>
        <Button @click="show_addRole(true)">
          <template #prev-icon>
            <svg width="16" height="16" fill="none" stroke="#fff">
              <use xlink:href="#plus" />
            </svg>
          </template>
          Добавить
        </Button>
      </div>
      <Table :head="rolesHead" :isLoading="isLoading" :count="count" @changePage="changePage">
        <template #body>
          <tr v-for="role in roles" :key="role.id" class="transition ease-linear cursor-pointer hover:bg-[#F1F5F9]"
          v-show="role.id !== 1"
          @click="$router.push(`/roles/${role.id}`)">
            <td class="w-full">
              <span>
                {{role.name}}
              </span>
            </td>
            <td class="flex items-center gap-[18px]">
              <svg class="cursor-pointer" width="20" height="20" fill="#5E6470"
              v-if="role.id !== 1"
              @click.stop="showEditRole(role)">
                <use xlink:href="#edit"/>
              </svg>
              <svg class="cursor-pointer" width="20" height="20" fill="none" stroke="#5E6470"
              v-if="role.id !== 1"
              @click.stop="showDeleteRole(role)">
                <use xlink:href="#delete" />
              </svg>
              <div v-else class="w-5 h-5"/>
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <transition-group name="fade">
      <AddModal key="add" v-if="isShowAddRole"/>
      <EditModal key="edit" :activeRole="activeRole" :activePage="filter.page" v-if="isShowEditRole"/>
      <DeleteModal key="delete" v-if="isShowDeleteRole" :activeRole="activeRole" :activePage="filter.page"/>
    </transition-group>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Header from '@/components/ui/header.vue'
import Button from '@/components/ui/buttons/default.vue'
import Table from '@/components/ui/table.vue'
import AddModal from './modals/add.vue'
import EditModal from './modals/edit.vue'
import DeleteModal from './modals/delete.vue'
export default {
  name: 'RolesComponent',
  components: {
    Header,
    Button,
    Table,
    AddModal,
    EditModal,
    DeleteModal
  },
  head: {
    title: 'Роли'
  },
  computed: {
    ...mapState({
      roles: state => state.roles.roles,
      isLoading: state => state.roles.isLoading,
      count: state => state.roles.count,
      isShowAddRole: state => state.roles.isShowAddRole,
      isShowEditRole: state => state.roles.isShowEditRole,
      isShowDeleteRole: state => state.roles.isShowDeleteRole
    })
  },
  data() {
    return {
      rolesHead: [
        {
          id: 1,
          name: 'Название'
        },
        {
          id: 2,
          name: ''
        }
      ],
      activeRole: null,
      filter: {
        page: 1
      }
    }
  },
  methods: {
    ...mapMutations({
      show_addRole: 'roles/SHOW_ADDROLE',
      show_editRole: 'roles/SHOW_EDITROLE',
      show_deleteRole: 'roles/SHOW_DELETEROLE'
    }),
    ...mapActions({
      get_roles: 'roles/get_roles'
    }),
    showEditRole(role) {
      this.activeRole = role
      this.show_editRole(true)
    },
    showDeleteRole(role) {
      this.activeRole = role
      this.show_deleteRole(true)
    },
    async changePage(page) {
      this.filter.page = page
      await this.get_roles(this.filter)
    }
  },
  async mounted() {
    await this.get_roles(this.filter)
  }
}
</script>
