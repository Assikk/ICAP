<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full"
      @click="show_addLasttest(false)"
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
              Добавить Последняя дата тестирования на ВИЧ
            </h3>
          </div>
          <div class="cursor-pointer" @click="show_addLasttest(false)">
            <img src="@/assets/img/close-icon.svg" alt="close" />
          </div>
        </div>
        <div class="grid gap-8 mb-8">
          <div class="flex justify-between gap-x-4">
            <Input
              label="Последняя дата тестирования на ВИЧ (RU)*"
              id="name_ru"
              v-model="name_ru"
              placeholder="Введите название Последняя дата тестирования на ВИЧ"
              :error="$v.name_ru.$dirty && !$v.name_ru.required"
            >
              <template #error>
                <span v-if="$v.name_ru.$dirty && !$v.name_ru.required">
                  Это обязательное поле!
                </span>
              </template>
            </Input>
            <Input
              label="Последняя дата тестирования на ВИЧ (KZ)*"
              id="name_kk"
              v-model="name_kk"
              placeholder="Введите название Последняя дата тестирования на ВИЧ"
              :error="$v.name_kk.$dirty && !$v.name_kk.required"
            >
              <template #error>
                <span v-if="$v.name_kk.$dirty && !$v.name_kk.required">
                  Это обязательное поле!
                </span>
              </template>
            </Input>
          </div>
        </div>
      </div>
      <div class="flex gap-4 justify-end py-3 border-t border-t-[#E5E7EB]">
        <Button white medium @click="show_addLasttest(false)"> Отмена </Button>
        <Button medium @click="addLasttest"> Добавить </Button>
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
  name: 'AddVehiclesModal',
  components: {
    Button,
    LoadingDots,
    Input,
  },
  data() {
    return {
      activeTab: 1,
      isLoading: false,
      name_ru: '',
      name_kk: '',
    }
  },
  validations: {
    name_ru: { required },
    name_kk: { required },
  },
  methods: {
    ...mapMutations({
      show_addLasttest: 'lasttest/SHOW_ADDLASTTEST',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      create_lasttest: 'lasttest/create_lasttest',
    }),
    async addLasttest() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.create_lasttest({
          name_ru: this.name_ru,
          name_kk: this.name_kk,
        })
        this.success_alert(
          'Последняя дата тестирования на ВИЧ успешно добавлен'
        )
        this.show_addLasttest(false)
      } catch (err) {
        const errors = []
        if (err.response?.data) {
          for (let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`)
          }
        } else {
          errors.push(
            'Ошибка при добавлении Последняя дата тестирования на ВИЧ'
          )
        }
        this.error_alert(errors)
      }
    },
  },
  async mounted() {
    this.isLoading = false
  },
}
</script>
