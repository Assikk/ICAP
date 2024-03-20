<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_addRole(false)"/>
    <div class="relative overflow-y-auto w-[462px] bg-white rounded-md justify-between pt-6 pb-4">
      <div class="flex items-center justify-between gap-4 mb-6 px-6">
        <h3 class="text-lg text-[#111827] font-bold font-['Manrope']">
          Добавить роль
        </h3>
        <svg width="24" height="24" fill="#9CA3AF" class="cursor-pointer" @click="show_addRole(false)">
          <use xlink:href="#close" />
        </svg>
      </div>
      <div class="flex flex-col gap-6 px-6">
        <Input label="Роль" placeholder="Введите название роли" v-model="name"
        :error="$v.name.$dirty && !$v.name.required">
        <template #error>
          <span v-if="$v.name.$dirty && !$v.name.required">
            Это поле обязателен к заполнению
          </span>
        </template>
        </Input>
      </div>
      <div class="pt-4 mt-6 flex justify-end border-t border-[#E5E7EB] px-6">
        <div class="flex gap-4">
          <Button white @click="show_addRole(false)">
            Отмена
          </Button>
          <Button @click="addRole">
            Добавить
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Input from '@/components/ui/inputs/default.vue'
import Button from '@/components/ui/buttons/default.vue'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'EditRoleModal',
  components: {
    Input,
    Button
  },
  data() {
    return {
      disabledAdd: false,
      name: null
    }
  },
  validations() {
    return {
      name: {required}
    }
  },
  methods: {
    ...mapMutations({
      show_addRole: 'roles/SHOW_ADDROLE',
      loading_alert: 'alert/LOADING_ALERT'
    }),
    ...mapActions({
      error_alert: 'alert/error_alert',
      success_alert: 'alert/success_alert',
      add_role: 'roles/add_role',
      get_roles: 'roles/get_roles'
    }),
    async addRole() {
      if(this.$v.$invalid) { /* Проверка валидации */
        this.$v.$touch()
        return
      }
      if(!this.disabledAdd) {
        this.disabledAdd = true
        try {
          this.loading_alert()
          await this.add_role({name: this.name, permissions: []})
          await this.get_roles({page: 1})
          this.success_alert('Роль успешно добавлен')
          this.show_addRole(false)
        } catch(err) {
          const errors = []
          if (err.response?.data) {
            for (let key in err.response.data) {
              errors.push(`${key} - ${err.response.data[key]}`)
            }
          }
          this.error_alert(errors)
          this.disabledAdd = false
        }
      }
    }
  },
}
</script>

