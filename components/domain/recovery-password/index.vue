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
          <div>
            <h1 class="mb-3 font-extrabold text-2xl text-center">
              Восстановление пароля
            </h1>
            <p class="text-sm font-medium text-center">
              Чтобы восстановить пароль введите адрес вашей электронной почты
            </p>
          </div>
          <div class="mt-11 flex flex-col" @keypress.enter="send">
            <Input
              label="Email"
              id="email"
              v-model="email"
              placeholder="Введите Email"
              :error="
                ($v.email.$dirty && !$v.email.required) ||
                ($v.email.$dirty && !$v.email.email)
              "
            >
              <template #error>
                <span v-if="$v.email.$dirty && !$v.email.required">
                  Введите свой e-mail
                </span>
                <span v-else-if="$v.email.$dirty && !$v.email.email">
                  Неправильная почта
                </span>
              </template>
            </Input>
            <Button
              class="w-full justify-center mt-6"
              @click="send"
              :disabled="disabledSend"
            >
              Продолжить
            </Button>
            <!-- <NuxtLink to="/login" class="text-sm font-medium">
              Back to Sign in
            </NuxtLink> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import Input from '@/components/ui/inputs/default.vue'
import Button from '@/components/ui/buttons/default.vue'
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'RecoveryPasswordComponent',
  components: {
    Input,
    Button,
  },
  data() {
    return {
      email: '',
      disabledSend: false,
    }
  },
  validations: {
    email: { required, email },
  },
  methods: {
    ...mapMutations({
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      reset_password: 'authorization/reset_password',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
    }),
    async send() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (!this.disabledSend) {
        this.disabledSend = true
        try {
          this.loading_alert()
          await this.reset_password({
            email: this.email,
          })
          this.success_alert('Пожалуйста, введите новый пароль')
        } catch (err) {
          this.disabledSend = false
          this.error_alert(err.response.data.email)
        }
      }
    },
  },
}
</script>
