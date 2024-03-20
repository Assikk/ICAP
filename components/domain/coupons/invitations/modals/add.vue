<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full"
      @click="showAddInvitation(false)"
    />
    <div
      class="w-96	relative overflow-y-auto max-h-[52rem] bg-white rounded-md flex flex-col justify-between p-6 scrollbar"
    >
      <div class="my-3">
        <div class="flex justify-between pb-8">
          <div>
            <h3
              class="text-lg font-semibold leading-6 text-gray-900"
              id="modal-title"
            >
              Добавление купона
            </h3>
          </div>
          <svg width="20" height="20" fill="#B3B9C9" class="cursor-pointer" @click="showAddInvitation(false)">
            <use xlink:href="#close"/>
          </svg>
        </div>
        <div class="grid gap-8">
          <div class="mt-0">
            <div class="grid gap-y-4">
              <div class="col-span-1 w-full">
                <Select
                  placeholder="Выберете организацию"
                  label="Организация *"
                  id="organization"
                  :list="suborganizations"
                  textList="name"
                  valueList="id"
                  v-model="form.organization"
                  :activeId="form.organization"
                  :error="
                    $v.form.organization.$dirty &&
                    !$v.form.organization.required
                  "
                  @click="(value) => (form.organization = value.id)"
                >
                  <template #error>
                    <span
                      v-if="
                        $v.form.organization.$dirty &&
                        !$v.form.organization.required
                      "
                    >
                      Это обязательное поле!
                    </span>
                  </template>
                </Select>
              </div>
              <div class="col-span-1 w-full">
                <Input
                  label="Количество купонов *"
                  type="number"
                  id="coupons_count"
                  v-model="form.coupons_count"
                  placeholder="Введите количество купонов"
                  :error="
                    $v.form.coupons_count.$dirty && !$v.form.coupons_count.required
                  "
                >
                  <template #error>
                    <span
                      v-if="
                        $v.form.coupons_count.$dirty && !$v.form.coupons_count.required
                      "
                    >
                      Это обязательное поле!
                    </span>
                  </template>
                </Input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-between pt-3 border-t border-t-[#E5E7EB]"
      >
        <div class="flex items-center">
          <div class="flex justify-start">
          </div>
        </div>
        <div class="flex gap-4">
          <Button white medium @click="showAddInvitation(false)"> Отмена </Button>
          <Button medium @click="addInvitation"> Добавить </Button>
        </div>
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
import Checkbox from '@/components/ui/checkbox.vue'

export default {
  name: 'AddVehiclesModal',
  components: {
    Tabs,
    Button,
    LoadingDots,
    Select,
    Input,
    Checkbox,
  },
  props: {
    activeInvitation: {},
  },
  data() {
    return {
      isLoading: false,
      checkboxActive: [
        {
          id: 1,
          name: 'Да',
          value: true,
        },
        {
          id: 2,
          name: 'Нет',
          value: false,
        },
      ],
      checkboxAccess: [
        {
          id: 1,
          name: 'ON',
          value: true,
        },
        {
          id: 2,
          name: 'OFF',
          value: false,
        },
      ],
      accessLevel: [
        {
          id: 1,
          short: 'ctry',
          name: 'Cтрана',
        },
        {
          id: 2,
          short: 'cty',
          name: 'Город',
        },
        {
          id: 3,
          short: 'reg',
          name: 'Область',
        },
        {
          id: 4,
          short: 'org',
          name: 'Организация',
        },
      ],
      defaultLang: [
        {
          id: 1,
          short: 'ru',
          name: 'Русский',
        },
        {
          id: 2,
          short: 'kk',
          name: 'Казахский',
        },
      ],
      form: {
        organization: '',
        coupons_count: '',
      },
    }
  },
  validations: {
    form: {
      organization: { required },
      coupons_count: { required },
    },
  },

  computed: {
    ...mapState({
      invitation: (state) => state.invitations.invitation,
      invitations: (state) => state.invitation.invitations,
      subregions: (state) => state.subregion.subregions,
      groups: (state) => state.group.groups,
      subcities: (state) => state.subcity.subcities,
      suborganizations: (state) => state.suborganization.suborganizations,
    }),
    filteredInvitations() {
      return this.invitations
        ? this.invitations.filter((item) => {
            return item.propertyToFilter === 'desiredValue'
          })
        : []
    },
  },
  methods: {
    ...mapMutations({
      showAddInvitation: 'invitation/SHOW_ADDINVITATION',
      loadingAlert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      successAlert: 'alert/success_alert',
      errorAlert: 'alert/error_alert',
      createInvitation: 'invitation/createInvitation',
      get_subregions: 'subregion/get_subregions',
      get_groups: 'group/get_groups',
      get_subcities: 'subcity/get_subcities',
      get_suborganizations: 'suborganization/get_suborganizations',
    }),
    async addInvitation() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.createInvitation(this.form)
        this.successAlert('Пользователь успешно добавлен')
        this.showAddInvitation(false)
      } catch (err) {
        const errors = []
        if (err.response?.data) {
          for (let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`)
          }
        } else {
          errors.push('Ошибка при добавлении пользователя')
        }
        this.errorAlert(errors)
      }
    },
    clickCheckboxActive() {
      this.form.is_active = !this.form.is_active
    },
    clickCheckboxAccess() {
      this.form.can_see_personal_info = !this.form.can_see_personal_info
    },
  },
  async mounted() {
    await this.get_subregions()
    await this.get_groups()
    await this.get_subcities()
    await this.get_suborganizations()
    this.isLoading = false
  },
}
</script>

<style>
.scrollbar::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.scrollbar::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: #fff;
}

.scrollbar::-webkit-scrollbar-thumb {
  background: #0a7194;
  border-radius: 100vh;
  border: 3px solid #fff;
}

.scrollbar::-webkit-scrollbar-thumb:hover {
  background: #0a7194;
}
</style>
