<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full"
      @click="show_editSuborganization(false)"
    />
    <div
      class="relative overflow-y-auto bg-white rounded-md flex flex-col justify-between p-6"
    >
      <div class="mt-3">
        <div class="flex justify-between pb-8">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Изменить организацию</h3>
          </div>
          <div class="cursor-pointer" @click="show_editSuborganization(false)">
            <img src="@/assets/img/close-icon.svg" alt="close">
          </div>
        </div>
        <div class="grid gap-8 mb-8">
          <div class="flex justify-between gap-x-4">
            <Input
              label="Организация (RU)*"
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
              label="Организация (KZ)*"
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
          <div class="flex justify-between gap-x-4">
            <Input
              label="Сокращенное название (RU) *"
              id="short_name_ru"
              v-model="form.short_name_ru"
              placeholder="Введите название области"
              :error="$v.form.short_name_ru.$dirty && !$v.form.short_name_ru.required"
            >
              <template #error>
                <span
                  v-if="$v.form.short_name_ru.$dirty && !$v.form.short_name_ru.required"
                >
                  Это обязательное поле!
                </span>
              </template>
            </Input>
            <Input
              label="Сокращенное название (KZ) *"
              id="short_name_kk"
              v-model="form.short_name_kk"
              placeholder="Введите название области"
              :error="$v.form.short_name_kk.$dirty && !$v.form.short_name_kk.required"
            >
              <template #error>
                <span
                  v-if="$v.form.short_name_kk.$dirty && !$v.form.short_name_kk.required"
                >
                  Это обязательное поле!
                </span>
              </template>
            </Input>
          </div>
          <div class="flex justify-between gap-x-4">
            <Input
              label="БИН"
              type="number"
              id="bin"
              v-model="form.bin"
              class="w-full"
              placeholder="Введите название области"
              :error="$v.form.bin.$dirty && !$v.form.bin.required"
            >
              <template #error>
                <span v-if="$v.form.bin.$dirty && !$v.form.bin.required">
                  Это обязательное поле!
                </span>
              </template>
            </Input>
          </div>
        </div>
      </div>
      <div class="flex gap-4 justify-end  py-3 border-t border-t-[#E5E7EB]">
        <Button white medium @click="show_editSuborganization(false)"> Отмена </Button>
        <Button medium @click="editSuborganization">
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
import Input from '@/components/ui/inputs/default.vue'

export default {
  name: 'EditSuborganizationModal',
  components: {
    Tabs,
    Button,
    LoadingDots,
    Input,
  },
  props: {
    activeSuborganization: {},
  },
  computed: {
    ...mapState({
      suborganization: (state) => state.suborganizations.suborganization,
    }),
  },
  data() {
    return {
      activeTab: 1,
      isLoading: true,
      form: {}
    }
  },
  validations: {
    form: {
      name_ru: { required },
      name_kk: { required },
      short_name_ru: { required },
      short_name_kk: { required },
      bin: { required },
    },
  },
  methods: {
    ...mapMutations({
      show_editSuborganization: 'suborganization/SHOW_EDITSUBORGANIZATION',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      edit_suborganization: 'suborganization/edit_suborganization',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      get_suborganization: 'suborganization/get_suborganization',
    }),
    async editSuborganization() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const editedSuborganization = {
          id: this.form.id,
          form: {
            name_ru: this.form.name_ru,
            name_kk: this.form.name_kk,
            short_name_ru: this.form.short_name_ru,
            short_name_kk: this.form.short_name_kk,
            bin: this.form.bin,
          }
        };
        await this.edit_suborganization(editedSuborganization);
        this.success_alert('Организация успешно изменён');
        this.show_editSuborganization(false);
      } catch (err) {
        const errors = [];
        if (err.response?.data) {
          for (let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`);
          }
        } else {
          errors.push('Ошибка редактировании Организации');
        }
        this.error_alert(errors);
      }
    },
  },
  async mounted() {
    await this.get_suborganization(this.activeSuborganization.id)
    this.form = structuredClone(this.activeSuborganization)
    this.isLoading = false
  },
}
</script>
