<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full"
      @click="show_editResonsreject(false)"
    />
    <div
      class="relative overflow-y-auto bg-white rounded-md flex flex-col justify-between p-6"
    >
      <div class="mt-3">
        <div class="flex justify-between pb-8">
          <div>
            <h3
              class="text-lg font-medium leading-6 text-gray-900"
              id="modal-title"
            >
              Редактировать Причины отказа
            </h3>
          </div>
          <div class="cursor-pointer" @click="show_editResonsreject(false)">
            <img src="@/assets/img/close-icon.svg" alt="close" />
          </div>
        </div>
        <div class="grid gap-8 mb-8">
          <div class="flex justify-between gap-x-4">
            <Input
              label="Причины отказа (RU)*"
              id="name_ru"
              v-model="form.name_ru"
              placeholder="Введите название Причины отказаа"
              :error="$v.form.name_ru.$dirty && !$v.form.name_ru.required"
            >
              <template #error>
                <span
                  v-if="$v.form.name_ru.$dirty && !$v.form.name_ru.required"
                >
                  Это обязательное поле!
                </span>
              </template>
            </Input>
            <Input
              label="Причины отказа (KZ)*"
              id="name_kk"
              v-model="form.name_kk"
              placeholder="Введите название Причины отказаа"
              :error="$v.form.name_kk.$dirty && !$v.form.name_kk.required"
            >
              <template #error>
                <span
                  v-if="$v.form.name_kk.$dirty && !$v.form.name_kk.required"
                >
                  Это обязательное поле!
                </span>
              </template>
            </Input>
          </div>
        </div>
      </div>
      <div class="flex gap-4 justify-end py-3 border-t border-t-[#E5E7EB]">
        <Button white medium @click="show_editResonsreject(false)">
          Отмена
        </Button>
        <Button medium @click="editResonsreject"> Сохранить </Button>
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
  name: 'AddResonsrejectsModal',
  components: {
    Button,
    LoadingDots,
    Input,
  },
  props: {
    activeResonsreject: {},
  },
  computed: {
    ...mapState({
      resonsreject: (state) => state.resonsrejects.resonsreject,
    }),
  },
  data() {
    return {
      activeTab: 1,
      isLoading: true,
      form: {},
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
      show_editResonsreject: 'resonsreject/SHOW_EDITRESONSREJECT',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      edit_resonsreject: 'resonsreject/edit_resonsreject',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      get_resonsreject: 'resonsreject/get_resonsrejects',
    }),
    async editResonsreject() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const editedResonsreject = {
          id: this.form.id,
          form: {
            name_ru: this.form.name_ru,
            name_kk: this.form.name_kk,
          },
        }
        await this.edit_resonsreject(editedResonsreject)
        this.success_alert('Причины отказа успешно изменён')
        this.show_editResonsreject(false)
      } catch (err) {
        const errors = []
        if (err.response?.data) {
          for (let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`)
          }
        } else {
          errors.push('Ошибка редактировании Причины отказаа')
        }
        this.error_alert(errors)
      }
    },
  },
  async mounted() {
    await this.get_resonsreject(this.activeResonsreject.id)
    this.form = structuredClone(this.activeResonsreject)
    this.isLoading = false
  },
}
</script>
