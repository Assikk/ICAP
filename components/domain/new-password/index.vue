<template>
  <div class="h-screen flex">
    <div class="w-5/12 bg-[#048db7]">
      <img
        src="@/assets/img/coverage.jpg"
        alt="IMG"
        class="absolute m-auto bg-no-repeat w-5/12 h-screen"
      />
    </div>
    <div class="w-7/12 bg-[#DCF7FF] flex flex-col items-center justify-center">
      <div class="w-full bg-white rounded-lg shadow max-w-md">
        <div class="p-6 space-y-4">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center"
          >
            Создание нового пароля
          </h1>
          <p class="text-center">
            Пожалуйста, введите новый пароль для
            <br />входа в систему. Используйте комбинацию <br />цифр, строчных и
            заглавных букв.
          </p>
          <div class="mt-11 flex flex-col gap-6" @keypress.enter="confirm">
            <Password
              label="Новый пароль"
              id="password"
              v-model="form.password"
              :error="
                ($v.form.password.$dirty && !$v.form.password.required) ||
                ($v.form.password.$dirty && !$v.form.password.minLength) ||
                ($v.form.password2.$dirty && !$v.form.password2.sameAsPassword)
              "
            >
              <template #error>
                <span
                  v-if="$v.form.password.$dirty && !$v.form.password.required"
                >
                  Введите пароль
                </span>
                <span
                  v-else-if="
                    $v.form.password.$dirty && !$v.form.password.minLength
                  "
                >
                  Минимальное количество символов - 8
                </span>
                <span
                  v-else-if="
                    $v.form.password2.$dirty &&
                    !$v.form.password2.sameAsPassword
                  "
                >
                  Пароли не совпадают
                </span>
              </template>
            </Password>
            <Password
              label="Повторите новый пароль"
              id="password2"
              v-model="form.password2"
              :error="
                ($v.form.password2.$dirty && !$v.form.password2.required) ||
                ($v.form.password2.$dirty && !$v.form.password2.minLength) ||
                ($v.form.password2.$dirty && !$v.form.password2.sameAsPassword)
              "
            >
              <template #error>
                <span
                  v-if="$v.form.password2.$dirty && !$v.form.password2.required"
                >
                  Введите пароль
                </span>
                <span
                  v-else-if="
                    $v.form.password2.$dirty && !$v.form.password2.minLength
                  "
                >
                  Минимальное количество символов - 8
                </span>
                <span
                  v-else-if="
                    $v.form.password2.$dirty &&
                    !$v.form.password2.sameAsPassword
                  "
                >
                  Пароли не совпадают
                </span>
              </template>
            </Password>
            <Button :disabled="disabledConfirm" @click="confirm" class="w-full justify-center">
              Войти
            </Button>
            <NuxtLink to="/login" class="text-sm font-medium text-[]">
              <<< Назад к входу
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import Password from '@/components/ui/inputs/password.vue'
import Button from '@/components/ui/buttons/default.vue'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'NewPasswordComponent',
  components: {
    Password,
    Button,
  },
  data() {
    return {
      form: {
        password: '',
        password2: '',
      },
      disabledConfirm: false,
    }
  },
  validations() {
    return {
      form: {
        password: { required, minLength: minLength(8) },
        password2: {
          required,
          minLength: minLength(8),
          sameAsPassword: (value) => value == this.form.password,
        },
      },
    }
  },
  methods: {
    ...mapMutations({
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      new_password: 'authorization/new_password',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      validate_token: 'authorization/validate_token',
    }),
    async confirm() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (!this.disabledConfirm) {
        this.disabledConfirm = true
        try {
          this.loading_alert()
          await this.new_password({
            password: this.form.password,
            password2: this.form.password2,
            token: this.$route.query.token,
          })
          this.success_alert('Please, login again')
        } catch (err) {
          this.disabledConfirm = false
          const errors = []
          for (let key in err.response.data) {
            errors.push(`${err.response.data[key]}`)
          }
          this.error_alert(errors)
          // this.error_alert(err.response.data.non_field_errors ? err.response.data.non_field_errors : err.response.data.password)
        }
      }
    },
  },
  async mounted() {
    await this.validate_token(this.$route.query.token)
  },
}
</script>
