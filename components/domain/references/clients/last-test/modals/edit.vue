<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full"
      @click="show_editLasttest(false)"
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
              Редактировать Последняя дата тестирования на ВИЧ
            </h3>
          </div>
          <div class="cursor-pointer" @click="show_editLasttest(false)">
            <img src="@/assets/img/close-icon.svg" alt="close" />
          </div>
        </div>
        <div class="grid gap-8 mb-8">
          <div class="flex justify-between gap-x-4">
            <Input
              label="Последняя дата тестирования на ВИЧ (RU)*"
              id="name_ru"
              v-model="form.name_ru"
              placeholder="Введите название Последняя дата тестирования на ВИЧ"
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
              label="Последняя дата тестирования на ВИЧ (KZ)*"
              id="name_kk"
              v-model="form.name_kk"
              placeholder="Введите название Последняя дата тестирования на ВИЧ"
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
        <Button white medium @click="show_editLasttest(false)"> Отмена </Button>
        <Button medium @click="editLasttest"> Сохранить </Button>
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
  name: 'AddLasttestsModal',
  components: {
    Button,
    LoadingDots,
    Input,
  },
  props: {
    activeLasttest: {},
  },
  computed: {
    ...mapState({
      lasttest: (state) => state.lasttests.lasttest,
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
      show_editLasttest: 'lasttest/SHOW_EDITLASTTEST',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      edit_lasttest: 'lasttest/edit_lasttest',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      get_lasttest: 'lasttest/get_lasttests',
    }),
    async editLasttest() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const editedLasttest = {
          id: this.form.id,
          form: {
            name_ru: this.form.name_ru,
            name_kk: this.form.name_kk,
          },
        }
        await this.edit_lasttest(editedLasttest)
        this.success_alert('Последняя дата тестирования на ВИЧ успешно изменён')
        this.show_editLasttest(false)
      } catch (err) {
        const errors = []
        if (err.response?.data) {
          for (let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`)
          }
        } else {
          errors.push(
            'Ошибка редактировании Последняя дата тестирования на ВИЧ'
          )
        }
        this.error_alert(errors)
      }
    },
  },
  async mounted() {
    await this.get_lasttest(this.activeLasttest.id)
    this.form = structuredClone(this.activeLasttest)
    this.isLoading = false
  },
}
</script>
