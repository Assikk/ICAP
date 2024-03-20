<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_editCommunication(false)"/>
    <div class="relative overflow-y-auto bg-white rounded-md pt-6 w-[600px]">
      <div class="flex items-center justify-between gap-4 mb-6 px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Редактировать Предпочитаемый метод связи
        </h3>
        <svg width="20" height="20" fill="#B3B9C9" class="cursor-pointer" @click="show_editCommunication(false)">
          <use xlink:href="#close"/>
        </svg>
      </div>
      <div v-if="isLoading" class="h-[62px] relative">
        <LoadingDots class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"/>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6">
        <Input label="Предпочитаемый метод связи (RU)*" id="name_ru" v-model="form.name_ru"
          placeholder="Введите Предпочитаемый метод связи"
          :error="$v.form.name_ru.$dirty && !$v.form.name_ru.required">
          <template #error>
            <span v-if="$v.form.name_ru.$dirty && !$v.form.name_ru.required">
              Это обязательное поле!
            </span>
          </template>
        </Input>
        <Input label="Предпочитаемый метод связи (KZ)*" id="name_kk" v-model="form.name_kk"
          placeholder="Введите Предпочитаемый метод связи"
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
          <Button white @click="show_editCommunication(false)">
            Отмена
          </Button>
          <Button :disabled="disabledEdit" @click="editCommunication">
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
  name: 'EditCommunicationsModal',
  components: {
    Button,
    LoadingDots,
    Input,
  },
  props: {
    activeCommunication: {},
    activePage: {}
  },
  computed: {
    ...mapState({
      communication: (state) => state.communication.communication,
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
      show_editCommunication: 'communication/SHOW_EDITCOMMUNICATION',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      edit_communication: 'communication/edit_communication',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      get_communications: 'communication/get_communications',
      get_communication: 'communication/get_communication'
    }),
    async editCommunication() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if(!this.disabledEdit) {
        this.disabledEdit = true
        try {
          this.loading_alert()
          await this.edit_communication({
            id: this.activeCommunication.id,
            form: this.form
          })
          await this.get_communications({page: 1})
          this.success_alert('Предпочитаемый метод связи успешно изменён')
          this.show_editCommunication(false)
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
    async getCommunication() {
      await this.get_communication(this.activeCommunication.id)
      for (let keyCommunication in this.communication) {
        for (let keyForm in this.form) {
          if(keyCommunication == keyForm) {
            this.form[keyForm] = this.communication[keyCommunication]
          }
        }
      }
    },
  },
  async mounted() {
    await this.getCommunication()
    this.isLoading = false
  },
}
</script>
