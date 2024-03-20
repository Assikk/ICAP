<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_editConfirmationresult(false)"/>
    <div class="relative overflow-y-auto bg-white rounded-md pt-6 w-[900px]">
      <div class="flex items-center justify-between gap-4 mb-6 px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Редактировать Результат подтверждающего теста на ВИЧ
        </h3>
        <svg width="20" height="20" fill="#B3B9C9" class="cursor-pointer" @click="show_editConfirmationresult(false)">
          <use xlink:href="#close"/>
        </svg>
      </div>
      <div v-if="isLoading" class="h-[62px] relative">
        <LoadingDots class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"/>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6">
        <Input label="Результат подтверждающего теста на ВИЧ (RU)*" id="name_ru" v-model="form.name_ru"
          placeholder="Введите название Результат подтверждающего теста на ВИЧ"
          :error="$v.form.name_ru.$dirty && !$v.form.name_ru.required">
          <template #error>
            <span v-if="$v.form.name_ru.$dirty && !$v.form.name_ru.required">
              Это обязательное поле!
            </span>
          </template>
        </Input>
        <Input label="Результат подтверждающего теста на ВИЧ (KZ)*" id="name_kk" v-model="form.name_kk"
          placeholder="Введите название Результат подтверждающего теста на ВИЧ"
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
          <Button white @click="show_editConfirmationresult(false)">
            Отмена
          </Button>
          <Button :disabled="disabledEdit" @click="editConfirmationresult">
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import Button from '@/components/ui/buttons/default.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Input from '@/components/ui/inputs/default.vue'

export default {
  name: 'EditConfirmationresultsModal',
  components: {
    Button,
    LoadingDots,
    Input,
  },
  props: {
    activeConfirmationresult: {},
    activePage: {}
  },
  computed: {
    ...mapState({
      confirmationresult: (state) => state.confirmationresult.confirmationresult,
    }),
  },
  data() {
    return {
      isLoading: true,
      form: {
        name_ru: null,
        name_kk: null
      },
      disabledEdit: false
    }
  },
  validations: {
    form: {
      name_ru: { required },
      name_kk: { required },
    },
  },
  methods: {
    ...mapMutations({
      show_editConfirmationresult: 'confirmationresult/SHOW_EDITCONFIRMATIONRESULT',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      edit_confirmationresult: 'confirmationresult/edit_confirmationresult',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      get_confirmationresults: 'confirmationresult/get_confirmationresults',
      get_confirmationresult: 'confirmationresult/get_confirmationresult'
    }),
    async editConfirmationresult() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if(!this.disabledEdit) {
        this.disabledEdit = true
        try {
          this.loading_alert()
          await this.edit_confirmationresult({
            id: this.activeConfirmationresult.id,
            form: this.form
          })
          await this.get_confirmationresults({page: 1})
          this.success_alert('Результат подтверждающего теста на ВИЧ успешно изменён')
          this.show_editConfirmationresult(false)
        } catch(err) {
          const errors = []
          if (err.response?.data) {
            for (let key in err.response.data) {
              errors.push(`${key} - ${err.response.data[key][0]}`)
            }
          }
          this.error_alert(errors)
          this.disabledEdit = false
        }
      }
    },
    async getConfirmationResult() {
      await this.get_confirmationresult(this.activeConfirmationresult.id)
      for (let keyConfirmationResult in this.confirmationresult) {
        for (let keyForm in this.form) {
          if(keyConfirmationResult == keyForm) {
            this.form[keyForm] = this.confirmationresult[keyConfirmationResult]
          }
        }
      }
    },
  },
  async mounted() {
    await this.getConfirmationResult()
    this.isLoading = false
  },
}
</script>
