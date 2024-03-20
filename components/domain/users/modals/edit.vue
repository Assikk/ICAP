<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="showEditUser(false)"/>
    <div class="relative bg-white rounded-md pt-6 w-[848px]">
      <div class="flex items-center justify-between gap-4 mb-8 px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Редактирование пользователя
        </h3>
        <svg width="24" height="24" fill="#B3B9C9" class="cursor-pointer" @click="showEditUser(false)">
          <use xlink:href="#close"/>
        </svg>
      </div>
      <div v-if="isLoading" class="h-[590px] relative">
        <LoadingDots class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"/>
      </div>
      <div v-else class="px-6">
        <div class="grid grid-cols-3 gap-6">
          <Input whitespace label="Email *" v-model="form.email"
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
          <Password type="password" label="Введите пароль *"
          v-model="form.password" placeholder="Введите пароль"
          :error="$v.form.password.$dirty && !$v.form.password.minLength">
          <template #error>
            <span v-if="$v.form.password.$dirty && !$v.form.password.minLength">
              Минимальное количество символов - 8
            </span>
          </template>
          </Password>
        </div>
        <h3 class="font-semibold mt-8 mb-4">
          Общая информация
        </h3>
        <div class="grid grid-cols-3 gap-6">
          <Input whitespace label="Фамилия" v-model="form.last_name" placeholder="Введите фамилия"
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
          <Input whitespace label="Имя" v-model="form.first_name" placeholder="Введите имя"
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
          <Input whitespace label="Отчество" v-model="form.middle_name" placeholder="Введите фамилия"
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
          <Select label="Область *" id="subRegion" iconLocation="97"
          :list="subregions" textList="name" valueList="id"
          v-model="form.region"
          :error="$v.form.region.$dirty && !$v.form.region.required">
            <template #error>
              <span v-if="$v.form.region.$dirty && !$v.form.region.required">
                Это обязательное поле!
              </span>
            </template>
          </Select>
          <Select label="Город *" id="cityID" iconLocation="97" :list="subcities"
          textList="name" valueList="id" v-model="form.city"
          :error="$v.form.city.$dirty && !$v.form.city.required">
            <template #error>
              <span v-if="$v.form.city.$dirty && !$v.form.city.required">
                Это обязательное поле!
              </span>
            </template>
          </Select>
          <Select label="Организация *" id="organizationID" iconLocation="97"
          :list="organizations" textList="name" valueList="id" v-model="form.organization"
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
          <Select label="Роль *" id="groupID" iconLocation="97" :list="groups"
          textList="name" valueList="id" v-model="form.groups[0]"
          :error="$v.form.groups.$dirty && !$v.form.groups.required">
            <template #error>
              <span v-if="$v.form.groups.$dirty && !$v.form.groups.required">
                Это обязательное поле!
              </span>
            </template>
          </Select>
          <Select label="Уровень доступа *" id="accesslevel" iconLocation="97"
          :list="accessLevel" textList="name" valueList="short" v-model="form.access_level"
          :error="$v.form.access_level.$dirty && !$v.form.access_level.required">
            <template #error>
              <span v-if="$v.form.access_level.$dirty && !$v.form.access_level.required">
                Это обязательное поле!
              </span>
            </template>
          </Select>
          <Select label="Язык интерфейса *" id="defaultlang" iconLocation="97" :list="defaultLang"
          textList="name" valueList="short" v-model="form.default_lang"
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
                @click="form.is_active = !form.is_active"
              />
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
            <Button white @click="showEditUser(false)">
              Отмена
            </Button>
            <Button :disabledEdit="disabledEdit" @click="submitEditUser">
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
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
  name: 'EditUserModal',
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
    activePage: {}
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
      disabledEdit: false
    }
  },
  validations() {
    return {
      form: {
        first_name: { required, isText: (value) => validators.isText(value)},
        last_name: { required, isText: (value) => validators.isText(value)},
        middle_name: { required, isText: (value) => validators.isText(value)},
        email: { required, email },
        phone: { numericDash: (value) => validators.numericDash(value) },
        password: { minLength: minLength(8)},
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
      user: (state) => state.user.user,
      users: (state) => state.user.users,
      subregions: (state) => state.subregion.subregions,
      groups: (state) => state.group.groups,
      subcities: (state) => state.subcity.subcities,
      organizations: (state) => state.organization.organizations,
    }),
  },
  methods: {
    ...mapMutations({
      showEditUser: 'user/SHOW_EDITUSER',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      successAlert: 'alert/success_alert',
      errorAlert: 'alert/error_alert',
      getUser: 'user/getUser',
      getUsers: 'user/getUsers',
      editUser: 'user/editUser',
      get_subregions: 'subregion/get_subregions',
      get_groups: 'group/get_groups',
      get_subcities: 'subcity/get_subcities',
      getOrganizations: 'organization/getOrganizations',
    }),
    async submitEditUser() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if(!this.disabledEdit) {
        this.disabledEdit = true
        try {
          this.loading_alert()
          if(!this.form.password) {
            delete this.form.password
          }
          await this.editUser({
            id: this.activeUser.id,
            form: this.form
          })
          await this.getUsers({page: this.activePage})
          this.successAlert('Пользователь успешно изменён')
          this.showEditUser(false)
        } catch(err) {
          const errors = []
          if (err.response && err.response.data) {
            for (let key in err.response.data) {
              errors.push(`${key} - ${err.response.data[key][0]}`)
            }
          } else {
            errors.push('Ошибка редактировании пользователя')
          }
          this.errorAlert(errors)
          this.disabledEdit = false
        }
      }
    },
    async get_user() {
      await this.getUser(this.activeUser.id)
      for (let keyUser in this.user) {
        for (let keyForm in this.form) {
          if(keyUser == keyForm) {
            this.form[keyForm] = this.user[keyUser]
          }
        }
      }
      this.form.region = this.form.region?.id
      this.form.city = this.form.city?.id
      this.form.organization = this.form.organization?.id
      this.form.groups = []
      this.form.groups.push(this.user.groups[0].id)
    }
  },
  async mounted() {
    await this.get_subregions()
    await this.getOrganizations()
    await this.get_groups()
    await this.get_user()
    this.isLoading = false
  },
}
</script>

