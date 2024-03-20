<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full"
      @click="show_addCategorykgn(false)"
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
              Добавить Категория КГН
            </h3>
          </div>
          <svg width="20" height="20" fill="#B3B9C9" class="cursor-pointer" @click="show_addCategorykgn(false)">
            <use xlink:href="#close"/>
          </svg>
        </div>
        <div class="grid gap-8 mb-8">
          <div class="flex justify-between gap-x-4">
            <Input
              label="Категория КГН (RU)*"
              id="name_ru"
              v-model="name_ru"
              placeholder="Введите название Категория КГН"
              :error="$v.name_ru.$dirty && !$v.name_ru.required"
            >
              <template #error>
                <span v-if="$v.name_ru.$dirty && !$v.name_ru.required">
                  Это обязательное поле!
                </span>
              </template>
            </Input>
            <Input
              label="Категория КГН (KZ)*"
              id="name_kk"
              v-model="name_kk"
              placeholder="Введите название Категория КГН"
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
        <Button white medium @click="show_addCategorykgn(false)">
          Отмена
        </Button>
        <Button medium @click="addCategorykgn"> Добавить </Button>
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
      show_addCategorykgn: 'categorykgn/SHOW_ADDCATEGORYKGN',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      create_categorykgn: 'categorykgn/create_categorykgn',
    }),
    async addCategorykgn() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.create_categorykgn({
          name_ru: this.name_ru,
          name_kk: this.name_kk,
        })
        this.success_alert('Категория КГН успешно добавлен')
        this.show_addCategorykgn(false)
      } catch (err) {
        const errors = []
        if (err.response?.data) {
          for (let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`)
          }
        } else {
          errors.push('Ошибка при добавлении Категория КГН')
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
