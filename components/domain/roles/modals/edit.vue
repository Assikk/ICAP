<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_editRole(false)"/>
    <div class="relative overflow-y-auto w-[462px] bg-white rounded-md justify-between pt-6 pb-4">
      <div class="flex items-center justify-between gap-4 mb-6 px-6">
        <h3 class="text-lg text-[#111827] font-bold font-['Manrope']">
          Изменить роль
        </h3>
        <svg width="24" height="24" fill="#9CA3AF" class="cursor-pointer" @click="show_editRole(false)">
          <use xlink:href="#close" />
        </svg>
      </div>
      <div v-if="isLoading" class="h-[66px] relative">
        <LoadingDots class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"/>
      </div>
      <div v-else class="flex flex-col gap-6 px-6">
        <Input label="Роль" placeholder="Введите название роли" v-model="name"/>
      </div>
      <div class="pt-4 mt-6 flex justify-end border-t border-[#E5E7EB] px-6">
        <div class="flex gap-4">
          <Button white @click="show_editRole(false)">
            Отмена
          </Button>
          <Button @click="editRole">
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Input from '@/components/ui/inputs/default.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Button from '@/components/ui/buttons/default.vue'
export default {
  name: 'EditRoleModal',
  components: {
    Input,
    LoadingDots,
    Button
  },
  props: {
    activeRole: {},
    activePage: {}
  },
  computed: {
    ...mapState({
      role: state => state.roles.role,
    })
  },
  data() {
    return {
      isLoading: true,
      disabledEdit: false,
      name: null
    }
  },
  methods: {
    ...mapMutations({
      show_editRole: 'roles/SHOW_EDITROLE',
      loading_alert: 'alert/LOADING_ALERT'
    }),
    ...mapActions({
      error_alert: 'alert/error_alert',
      success_alert: 'alert/success_alert',
      get_role: 'roles/get_role',
      edit_role: 'roles/edit_role',
      get_roles: 'roles/get_roles'
    }),
    async editRole() {
      if(!this.disabledEdit) {
        this.disabledEdit = true
        try {
          this.loading_alert()
          await this.edit_role({id: this.activeRole.id, form: {name: this.name}})
          await this.get_roles({page: this.activePage})
          this.success_alert('Роль успешно изменен')
          this.show_editRole(false)
        } catch(err) {
          const errors = []
          if (err.response?.data) {
            for (let key in err.response.data) {
              errors.push(`${key} - ${err.response.data[key]}`)
            }
          }
          this.error_alert(errors)
          this.disabledEdit = false
        }
      }
    },
    async getRole() {
      await this.get_role(this.activeRole.id)
      this.name = this.activeRole.name
    }
  },
  async mounted() {
    await this.getRole()
    this.isLoading = false
  }
}
</script>

