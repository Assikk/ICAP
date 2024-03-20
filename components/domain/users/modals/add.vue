<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="showAddUser(false)"/>
    <div class="relative bg-white rounded-md pt-6 w-[848px]">
      <div class="flex items-center justify-between gap-4 mb-8 px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Добавление пользователя
        </h3>
        <svg width="24" height="24" fill="#B3B9C9" class="cursor-pointer" @click="showAddUser(false)">
          <use xlink:href="#close"/>
        </svg>
      </div>
      <div v-if="isLoading" class="h-[590px] relative">
        <LoadingDots class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"/>
      </div>
      <div v-else class="px-6">
        <div class="grid grid-cols-3 gap-6">
          <Input
            whitespace
            label="Email *"
            id="email"
            v-model="form.email"
            placeholder="Введите email"
            :error="($v.form.email.$dirty && !$v.form.email.required) || ($v.form.email.$dirty && !$v.form.email.email)">
            <template #error>
              <span v-if="$v.form.email.$dirty && !$v.form.email.required">
                Это обязательное поле!
              </span>
              <span v-else-if="$v.form.email.$dirty && !$v.form.email.email">
                Неправильный формат почты
              </span>
            </template>
          </Input>
          <Password
            type="password"
            label="Введите пароль *"
            id="password"
            v-model="form.password"
            placeholder="Введите пароль"
            :error="($v.form.password.$dirty && !$v.form.password.required) || ($v.form.password.$dirty && !$v.form.password.minLength)">
            <template #error>
              <span v-if="$v.form.password.$dirty && !$v.form.password.required">
                Это обязательное поле!
              </span>
              <span v-else-if="$v.form.password.$dirty && !$v.form.password.minLength">
                Минимальное количество символов - 8
              </span>
            </template>
          </Password>
        </div>
        <h3 class="font-semibold mt-8 mb-4">
          Общая информация
        </h3>
        <div class="grid grid-cols-3 gap-6">
          <Input whitespace label="Фамилия" v-model="form.last_name" id="contact_last_name" placeholder="Введите фамилия"
          :error="($v.form.last_name.$dirty && !$v.form.last_name.required) || ($v.form.last_name.$dirty && !$v.form.last_name.isText)">
            <template #error>
              <span v-if="$v.form.last_name.$dirty && !$v.form.last_name.required">
                Это обязательное поле!
              </span>
              <span v-else-if="$v.form.last_name.$dirty && !$v.form.last_name.isText">
                Разерешен только буквенный формат
              </span>
            </template>
          </Input>
          <Input whitespace label="Имя" v-model="form.first_name" id="contact_first_name" placeholder="Введите имя"
          :error="($v.form.first_name.$dirty && !$v.form.first_name.required) || ($v.form.first_name.$dirty && !$v.form.first_name.isText)">
            <template #error>
              <span v-if="$v.form.first_name.$dirty && !$v.form.first_name.required">
                Это обязательное поле!
              </span>
              <span v-else-if="$v.form.first_name.$dirty && !$v.form.first_name.isText">
                Разерешен только буквенный формат
              </span>
            </template>
          </Input>
          <Input whitespace label="Отчество" v-model="form.middle_name" id="contact_middle_name" placeholder="Введите фамилия"
          :error="($v.form.middle_name.$dirty && !$v.form.middle_name.required) || ($v.form.middle_name.$dirty && !$v.form.middle_name.isText)">
            <template #error>
              <span v-if="$v.form.middle_name.$dirty && !$v.form.middle_name.required">
                Это обязательное поле!
              </span>
              <span v-else-if="$v.form.middle_name.$dirty && !$v.form.middle_name.isText">
                Разерешен только буквенный формат
              </span>
            </template>
          </Input>
          <Phone label="Номер телефона *" v-model="form.phone"
          :error="$v.form.phone.$dirty && !$v.form.phone.numericDash">
            <template #error>
              <span v-if="$v.form.phone.$dirty && !$v.form.phone.numericDash">
                Разрешен только числовой формат
              </span>
            </template>
          </Phone>
          <Select
            label="Область *"
            id="regionID"
            iconLocation="97"
            :list="subregions"
            textList="name"
            valueList="id"
            v-model="form.region"
            :error="$v.form.region.$dirty && !$v.form.region.required">
            <template #error>
              <span v-if="$v.form.region.$dirty && !$v.form.region.required">
                Это обязательное поле!
              </span>
            </template>
          </Select>
          <Select
            label="Город *"
            id="cityID"
            iconLocation="97"
            :list="subcities"
            textList="name"
            valueList="id"
            v-model="form.city"
            :error="$v.form.city.$dirty && !$v.form.city.required">
            <template #error>
              <span v-if="$v.form.city.$dirty && !$v.form.city.required">
                Это обязательное поле!
              </span>
            </template>
          </Select>
          <Select
            label="Организация *"
            id="organizationID"
            iconLocation="97"
            :list="organizations"
            textList="name"
            valueList="id"
            v-model="form.organization"
            :error="$v.form.organization.$dirty && !$v.form.organization.required">
            <template #error>
              <span v-if="$v.form.organization.$dirty && !$v.form.organization.required">
                Это обязательное поле!
              </span>
            </template>
          </Select>
        </div>
        <h3 class="font-semibold mt-8 mb-4">
          Настройки доступа и безопасность
        </h3>
        <div class="grid grid-cols-3 gap-6">
          <Select
            label="Роль *"
            id="groupID"
            iconLocation="97"
            :list="groups"
            textList="name"
            valueList="id"
            v-model="form.groups[0]"
            :error="$v.form.groups.$dirty && !$v.form.groups.required">
            <template #error>
              <span v-if="$v.form.groups.$dirty && !$v.form.groups.required">
                Это обязательное поле!
              </span>
            </template>
          </Select>
          <Select
            label="Уровень доступа *"
            id="accesslevel"
            iconLocation="97"
            :list="accessLevel"
            textList="name"
            valueList="short"
            v-model="form.access_level"
            :error="$v.form.access_level.$dirty && !$v.form.access_level.required">
            <template #error>
              <span v-if="$v.form.access_level.$dirty && !$v.form.access_level.required">
                Это обязательное поле!
              </span>
            </template>
          </Select>
          <Select
            label="Язык интерфейса *"
            id="defaultlang"
            iconLocation="97"
            :list="defaultLang"
            textList="name"
            valueList="short"
            v-model="form.default_lang"
            :error="$v.form.default_lang.$dirty && !$v.form.default_lang.required">
            <template #error>
              <span v-if="$v.form.default_lang.$dirty && !$v.form.default_lang.required">
                Это обязательное поле!
              </span>
            </template>
          </Select>
          <div class="flex flex-col gap-2">
            <p class="text-start">Учетная запись активна?</p>
              <Checkbox
                :list="checkboxActive"
                textList="name"
                valueList="value"
                :value="form.is_active"
                @click="form.is_active = !form.is_active"/>
          </div>
        </div>
      </div>
      <div class="pt-4 my-6 border-t border-[#E5E7EB] px-6 flex items-center justify-between">
        <div class="flex items-center gap-2" v-if="!isLoading">
          <p class="text-sm">Де-персонифицированный доступ</p>
          <Checkbox
              :list="checkboxAccess"
              textList="name"
              valueList="value"
              :value="form.can_see_personal_info"
              @click="form.can_see_personal_info = !form.can_see_personal_info"
            />
        </div>
        <div v-else/>
        <div class=" flex justify-end">
          <div class="flex gap-4">
            <Button white @click="showAddUser(false)">
              Отмена
            </Button>
            <Button @click="addUser">
              Добавить
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { required, email, numeric, minLength } from 'vuelidate/lib/validators'
import Tabs from '~/components/ui/tabs/full.vue'
import Button from '@/components/ui/buttons/default.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Select from '@/components/ui/selects/primary.vue'
import Input from '@/components/ui/inputs/default.vue'
import Checkbox from '@/components/ui/checkbox.vue'
import Phone from '@/components/ui/inputs/phone.vue'
import Password from '@/components/ui/inputs/password.vue'
import validators from '@/plugins/validators'
export default {
  name: 'AddUserModal',
  components: {
    Tabs,
    Button,
    LoadingDots,
    Select,
    Input,
    Checkbox,
    Phone,
    Password
  },
  props: {
    activeUser: {},
  },
  data() {
    return {
      isLoading: true,
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
        city: null,
        organization: '',
        groups: [],
      },
    }
  },
  validations() {
    return {
      form: {
        first_name: { required, isText: (value) => validators.isText(value) },
        last_name: { required, isText: (value) => validators.isText(value) },
        middle_name: { required, isText: (value) => validators.isText(value) },
        email: { required, email },
        password: { required, minLength: minLength(8)},
        phone: { numericDash: (value) => validators.numericDash(value) },
        access_level: { required },
        can_see_personal_info: { required },
        is_active: { required },
        default_lang: { required },
        region: { required },
        city: { required },
        organization: { required },
        groups: { required },
      },
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      users: (state) => state.user.users,
      subregions: (state) => state.subregion.subregions,
      groups: (state) => state.group.groups,
      subcities: (state) => state.subcity.subcities,
      organizations: (state) => state.organization.organizations,
    }),
  },
  methods: {
    ...mapMutations({
      showAddUser: 'user/SHOW_ADDUSER',
      loadingAlert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      successAlert: 'alert/success_alert',
      errorAlert: 'alert/error_alert',
      createUser: 'user/createUser',
      get_subregions: 'subregion/get_subregions',
      get_groups: 'group/get_groups',
      get_subcities: 'subcity/get_subcities',
      getOrganizations: 'organization/getOrganizations',
    }),
    async addUser() {
      if (this.$v.$invalid) {
        this.$v.form.$touch()
        return
      }
      try {
        await this.createUser(this.form)
        this.successAlert('Пользователь успешно добавлен')
        this.showAddUser(false)
      } catch (err) {
        const errors = []
        if (err.response?.data) {
          for (let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`)
          }
        }
        this.errorAlert(errors)
      }
    },
  },
  async mounted() {
    await this.get_subregions()
    await this.get_groups()
    await this.get_subcities()
    await this.getOrganizations()
    this.isLoading = false
  },
}
</script>
