<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_addReasonissue(false)"/>
    <div class="relative overflow-y-auto bg-white rounded-md pt-6 w-[600px]">
      <div class="flex items-center justify-between gap-4 mb-6 px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Добавить Причина невыдачи
        </h3>
        <svg width="20" height="20" fill="#B3B9C9" class="cursor-pointer" @click="show_addReasonissue(false)">
          <use xlink:href="#close"/>
        </svg>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6">
        <Input label="Причина невыдачи (RU)*" id="name_ru" v-model="form.name_ru"
          placeholder="Введите название Причина невыдачи"
          :error="$v.form.name_ru.$dirty && !$v.form.name_ru.required">
          <template #error>
            <span v-if="$v.form.name_ru.$dirty && !$v.form.name_ru.required">
              Это обязательное поле!
            </span>
          </template>
        </Input>
        <Input label="Причина невыдачи (KZ)*" id="name_kk" v-model="form.name_kk"
          placeholder="Введите название области"
          :error="$v.form.name_kk.$dirty && !$v.form.name_kk.required">
          <template #error>
            <span v-if="$v.form.name_kk.$dirty && !$v.form.name_kk.required">
              Это обязательное поле!
            </span>
          </template>
        </Input>
      </div>
      <div class="pt-4 my-6 flex justify-end border-t border-[#E5E7EB] px-6">
        <div class="flex gap-4">
          <Button white @click="show_addReasonissue(false)">
            Отмена
          </Button>
          <Button :disabled="disabledAdd" @click="addReasonissue">
            Добавить
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import Button from '@/components/ui/buttons/default.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Input from '@/components/ui/inputs/default.vue'
export default {
  name: 'AddReasonissueModal',
  components: {
    Button,
    LoadingDots,
    Input,
  },
  data() {
    return {
      form: {
        name_ru: '',
        name_kk: '',
      },
      disabledAdd: false
    }
  },
  validations: {
    form: {
      name_ru: { required },
      name_kk: { required },
    }
  },
  methods: {
    ...mapMutations({
      show_addReasonissue: 'reasonissue/SHOW_ADDREASONISSUE',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      create_reasonissue: 'reasonissue/create_reasonissue',
    }),
    async addReasonissue() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if(!this.disabledAdd) {
        this.disabledAdd = true
        try {
          this.loading_alert()
          await this.create_reasonissue(this.form)
          this.success_alert('Причина невыдачи успешно добавлен')
          this.show_addReasonissue(false)
        } catch (err) {
          const errors = []
          if (err.response?.data) {
            for (let key in err.response.data) {
              errors.push(`${key} - ${err.response.data[key][0]}`)
            }
          }
          this.error_alert(errors)
          this.disabledAdd = false
        }
      }
    },
  },
}
</script>
