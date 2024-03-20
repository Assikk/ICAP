<template>
  <div class="flex flex-col">
    <Header/>
    <div class="p-6 flex-1">
      <Table :head="rolesHead" :isLoading="isLoading" :disabledButton="disabledSave" @back="$router.push('/roles')" @save="save">
        <template #body>
          <tr v-for="item in rolesBody" :key="item.id">
            <td class="w-[300px]">
              {{item.title}}
            </td>
            <td>
              <input v-if="item.isShowReadChecked" v-model="item.readChecked" type="checkbox">
            </td>
            <td>
              <input v-if="item.isShowCreateChecked" v-model="item.createChecked" type="checkbox">
            </td>
            <td>
              <input v-if="item.isShowUpdateChecked" v-model="item.updateChecked" type="checkbox">
            </td>
            <td>
              <input v-if="item.isShowDeleteChecked" v-model="item.deleteChecked" type="checkbox">
            </td>
          </tr>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import Header from '@/components/ui/header.vue'
import Table from './components/table.vue'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'SlugRoleComponent',
  head: {
    title: 'Редактирование роли'
  },
  components: {
    Header,
    Table
  },
  computed: {
    ...mapState({
      role: state => state.roles.role,
    })
  },
  data() {
    return {
      rolesHead: [
        {
          id: 1,
          name: '',
        },
        {
          id: 2,
          name: 'Просмотр'
        },
        {
          id: 3,
          name: 'Создание'
        },
        {
          id: 4,
          name: 'Редактирование'
        },
        {
          id: 5,
          name: 'Удаление'
        }
      ],
      rolesBody: [
        {
          id: 1,
          title: 'Клиенты',
          readId: 208,
          readChecked: false,
          isShowReadChecked: true,
          createId: 205,
          createChecked: false,
          isShowCreateChecked: true,
          updateId: 206,
          updateChecked: false,
          isShowUpdateChecked: true,
          deleteId: 207,
          deleteChecked: false,
          isShowDeleteChecked: true
        },
        {
          id: 2,
          title: 'Пользователи',
          readId: 196,
          readChecked: false,
          isShowReadChecked: true,
          createId: 193,
          createChecked: false,
          isShowCreateChecked: true,
          updateId: 194,
          updateChecked: false,
          isShowUpdateChecked: true,
          deleteId: 195,
          deleteChecked: false,
          isShowDeleteChecked: true
        },
        {
          id: 3,
          title: 'Организации',
          readId: 192,
          readChecked: false,
          isShowReadChecked: true,
          createId: 189,
          createChecked: false,
          isShowCreateChecked: true,
          updateId: 190,
          updateChecked: false,
          isShowUpdateChecked: true,
          deleteId: 191,
          deleteChecked: false,
          isShowDeleteChecked: true
        },
        {
          id: 4,
          title: 'Купоны и вознаграждения',
          readId: 184,
          readChecked: false,
          isShowReadChecked: true,
          createId: 181,
          createChecked: false,
          isShowCreateChecked: true,
          updateId: 182,
          updateChecked: false,
          isShowUpdateChecked: true,
          deleteId: 183,
          deleteChecked: false,
          isShowDeleteChecked: true
        },
        {
          id: 5,
          title: 'Логирование',
          readId: 204,
          readChecked: false,
          isShowReadChecked: true,
          createId: 201,
          createChecked: false,
          isShowCreateChecked: false,
          updateId: 202,
          updateChecked: false,
          isShowUpdateChecked: false,
          deleteId: 203,
          deleteChecked: false,
          isShowDeleteChecked: false
        },
        {
          id: 6,
          title: 'Справочники',
          readId: 200,
          readChecked: false,
          isShowReadChecked: false,
          createId: 197,
          createChecked: false,
          isShowCreateChecked: true,
          updateId: 198,
          updateChecked: false,
          isShowUpdateChecked: true,
          deleteId: 199,
          deleteChecked: false,
          isShowDeleteChecked: true
        },
        {
          id: 7,
          title: 'Роли',
          readId: 188,
          readChecked: false,
          isShowReadChecked: true,
          createId: 185,
          createChecked: false,
          isShowCreateChecked: true,
          updateId: 186,
          updateChecked: false,
          isShowUpdateChecked: true,
          deleteId: 187,
          deleteChecked: false,
          isShowDeleteChecked: true
        },
      ],
      isLoading: true,
      disabledSave: false
    }
  },
  methods: {
    ...mapMutations({
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      error_alert: 'alert/error_alert',
      success_alert: 'alert/success_alert',
      get_role: 'roles/get_role',
      edit_role: 'roles/edit_role'
    }),
    async getRole() {
      await this.get_role(this.$route.params.slug)
      this.rolesBody.forEach((role) => {
        this.role.permissions.forEach((item) => {
          if(role.readId == item) {
            role.readChecked = true
          }
          if(role.createId == item) {
            role.createChecked = true
          }
          if(role.updateId == item) {
            role.updateChecked = true
          }
          if(role.deleteId == item) {
            role.deleteChecked = true
          }
        })
      })
    },
    async save() {
      if(!this.disabledSave) {
        this.disabledSave = true
        let permissions = []
        this.rolesBody.forEach((item) => {
          if(item.readChecked) {
            permissions.push(item.readId)
          }
          if(item.createChecked) {
            permissions.push(item.createId)
          }
          if(item.updateChecked) {
            permissions.push(item.updateId)
          }
          if(item.deleteChecked) {
            permissions.push(item.deleteId)
          }
        })
        try {
          this.loading_alert()
          await this.edit_role({id: this.$route.params.slug,
          form: {
              name: this.role.name,
              permissions: permissions
            }
          })
          this.$auth.fetchUser()
          this.success_alert('Доступы успешно изменены')
          this.$router.push('/roles')
        } catch(err) {
          const errors = []
          if (err.response?.data) {
            for (let key in err.response.data) {
              errors.push(`${key} - ${err.response.data[key]}`)
            }
          }
          this.error_alert(errors)
          this.disabledSave = false
        }
      }
    }
  },
  async mounted() {
    await this.getRole()
    this.isLoading = false
  }
}
</script>
