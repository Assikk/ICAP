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
            Авторизация
          </h1>
          <p class="text-center">
            Пожалуйста, введите свои учетные <br />
            данные для входа
          </p>
          <div class="mt-14 flex flex-col gap-6" @keypress.enter="auth">
            <Select
              placeholder="Выберите язык"
              label="Язык"
              :list="langs"
              textList="name"
              valueList="value"
              :activeId="form.default_lang"
              @click="(item) => (form.default_lang = item.value)"
            >
            </Select>
            <Input
              label="Email"
              id="email"
              v-model="form.email"
              placeholder="Введите Email"
              :error="
                ($v.form.email.$dirty && !$v.form.email.required) ||
                ($v.form.email.$dirty && !$v.form.email.email)
              "
            >
              <template #error>
                <span v-if="$v.form.email.$dirty && !$v.form.email.required">
                  Введите свой e-mail
                </span>
                <span v-else-if="$v.form.email.$dirty && !$v.form.email.email">
                  Неправильная почта
                </span>
              </template>
            </Input>
            <Password
              label="Пароль"
              id="password"
              v-model="form.password"
              placeholder="Введите пароль"
              :error="
                ($v.form.password.$dirty && !$v.form.password.required) ||
                ($v.form.password.$dirty && !$v.form.password.minLength)
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
              </template>
            </Password>
            <NuxtLink
              class="text-right text-sm font-medium text-[#038DB7]"
              to="/recovery-password"
            >
              Забыли пароль?
            </NuxtLink>
            <Button @click="auth" :disabled="disabledSign" class="w-full justify-center">
              Войти
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapActions } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
import Input from '@/components/ui/inputs/default.vue'
import Password from '@/components/ui/inputs/password.vue'
import Button from '@/components/ui/buttons/default.vue'
import Select from '@/components/ui/selects/default.vue'
export default {
  name: 'LoginComponent',
  head: {
    title: 'Авторизация',
  },
  components: {
    Input,
    Password,
    Button,
    Select,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        default_lang: 'RU',
      },
      disabledSign: false,
      langs: [
        {
          id: 1,
          name: 'Русский',
          value: 'RU',
        },
        {
          id: 2,
          name: 'Казахский',
          value: 'KK',
        },
      ],
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(5) },
    },
  },
  methods: {
    ...mapMutations({
      loading_alert: 'alert/LOADING_ALERT',
      change_permissions: 'SET_PERMISSIONS'
    }),
    ...mapActions({
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
    }),
    async auth() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (!this.disabledSign) {
        this.disabledSign = true
        try {
          this.loading_alert()
          await this.$auth.loginWith('local', {
            data: {
              email: this.form.email,
              password: this.form.password,
              default_lang: this.form.default_lang,
            },
          })
          this.success_alert('Вы успешно вошли в систему!')
        } catch (err) {
          this.disabledSign = false
          this.error_alert(err.response.data.non_field_errors)
        }
      }
    },
  },
}
</script>
