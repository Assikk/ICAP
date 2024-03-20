<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full"
      @click="show_addSubcity(false)"
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
              Добавить город
            </h3>
          </div>
          <div class="cursor-pointer" @click="show_addSubcity(false)">
            <img src="@/assets/img/close-icon.svg" alt="close" />
          </div>
        </div>
        <div class="grid gap-8 mb-8">
          <div class="col-span-1 w-full">
            <Select
              placeholder="Выберете область"
              iconLocation="97"
              label="Область *"
              id="region"
              :list="subcities"
              textList="name"
              valueList="id"
              v-model="region"
              :activeId="region"
              :error="$v.region.$dirty && !$v.region.required"
              @click="(value) => (region = value.id)"
            >
              <template #error>
                <span v-if="$v.region.$dirty && !$v.region.required">
                  Это обязательное поле!
                </span>
              </template>
            </Select>
          </div>
          <div class="flex justify-between gap-x-4">
            <Input
              label="Город (RU)*"
              id="name_ru"
              v-model="name_ru"
              placeholder="Введите название города"
              :error="$v.name_ru.$dirty && !$v.name_ru.required"
            >
              <template #error>
                <span v-if="$v.name_ru.$dirty && !$v.name_ru.required">
                  Это обязательное поле!
                </span>
              </template>
            </Input>
            <Input
              label="Город (KZ)*"
              id="name_kk"
              v-model="name_kk"
              placeholder="Введите название города"
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
        <Button white medium @click="show_addSubcity(false)"> Отмена </Button>
        <Button medium @click="addSubcity"> Добавить </Button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import Tabs from '~/components/ui/tabs/full.vue'
import Button from '@/components/ui/buttons/default.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Select from '@/components/ui/selects/primary.vue'
import Input from '@/components/ui/inputs/default.vue'

export default {
  name: 'AddVehiclesModal',
  components: {
    Tabs,
    Button,
    LoadingDots,
    Select,
    Input,
  },
  data() {
    return {
      activeTab: 1,
      isLoading: false,
      name_ru: '',
      name_kk: '',
      city: '',
      region: '',
    }
  },
  validations: {
    region: { required },
    name_ru: { required },
    name_kk: { required },
  },
  computed: {
    ...mapState({
      subcities: (state) => state.subregion.subregions,
    }),
  },
  methods: {
    ...mapMutations({
      show_addSubcity: 'subcity/SHOW_ADDSUBCITY',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      create_subcity: 'subcity/create_subcity',
      get_subregions: 'subregion/get_subregions',
    }),
    async addSubcity() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.create_subcity({
          name_ru: this.name_ru,
          name_kk: this.name_kk,
          region: this.region,
        })
        this.success_alert('Город успешно добавлен')
        this.show_addSubcity(false)
      } catch (err) {
        const errors = []
        if (err.response?.data) {
          for (let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`)
          }
        } else {
          errors.push('Ошибка при добавлении Города')
        }
        this.error_alert(errors)
      }
    },
  },
  async mounted() {
    await this.get_subregions()
    this.isLoading = false
  },
}
</script>
