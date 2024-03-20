<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full"
      @click="show_editReasonstaking(false)"
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
              Редактировать Причины не взятия на АРТ
            </h3>
          </div>
          <div class="cursor-pointer" @click="show_editReasonstaking(false)">
            <img src="@/assets/img/close-icon.svg" alt="close" />
          </div>
        </div>
        <div class="grid gap-8 mb-8">
          <div class="flex justify-between gap-x-4">
            <Input
              label="Причины не взятия на АРТ (RU)*"
              id="name_ru"
              v-model="form.name_ru"
              placeholder="Введите название Причины не взятия на АРТа"
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
              label="Причины не взятия на АРТ (KZ)*"
              id="name_kk"
              v-model="form.name_kk"
              placeholder="Введите название Причины не взятия на АРТа"
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
        <Button white medium @click="show_editReasonstaking(false)">
          Отмена
        </Button>
        <Button medium @click="editReasonstaking"> Сохранить </Button>
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
  name: 'AddReasonstakingsModal',
  components: {
    Button,
    LoadingDots,
    Input,
  },
  props: {
    activeReasonstaking: {},
  },
  computed: {
    ...mapState({
      reasonstaking: (state) => state.reasonstakings.reasonstaking,
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
      show_editReasonstaking: 'reasonstaking/SHOW_EDITREASONSTAKING',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      edit_reasonstaking: 'reasonstaking/edit_reasonstaking',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      get_reasonstaking: 'reasonstaking/get_reasonstakings',
    }),
    async editReasonstaking() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const editedReasonstaking = {
          id: this.form.id,
          form: {
            name_ru: this.form.name_ru,
            name_kk: this.form.name_kk,
          },
        }
        await this.edit_reasonstaking(editedReasonstaking)
        this.success_alert('Причины не взятия на АРТ успешно изменён')
        this.show_editReasonstaking(false)
      } catch (err) {
        const errors = []
        if (err.response?.data) {
          for (let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`)
          }
        } else {
          errors.push('Ошибка редактировании Причины не взятия на АРТа')
        }
        this.error_alert(errors)
      }
    },
  },
  async mounted() {
    await this.get_reasonstaking(this.activeReasonstaking.id)
    this.form = structuredClone(this.activeReasonstaking)
    this.isLoading = false
  },
}
</script>
