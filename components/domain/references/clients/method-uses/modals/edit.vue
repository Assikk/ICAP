<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full"
      @click="show_editMethoduses(false)"
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
              Редактировать Преимущественный способ употребления
            </h3>
          </div>
          <div class="cursor-pointer" @click="show_editMethoduses(false)">
            <img src="@/assets/img/close-icon.svg" alt="close" />
          </div>
        </div>
        <div class="grid gap-8 mb-8">
          <div class="flex justify-between gap-x-4">
            <Input
              label="Преимущественный способ употребления (RU)*"
              id="name_ru"
              v-model="form.name_ru"
              placeholder="Введите название Преимущественный способ употребления"
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
              label="Преимущественный способ употребления (KZ)*"
              id="name_kk"
              v-model="form.name_kk"
              placeholder="Введите название Преимущественный способ употребления"
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
        <Button white medium @click="show_editMethoduses(false)">
          Отмена
        </Button>
        <Button medium @click="editMethoduses"> Сохранить </Button>
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
  name: 'AddMethodusessModal',
  components: {
    Button,
    LoadingDots,
    Input,
  },
  props: {
    activeMethoduses: {},
  },
  computed: {
    ...mapState({
      methoduses: (state) => state.methodusess.methoduses,
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
      show_editMethoduses: 'methoduses/SHOW_EDITMETHODUSES',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      edit_methoduses: 'methoduses/edit_methoduses',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      get_methoduses: 'methoduses/get_methodusess',
    }),
    async editMethoduses() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const editedMethoduses = {
          id: this.form.id,
          form: {
            name_ru: this.form.name_ru,
            name_kk: this.form.name_kk,
          },
        }
        await this.edit_methoduses(editedMethoduses)
        this.success_alert(
          'Преимущественный способ употребления успешно изменён'
        )
        this.show_editMethoduses(false)
      } catch (err) {
        const errors = []
        if (err.response?.data) {
          for (let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`)
          }
        } else {
          errors.push(
            'Ошибка редактировании Преимущественный способ употребления'
          )
        }
        this.error_alert(errors)
      }
    },
  },
  async mounted() {
    await this.get_methoduses(this.activeMethoduses.id)
    this.form = structuredClone(this.activeMethoduses)
    this.isLoading = false
  },
}
</script>
