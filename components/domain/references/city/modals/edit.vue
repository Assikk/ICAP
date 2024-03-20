<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full"
      @click="show_editSubcity(false)"
    />
    <div
      class="relative overflow-y-auto bg-white rounded-md flex flex-col justify-between p-6"
    >
    <div v-if="isLoading" class="flex justify-center items-center"
        :class="small ? 'min-h-[300px] min-w-[420px]' : 'min-h-[300px] min-w-[420px]'">
        <LoadingDots/>
      </div>
      <div v-if="!isLoading" class="mt-3">
        <div class="flex justify-between pb-8">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Изменить область</h3>
          </div>
          <div class="cursor-pointer" @click="show_editSubcity(false)">
            <img src="@/assets/img/close-icon.svg" alt="close">
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
              v-model="form.region"
              :error="$v.form.region.$dirty && !$v.form.region.required"
            >
              <template #error>
                <span v-if="$v.form.region.$dirty && !$v.form.region.required">
                  Это обязательное поле!
                </span>
              </template>
            </Select>
          </div>
          <div class="flex justify-between gap-x-4">
              <Input
              label="Город (RU)*"
              id="name_ru"
              v-model="form.name_ru"
              placeholder="Введите название области"
              :error="$v.form.name_ru.$dirty && !$v.form.name_ru.required"
            >
              <template #error>
                <span v-if="$v.form.name_ru.$dirty && !$v.form.name_ru.required">
                  Это обязательное поле!
                </span>
              </template>
            </Input>
            <Input
              label="Город (KZ)*"
              id="name_kk"
              v-model="form.name_kk"
              placeholder="Введите название области"
              :error="$v.form.name_kk.$dirty && !$v.form.name_kk.required"
            >
              <template #error>
                <span v-if="$v.form.name_kk.$dirty && !$v.form.name_kk.required">
                  Это обязательное поле!
                </span>
              </template>
            </Input>
          </div>
        </div>
      </div>
      <div class="flex gap-4 justify-end  py-3 border-t border-t-[#E5E7EB]">
        <Button white medium @click="show_editSubcity(false)"> Отмена </Button>
        <Button medium @click="editSubcity">
          Сохранить
        </Button>
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
  name: 'EditSubcityModal',
  components: {
    Tabs,
    Button,
    LoadingDots,
    Select,
    Input,
  },
  props: {
    activeSubcity: {},
  },
  computed: {
    ...mapState({
      subcity: (state) => state.subcity.subcity,
      subcities: (state) => state.subregion.subregions,
    }),
  },
  data() {
    return {
      activeTab: 1,
      isLoading: true,
      form: {
        region: 1,
        name_ru: null,
        name_kk: null
      },
    }
  },
  validations: {
    form: {
      region: { required },
      name_ru: { required },
      name_kk: { required },
    },
  },
  methods: {
    ...mapMutations({
      show_editSubcity: 'subcity/SHOW_EDITSUBCITY',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      get_subсity: 'subcity/get_subсity',
      edit_subcity: 'subcity/edit_subcity',
      get_subregions: 'subregion/get_subregions',
    }),
    async getSubCity() {
      await this.get_subсity(this.activeSubcity.id)
      this.form = structuredClone(this.subcity)
      this.form.region = this.form.region?.id
    },
    async editSubcity() {
      if (this.$v.$invalid){
        this.$v.$touch();
        return
      }
      try {
        const editedSubcity = {
          id: this.form.id,
          form: {
            region: this.form.region,
            name_ru: this.form.name_ru,
            name_kk: this.form.name_kk,
          }
        };
        await this.edit_subcity(editedSubcity);
        this.success_alert('Город успешно изменён');
        this.show_editSubcity(false);
      } catch (err) {
        const errors = [];
        if (err.response?.data) {
          for (let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`);
          }
        } else {
          errors.push('Ошибка редактировании Города');
        }
        this.error_alert(errors);
      }
    },
  },
  async mounted() {
    await this.getSubCity()
    await this.get_subregions()
    this.isLoading = false
  },
}
</script>
