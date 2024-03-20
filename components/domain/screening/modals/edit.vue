<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full"
      @click="showEditUser(false)"
    />
    <div
      class="relative overflow-y-auto bg-white rounded-md flex flex-col justify-between p-6"
    >
      <div class="mt-3 text-center">
        <div class="flex justify-between pb-8">
          <div>
            <h3
              class="text-lg font-medium leading-6 text-gray-900"
              id="modal-title"
            >
              Изменить область
            </h3>
          </div>
          <div class="cursor-pointer" @click="showEditUser(false)">
            <img src="@/assets/img/close-icon.svg" alt="close" />
          </div>
        </div>
        <div class="grid gap-8">
          <div class="flex justify-between gap-4">
            <div class="col-span-1 w-1/2">
              <label
                for="helper-text"
                class="block mb-1 text-sm text-start font-medium text-[#4D5D7D]"
                >Email <span class="text-red-600 absolute"></span
              ></label>
              <input
                type="email"
                required
                v-model="email"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                class="bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 placeholder-[#B3B9C9] text-[#4D5D7D] focus:ring-blue-500 focus:border-blue-500"
                placeholder="Введите Email"
              />
            </div>
            <div class="col-span-1 w-1/2">
              <label
                for="helper-text"
                class="block mb-1 text-sm text-start font-medium text-[#4D5D7D]"
                >Пароль <span class="text-red-600 absolute"></span
              ></label>
              <input
                type="password"
                required
                v-model="password"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                class="bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 placeholder-[#B3B9C9] text-[#4D5D7D] focus:ring-blue-500 focus:border-blue-500"
                placeholder="Введите Пароль"
              />
            </div>
          </div>
          <div class="mt-0">
            <h3 class="flex justify-start pb-4 font-semibold">
              Общая информация
            </h3>
            <div class="flex justify-between gap-4">
              <div class="col-span-1 w-1/3">
                <label
                  for="helper-text"
                  class="block mb-1 text-sm text-start font-medium text-[#4D5D7D]"
                  >Фамилия* <span class="text-red-600 absolute"></span
                ></label>
                <input
                  type="text"
                  required
                  v-model="first_name"
                  id="helper-text"
                  aria-describedby="helper-text-explanation"
                  class="bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 placeholder-[#B3B9C9] text-[#4D5D7D] focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введите Фамилию"
                />
              </div>
              <div class="col-span-1 w-1/3">
                <label
                  for="helper-text"
                  class="block mb-1 text-sm text-start font-medium text-[#4D5D7D]"
                  >Имя* <span class="text-red-600 absolute"></span
                ></label>
                <input
                  type="text"
                  required
                  v-model="last_name"
                  id="helper-text"
                  aria-describedby="helper-text-explanation"
                  class="bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 placeholder-[#B3B9C9] text-[#4D5D7D] focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введите Имя"
                />
              </div>
              <div class="col-span-1 w-1/3">
                <label
                  for="helper-text"
                  class="block mb-1 text-sm text-start font-medium text-[#4D5D7D]"
                  >Отчество* <span class="text-red-600 absolute"></span
                ></label>
                <input
                  type="text"
                  required
                  v-model="middle_name"
                  id="helper-text"
                  aria-describedby="helper-text-explanation"
                  class="bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 placeholder-[#B3B9C9] text-[#4D5D7D] focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введите Отчество"
                />
              </div>
            </div>
            <div class="flex justify-between gap-4">
              <div class="col-span-1 w-1/3">
                <label
                  for="helper-text"
                  class="block mb-1 text-sm text-start font-medium text-[#4D5D7D]"
                  >Номер телефона* <span class="text-red-600 absolute"></span
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
                      v-model="phone"
                      class="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-xs"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      placeholder="Введите номер"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="col-span-1 w-1/3">
                <label
                  for="helper-text"
                  class="block mb-1 text-sm text-start font-medium text-[#4D5D7D]"
                  >Область* <span class="text-red-600 absolute"></span
                ></label>
                <Select
                  placeholder="Выберете область"
                  :list="users"
                  textList="region"
                  valueList="id"
                  :activeId="region"
                  @click="(value) => (region = value.id)"
                >
                </Select>
              </div>
              <div class="col-span-1 w-1/3">
                <label
                  for="helper-text"
                  class="block mb-1 text-sm text-start font-medium text-[#4D5D7D]"
                  >Город* <span class="text-red-600 absolute"></span
                ></label>
                <Select
                  placeholder="Выберете город"
                  :list="users"
                  textList="city"
                  valueList="id"
                  :activeId="city"
                  @click="(value) => (city = value.id)"
                >
                </Select>
              </div>
            </div>
            <div class="flex justify-between gap-x-4">
              <div class="col-span-1 w-1/3">
                <label
                  for="helper-text"
                  class="block mb-1 text-sm text-start font-medium text-[#4D5D7D]"
                  >Организация* <span class="text-red-600 absolute"></span
                ></label>
                <Select
                  placeholder="Выберете организацию"
                  class="whitespace-nowrap"
                  :list="users"
                  textList="organization"
                  valueList="id"
                  :activeId="organization"
                  @click="(value) => (organization = value.id)"
                >
                </Select>
              </div>
              <div class="col-span-1 w-1/3"></div>
            </div>
          </div>
          <div class="mt-0">
            <h3 class="flex justify-start pb-4 font-semibold">
              Настройки доступа и безопасность
            </h3>
            <div class="flex justify-between gap-x-4">
              <div class="col-span-1 w-1/3">
                <label
                  for="helper-text"
                  class="block mb-1 text-sm text-start font-medium text-[#4D5D7D]"
                  >Роль* <span class="text-red-600 absolute"></span
                ></label>
                <Select
                  placeholder="Выберете роль"
                  :list="users"
                  textList="region"
                  valueList="id"
                  :activeId="city"
                  @click="(value) => (city = value.id)"
                >
                </Select>
              </div>
              <div class="col-span-1 w-1/3">
                <label
                  for="helper-text"
                  class="block mb-1 text-sm text-start font-medium text-[#4D5D7D]"
                  >Уровень доступа* <span class="text-red-600 absolute"></span
                ></label>
                <Select
                  placeholder="Выберете уровень"
                  :list="users"
                  textList="groups"
                  valueList="id"
                  :activeId="groups"
                  @click="(value) => (groups = value.id)"
                >
                </Select>
              </div>
              <div class="col-span-1 w-1/3">
                <label
                  for="helper-text"
                  class="block mb-1 text-sm text-start font-medium text-[#4D5D7D]"
                  >Язык интерфейса <span class="text-red-600 absolute"></span
                ></label>
                <Select
                  placeholder="Выберете язык"
                  :list="users"
                  textList="region"
                  valueList="id"
                  :activeId="city"
                  @click="(value) => (city = value.id)"
                >
                </Select>
              </div>
            </div>
          </div>
          <div class="mb-4 flex items-center">
            <p class="text-start">Учетная запись активна?</p>
            <div class="flex jusify-start">
              <ul class="flex mx-4 bg-gray-100 p-1 rounded-lg">
                <li>
                  <input
                    type="radio"
                    id="hosting-small"
                    name="hosting"
                    value="hosting-small"
                    class="hidden peer"
                    required
                  />
                  <label
                    for="hosting-small"
                    class="inline-flex items-center justify-between w-full px-4 py-2 bg-[#F3F4F6] text-gray-400 rounded-lg cursor-pointer peer-checked:border-[#0A7194] peer-checked:text-white peer-checked:bg-[#0A7194]"
                  >
                    <div class="block">
                      <div class="w-full text-sm font-semibold">Нет</div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="hosting-big"
                    name="hosting"
                    value="hosting-big"
                    class="hidden peer"
                  />
                  <label
                    for="hosting-big"
                    class="inline-flex items-center justify-between w-full px-4 py-2 text-gray-400 rounded-lg cursor-pointer peer-checked:border-[#0A7194] peer-checked:text-white peer-checked:bg-[#0A7194]"
                  >
                    <div class="block">
                      <div class="w-full text-sm font-semibold">Да</div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-between py-3 border-t border-t-[#E5E7EB]"
      >
        <div class="flex items-center">
          <p class="text-sm">Де-персонифицированный доступ</p>
          <div class="flex jusify-start">
            <ul class="flex mx-4 bg-gray-100 p-1 rounded-lg">
              <li>
                <input
                  type="radio"
                  id="hosting-small2"
                  name="hosting2"
                  value="hosting-small2"
                  class="hidden peer"
                  required
                />
                <label
                  for="hosting-small2"
                  class="inline-flex items-center justify-between w-full px-4 py-2 bg-[#F3F4F6] text-gray-400 rounded-lg cursor-pointer peer-checked:border-[#0A7194] peer-checked:text-white peer-checked:bg-[#0A7194]"
                >
                  <div class="block">
                    <div class="w-full text-sm font-semibold">OFF</div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="hosting-big2"
                  name="hosting2"
                  value="hosting-big2"
                  class="hidden peer"
                />
                <label
                  for="hosting-big2"
                  class="inline-flex items-center justify-between w-full px-4 py-2 text-gray-400 rounded-lg cursor-pointer peer-checked:border-[#0A7194] peer-checked:text-white peer-checked:bg-[#0A7194]"
                >
                  <div class="block">
                    <div class="w-full text-sm font-semibold">ON</div>
                  </div>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex gap-4">
          <Button white medium @click="showEditUser(false)"> Отмена </Button>
          <Button medium @click="editUser"> Сохранить </Button>
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
import Select from '@/components/ui/selects/default.vue'
export default {
  name: 'EditUserModal',
  components: {
    Tabs,
    Button,
    LoadingDots,
    Select,
  },
  props: {
    activeUser: {},
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      users: (state) => state.user.users,
    }),
  },
  data() {
    return {
      activeTab: 1,
      isLoading: false,
      form: {},
      first_name: '',
      last_name: '',
      middle_name: '',
      groups: [],
      city: '',
      organization: '',
      phone: '',
      is_active: '',
    }
  },
  validations: {
    information: {
      brand: { required },
      vin: {
        required,
        vinCode: (value) => {
          return value && value.length == 17
        },
      },
      model: { required },
      license_plate_no: { required },
      year: { required },
      licence_plate_issuing_state: { required },
      fuel_type: { required },
      eld_device: { required },
    },
  },
  methods: {
    ...mapMutations({
      showEditUser: 'user/SHOW_EDITUSER',
      loadingAlert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      successAlert: 'alert/success_alert',
      errorAlert: 'alert/error_alert',
      getUser: 'user/getUser',
      editUser: 'user/editUser',
    }),
    async editUser() {
      try {
        const editedUser = {
          id: this.form.id,
          form: {
            first_name: this.first_name,
            last_name: this.last_name,
            middle_name: this.middle_name,
            groups: this.groups,
            city: this.city,
            organization: this.organization,
            phone: this.phone,
            is_active: this.is_active,
          },
        }
        await this.editUser(editedUser)
        this.successAlert('Регион успешно изменён')
        this.showEditUser(false)
      } catch (err) {
        const errors = []
        if (err.response?.data) {
          for (let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key][0]}`)
          }
        } else {
          errors.push('Ошибка редактировании Региона')
        }
        this.errorAlert(errors)
      }
    },
  },
  async mounted() {
    await this.getUser(this.activeUser.id)
    this.form = structuredClone(this.activeUser)
    this.isLoading = false
  },
}
</script>
