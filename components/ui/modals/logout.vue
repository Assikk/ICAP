<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="bg-white text-center rounded-md p-6 flex flex-col gap-4 w-[350px]"
    >
      <div>
        <svg
          class="mx-auto"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="24" fill="#FEE2E2" />
          <path
            d="M24 21V23M24 27H24.01M17.0718 31H30.9282C32.4678 31 33.4301 29.3333 32.6603 28L25.7321 16C24.9623 14.6667 23.0378 14.6667 22.268 16L15.3398 28C14.57 29.3333 15.5322 31 17.0718 31Z"
            stroke="#EF4444"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h2 class="font-bold text-lg my-3 text-[#1F2937]">Вы хотите выйти?</h2>
        <p class="text-sm text-[#5E6470] pb-8">
          Вы уверены, что хотите выйти? Иначе вам придётся снова авторизовать
          свой аккаунт!
        </p>
      </div>
      <div class="flex gap-3">
        <Button class="w-full justify-center" white full @click="show_logout(false)"> Нет, вернуться </Button>
        <Button class="w-full justify-center" full @click="logout" :disabled="disabledLogout">
          Да, выйти
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import Button from '@/components/ui/buttons/default.vue'
export default {
  name: 'DeletePartnerModal',
  components: {
    Button,
  },
  data() {
    return {
      disabledLogout: false,
    }
  },
  methods: {
    ...mapMutations({
      show_logout: 'authorization/SHOW_LOGOUT',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
    }),
    async logout() {
      if (!this.disabledLogout) {
        this.disabledLogout = true
        try {
          this.loading_alert()
          await this.$auth.logout()
          this.show_logout(false)
          this.success_alert('Вы успешно вышли из системы!')
          this.$router.push('/login')
        } catch (err) {
          this.disabledLogout = false
          this.error_alert('error')
        }
      }
    },
  },
}
</script>
