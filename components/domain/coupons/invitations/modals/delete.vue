<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="showDeleteInvitation(false)"/>
    <div class="relative bg-white text-center rounded-md px-6 py-4 flex flex-col gap-4 w-96">
      <div>
        <h2 class="font-semibold text-lg my-3 text-[#1F2937]">Удаление</h2>
        <p class="text-sm text-[#5E6470] mb-4">
          Вы уверены что хотите удалить этот купона?
          <br />При удаление все данные купона удаляется <br />из базы данных
        </p>
      </div>
      <div class="flex gap-3 py-3 px-8 border-t border-t-[#E5E7EB]">
        <Button white full @click="showDeleteInvitation(false)" class="w-full justify-center"> Отмена </Button>
        <Button :disabled="disabledDelete" full @click="deleteInvitation" class="w-full justify-center">
          Да
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import Button from '@/components/ui/buttons/default.vue'
export default {
  name: 'DeleteCouponModal',
  components: {
    Button,
  },
  props: {
    activeInvitation: {},
    activePage: {}
  },
  data() {
    return {
      disabledDelete: false,
    }
  },
  methods: {
    ...mapMutations({
      showDeleteInvitation: 'invitation/SHOW_DELETEINVITATION',
      loadingAlert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      deleteInvitation: 'invitation/deleteInvitation',
      getInvitations: 'invitation/getInvitations',
      successAlert: 'alert/success_alert',
      errorAlert: 'alert/error_alert',
    }),
    async deleteInvitation() {
      if (!this.disabledDelete) {
        this.disabledDelete = true
        try {
          this.loadingAlert()
          await this.deleteInvitation(this.activeInvitation.id)
          await this.getInvitations({page: this.activePage})
          this.successAlert('Купон был успешно удален')
        } catch (err) {
          const errors = []
          if (err.response && err.response.data) {
            for (let key in err.response.data) {
              errors.push(`${key} - ${err.response.data[key][0]}`)
            }
          }
          this.errorAlert(errors)
          this.disabledDelete = false
        }
      }
    },
  },
}
</script>
