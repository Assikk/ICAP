<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="showAddOrganization(false)"/>
    <div class="relative bg-white rounded-md pt-6 w-[1180px]">
      <div class="flex items-center justify-between gap-4 mb-8 px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Добавление организации
        </h3>
        <svg width="24" height="24" fill="#B3B9C9" class="cursor-pointer" @click="showAddOrganization(false)">
          <use xlink:href="#close"/>
        </svg>
      </div>
      <div v-if="isLoading" class="h-[542px] relative">
        <LoadingDots class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"/>
      </div>
      <div v-else class="px-6">
        <h3 class="font-semibold mb-4">
          Общая информация
        </h3>
        <div class="grid grid-cols-3 gap-6">
          <Select iconLocation="97" label="Полное название *" id="organization_name"
            :list="suborganizations" textList="name" valueList="id" v-model="form.organization_name"
            :error="$v.form.organization_name.$dirty && !$v.form.organization_name.required"
            @input="clickOrganzation">
            <template #error>
              <span v-if="$v.form.organization_name.$dirty && !$v.form.organization_name.required">
                Это обязательное поле!
              </span>
            </template>
          </Select>
          <Input label="Сокращенное название" v-model="form.short_name_ru" disabled/>
          <Input label="БИН" v-model="form.bin" disabled/>
        </div>
        <h3 class="font-semibold mb-4 mt-8">
          Контактная информация
        </h3>
        <div class="grid grid-cols-3 gap-6">
          <Input whitespace label="Фамилия" v-model="form.contact_last_name" id="contact_last_name" placeholder="Введите фамилию"
          :error="$v.form.contact_last_name.$dirty && !$v.form.contact_last_name.isText">
            <template #error>
              <span v-if="$v.form.contact_last_name.$dirty && !$v.form.contact_last_name.isText">
                Разерешен только буквенный формат
              </span>
            </template>
          </Input>
          <Input whitespace label="Имя" v-model="form.contact_first_name" id="contact_first_name" placeholder="Введите имя"
          :error="$v.form.contact_first_name.$dirty && !$v.form.contact_first_name.isText">
            <template #error>
              <span v-if="$v.form.contact_first_name.$dirty && !$v.form.contact_first_name.isText">
                Разерешен только буквенный формат
              </span>
            </template>
          </Input>
          <Input whitespace label="Отчество" v-model="form.contact_middle_name" id="contact_middle_name" placeholder="Введите фамилия"
          :error="$v.form.contact_middle_name.$dirty && !$v.form.contact_middle_name.isText">
            <template #error>
              <span v-if="$v.form.contact_middle_name.$dirty && !$v.form.contact_middle_name.isText">
                Разерешен только буквенный формат
              </span>
            </template>
          </Input>
          <Input label="Введите должность" id="contact_designation" v-model="form.contact_designation"/>
          <Phone label="Номер телефона" v-model="form.contact_phone"
          :error="$v.form.contact_phone.$dirty && !$v.form.contact_phone.numericDash">
            <template #error>
              <span v-if="$v.form.contact_phone.$dirty && !$v.form.contact_phone.numericDash">
                Разрешен только числовой формат
              </span>
            </template>
          </Phone>
          <Input whitespace label="Email" id="contact_email" v-model="form.contact_email"
          :error="$v.form.contact_email.$dirty && !$v.form.contact_email.email">
            <template #error>
              <span v-if="$v.form.contact_email.$dirty && !$v.form.contact_email.email">
                Неправильный формат
              </span>
            </template>
          </Input>
        </div>
        <h3 class="font-semibold mb-4 mt-8">
          Адрес
        </h3>
        <div class="grid grid-cols-3 gap-6">
          <Select
            iconLocation="97"
            label="Страна *"
            id="country"
            :list="countries"
            textList="name"
            valueList="id"
            v-model="form.country"
            :error="$v.form.country.$dirty && !$v.form.country.required">
            <template #error>
              <span v-if="$v.form.country.$dirty && !$v.form.country.required">
                Это обязательное поле!
              </span>
            </template>
          </Select>
          <Select
            iconLocation="97"
            label="Область *"
            id="regionId"
            :list="subregions"
            textList="name_ru"
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
            iconLocation="97"
            label="Город *"
            id="cityID"
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
          <Input label="Улица *" id="street" v-model="form.street"/>
        </div>
      </div>
      <div class="pt-4 my-6 border-t border-[#E5E7EB] px-6 flex justify-end">
        <div class="flex gap-4">
          <Button white @click="showAddOrganization(false)">
            Отмена
          </Button>
          <Button :disabled="disabledAdd" @click="addOrganization">
            Добавить
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import Button from '@/components/ui/buttons/default.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Select from '@/components/ui/selects/primary.vue'
import Input from '@/components/ui/inputs/default.vue'
import Phone from '@/components/ui/inputs/phone.vue'
import validators from '@/plugins/validators'
export default {
  name: 'AddOrganizationModal',
  components: {
    Button,
    LoadingDots,
    Select,
    Input,
    Phone,
  },
  data() {
    return {
      isLoading: true,
      form: {
        contact_first_name: null,
        contact_last_name: null,
        contact_middle_name: null,
        short_name_ru: null,
        bin: null,
        contact_email: null,
        contact_phone: null,
        country: null,
        street: null,
        region: null,
        city: null,
        organization_name: null,
        contact_designation: null,
      },
      disabledAdd: false
    }
  },
  validations() {
    return {
      form: {
        contact_first_name: { isText: (value) => validators.isText(value) || !value},
        contact_last_name: { isText: (value) => validators.isText(value) || !value},
        contact_middle_name: { isText: (value) => validators.isText(value) || !value},
        contact_email: { email },
        contact_phone: { numericDash: (value) => validators.numericDash(value) || !value},
        country: { required },
        region: { required },
        city: { required },
        organization_name: { required },
      },
    }
  },
  computed: {
    ...mapState({
      organizations: (state) => state.organization.organizations,
      subregions: (state) => state.subregion.subregions,
      countries: (state) => state.country.countries,
      subcities: (state) => state.subcity.subcities,
      suborganizations: (state) => state.suborganization.suborganizations,
    }),
  },
  methods: {
    ...mapMutations({
      showAddOrganization: 'organization/SHOW_ADDORGANIZATION',
      loadingAlert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      successAlert: 'alert/success_alert',
      errorAlert: 'alert/error_alert',
      createOrganization: 'organization/createOrganization',
      get_subregions: 'subregion/get_subregions',
      get_countries: 'country/get_countries',
      get_groups: 'group/get_groups',
      get_subcities: 'subcity/get_subcities',
      get_suborganizations: 'suborganization/get_suborganizations',
    }),
    async addOrganization() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if(!this.disabledAdd) {
        this.disabledAdd = true
        try {
          for (let key in this.form) { /* Бэк не ожидает пустых строк, поэтому заменяем их на null */
            if(this.form[key] === '') {
              this.form[key] = null
            }
          }
          this.loadingAlert()
          await this.createOrganization(this.form)
          this.successAlert('Организация успешно добавлена')
          this.showAddOrganization(false)
        } catch (err) {
          const errors = []
          if (err.response?.data) {
            for (let key in err.response.data) {
              errors.push(`${key} - ${err.response.data[key][0]}`)
            }
          }
          this.errorAlert(errors)
          this.disabledAdd = false
        }
      }
    },
    clickOrganzation(value) {
      let organization
      organization = this.suborganizations.filter( (item) => item.id == value)[0]
      this.form.organization_name = organization.id
      this.form.short_name_ru = organization.short_name_ru
      this.form.bin = organization.bin
    },
  },
  async mounted() {
    await this.get_subregions()
    await this.get_countries()
    await this.get_groups()
    await this.get_subcities()
    await this.get_suborganizations()
    this.isLoading = false
  },
}
</script>
