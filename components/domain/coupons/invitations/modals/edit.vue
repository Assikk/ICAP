<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full"
      @click="showEditInvitation(false)"
    />
    <div
      class="relative overflow-y-auto max-h-[52rem] bg-white rounded-md flex flex-col justify-between p-6 scrollbar"
    >
      <div
        v-if="isLoading"
        class="flex justify-center items-center"
        :class="
          small ? 'min-h-[660px] min-w-[750px]' : 'min-h-[660px] min-w-[800px]'
        "
      >
        <LoadingDots />
      </div>
      <div v-if="!isLoading" class="mt-3">
        <div class="flex justify-between pb-8">
          <div>
            <h3
              class="text-2xl font-semibold leading-6 text-gray-900"
              id="modal-title"
            >
              Редактирование пользователя
            </h3>
          </div>
          <svg width="20" height="20" fill="#B3B9C9" class="cursor-pointer" @click="showEditInvitation(false)">
            <use xlink:href="#close"/>
          </svg>
        </div>
        <div class="grid gap-8">
          <div class="flex gap-4">
            <div class="col-span-1 w-64">
              <Input
                label="Email *"
                id="email"
                v-model="form.email"
                placeholder="Введите email"
                :error="$v.form.email.$dirty && !$v.form.email.required"
              >
                <template #error>
                  <span
                    v-if="
                      form.email &&
                      $v.form.email.$dirty &&
                      !$v.form.email.required
                    "
                  >
                    Это обязательное поле!
                  </span>
                </template>
              </Input>
            </div>
            <div class="col-span-1 w-64">
              <Input
                type="password"
                label="Введите пароль *"
                id="password"
                v-model="form.password"
                placeholder="Введите пароль"
              >
              </Input>
            </div>
          </div>
          <div class="mt-0">
            <h3 class="flex justify-start pb-4 font-semibold">
              Общая информация
            </h3>
            <div class="flex justify-between gap-4 mb-4">
              <div class="col-span-1 w-64">
                <Input
                  label="Фамилия *"
                  id="last_name"
                  v-model="form.last_name"
                  placeholder="Введите фамилия"
                  :error="
                    $v.form.last_name.$dirty && !$v.form.last_name.required
                  "
                >
                  <template #error>
                    <span
                      v-if="
                        $v.form.last_name.$dirty && !$v.form.last_name.required
                      "
                    >
                      Это обязательное поле!
                    </span>
                  </template>
                </Input>
              </div>
              <div class="col-span-1 w-64">
                <Input
                  label="Имя *"
                  id="first_name"
                  v-model="form.first_name"
                  placeholder="Введите имя"
                  :error="
                    $v.form.first_name.$dirty && !$v.form.first_name.required
                  "
                >
                  <template #error>
                    <span
                      v-if="
                        $v.form.first_name.$dirty &&
                        !$v.form.first_name.required
                      "
                    >
                      Это обязательное поле!
                    </span>
                  </template>
                </Input>
              </div>
              <div class="col-span-1 w-64">
                <Input
                  label="Отчество *"
                  id="middle_name"
                  v-model="form.middle_name"
                  placeholder="Введите отчество"
                  :error="
                    $v.form.middle_name.$dirty && !$v.form.middle_name.required
                  "
                >
                  <template #error>
                    <span
                      v-if="
                        $v.form.middle_name.$dirty &&
                        !$v.form.middle_name.required
                      "
                    >
                      Это обязательное поле!
                    </span>
                  </template>
                </Input>
              </div>
            </div>
            <div class="flex justify-between gap-4 mb-4">
              <div class="col-span-1 w-64">
                <label
                  for="helper-text"
                  class="block mb-1 text-sm text-start font-medium text-[#4D5D7D]"
                  >Номер телефона * <span class="text-red-600 absolute"></span
                ></label>
                <div class="flex items-center">
                  <button
                    id="dropdown-phone-button"
                    data-dropdown-toggle="dropdown-phone"
                    class="flex-shrink-0 z-10 inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                    type="button"
                  >
                    (+992)
                  </button>
                  <div class="relative w-full">
                    <input
                      type="number"
                      id="phone-input"
                      v-model="form.phone"
                      class="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-xs"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      placeholder="Введите номер"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="col-span-1 w-64">
                <Select
                  placeholder="Выберете область"
                  label="Область *"
                  id="region"
                  :list="subregions"
                  textList="name"
                  valueList="id"
                  v-model="form.region"
                  :activeId="form.region"
                  :error="$v.form.region.$dirty && !$v.form.region.required"
                  @click="(value) => (form.region = value.id)"
                >
                  <template #error>
                    <span
                      v-if="$v.form.region.$dirty && !$v.form.region.required"
                    >
                      Это обязательное поле!
                    </span>
                  </template>
                </Select>
              </div>
              <div class="col-span-1 w-64">
                <Select
                  placeholder="Выберете город"
                  label="Город *"
                  id="city"
                  :list="subcities"
                  textList="name"
                  valueList="id"
                  :activeId="form.city"
                  v-model="form.city"
                  :error="$v.form.city.$dirty && !$v.form.city.required"
                  @click="(value) => (form.city = value.id)"
                >
                  <template #error>
                    <span v-if="$v.form.city.$dirty && !$v.form.city.required">
                      Это обязательное поле!
                    </span>
                  </template>
                </Select>
              </div>
            </div>
            <div class="flex gap-x-4">
              <div class="col-span-1 w-64">
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
            </div>
          </div>
          <div class="mt-0">
            <h3 class="flex justify-start pb-4 font-semibold">
              Настройки доступа и безопасность
            </h3>
            <div class="flex gap-x-4">
              <div class="col-span-1 w-64">
                <Select
                  placeholder="Выберете роль"
                  label="Роль *"
                  id="group"
                  :list="groups"
                  textList="name"
                  valueList="id"
                  v-model="form.groups[0]"
                  :error="$v.form.groups.$dirty && !$v.form.groups.required"
                  @click="(value) => form.groups.push(value.id)"
                >
                  <template #error>
                    <span
                      v-if="$v.form.groups.$dirty && !$v.form.groups.required"
                    >
                      Это обязательное поле!
                    </span>
                  </template>
                </Select>
              </div>
              <div class="col-span-1 w-64">
                <Select
                  placeholder="Выберете уровень"
                  label="Уровень доступа *"
                  id="accesslevel"
                  :list="accessLevel"
                  textList="name"
                  valueList="short"
                  v-model="form.access_level"
                  :activeId="form.access_level"
                  :error="
                    $v.form.access_level.$dirty &&
                    !$v.form.access_level.required
                  "
                  @click="(value) => (form.access_level = value.short)"
                >
                  <template #error>
                    <span
                      v-if="
                        $v.form.access_level.$dirty &&
                        !$v.form.access_level.required
                      "
                    >
                      Это обязательное поле!
                    </span>
                  </template>
                </Select>
              </div>
              <div class="col-span-1 w-64">
                <Select
                  placeholder="Выберете язык"
                  label="Язык интерфейса *"
                  id="defaultlang"
                  :list="defaultLang"
                  textList="name"
                  valueList="short"
                  v-model="form.default_lang"
                  :activeId="form.default_lang"
                  :error="
                    $v.form.default_lang.$dirty &&
                    !$v.form.default_lang.required
                  "
                  @click="(value) => (form.default_lang = value.short)"
                >
                  <template #error>
                    <span
                      v-if="
                        $v.form.default_lang.$dirty &&
                        !$v.form.default_lang.required
                      "
                    >
                      Это обязательное поле!
                    </span>
                  </template>
                </Select>
              </div>
            </div>
          </div>
          <div class="mb-4 flex items-center">
            <p class="text-start">Учетная запись активна?</p>
            <div class="flex justify-start">
              <Checkbox
                :list="checkboxActive"
                textList="name"
                valueList="value"
                v-model="form.is_active"
                :value="form.is_active"
                @click="clickCheckboxActive"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-between py-3 border-t border-t-[#E5E7EB]"
      >
        <div class="flex items-center">
          <p class="text-sm">Де-персонифицированный доступ</p>
          <div class="flex justify-start">
            <Checkbox
              :list="checkboxAccess"
              textList="name"
              valueList="value"
              v-model="form.can_see_personal_info"
              :value="form.can_see_personal_info"
              @click="clickCheckboxAccess"
            />
          </div>
        </div>
        <div class="flex gap-4">
          <Button white medium @click="showEditInvitation(false)">
            Отмена
          </Button>
          <Button medium @click="submitEditInvitation"> Сохранить </Button>
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
  name: 'EditInvitationModal',
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
      isLoading: true,
      small: true,
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
        id: '',
        password: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        email: '',
        phone: '',
        access_level: '',
        can_see_personal_info: true,
        is_active: true,
        default_lang: '',
        region: '',
        city: '',
        organization: '',
        groups: [],
      },
    }
  },
  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      middle_name: { required },
      email: { required },
      phone: { required },
      access_level: { required },
      can_see_personal_info: { required },
      is_active: { required },
      default_lang: { required },
      region: { required },
      city: { required },
      organization: { required },
      groups: { required },
    },
  },
  computed: {
    ...mapState({
      invitation: (state) => state.invitation.invitation,
      invitations: (state) => state.invitation.invitations,
      subregions: (state) => state.subregion.subregions,
      groups: (state) => state.group.groups,
      subcities: (state) => state.subcity.subcities,
      suborganizations: (state) => state.suborganization.suborganizations,
    }),
  },

  methods: {
    ...mapMutations({
      showEditInvitation: 'invitation/SHOW_EDITINVITATION',
      loadingAlert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      successAlert: 'alert/success_alert',
      errorAlert: 'alert/error_alert',
      getInvitation: 'invitation/getInvitation',
      editInvitation: 'invitation/editInvitation',
      get_subregions: 'subregion/get_subregions',
      get_groups: 'group/get_groups',
      get_subcities: 'subcity/get_subcities',
      get_suborganizations: 'suborganization/get_suborganizations',
    }),
    async submitEditInvitation() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const editedInvitation = {
          id: this.form.id,
          form: {
            first_name: this.form.first_name,
            email: this.form.email,
            last_name: this.form.last_name,
            middle_name: this.form.middle_name,
            groups: this.form.groups,
            city: this.form.city,
            region: this.form.region,
            organization: this.form.organization,
            phone: this.form.phone,
            is_active: this.form.is_active,
          },
        }
        await this.editInvitation(editedInvitation)
        this.successAlert('Пользователь успешно изменён')
        this.showEditInvitation(false)
      } catch (err) {
        const errors = []
        if (err.response && err.response.data) {
          for (let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`)
          }
        } else {
          errors.push('Ошибка редактировании пользователя')
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
    await this.getInvitation(this.activeInvitation.id)
    this.form = JSON.parse(JSON.stringify(this.invitation))
    this.form.id = this.invitation.id // assuming invitation.id exists
    this.form.organization = this.form.organization.id
    this.form.region = this.form.region.id
    this.form.city = this.form.city.id
    this.form.groups = []
    this.form.groups.push(this.invitation.groups[0].id)
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
