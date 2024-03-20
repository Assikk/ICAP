<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full"
      @click="show_deletecommunication(false)"
    />
    <div
      class="relative bg-white text-center rounded-md px-6 py-4 flex flex-col gap-4 w-96"
    >
      <div>
        <h2 class="font-semibold text-lg my-3 text-[#1F2937]">Удаление</h2>
        <p class="text-sm text-[#5E6470] mb-4">
          Вы уверены что хотите удалить этот Предпочитаемый метод связи?
          <br />При удаление все данные Предпочитаемый метод связи удаляется
          <br />из базы данных
        </p>
      </div>
      <div class="flex gap-3 py-3 px-8 border-t border-t-[#E5E7EB]">
        <Button white full @click="show_deletecommunication(false)" class="w-full justify-center">
          Отмена
        </Button>
        <Button :disabled="disabledDelete" full @click="deleteCommunication" class="w-full justify-center">
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
  name: 'DeletePartnerModal',
  components: {
    Button,
  },
  props: {
    activeCommunication: {},
  },
  data() {
    return {
      disabledDelete: false,
    }
  },
  methods: {
    ...mapMutations({
      show_deletecommunication: 'communication/SHOW_DELETECOMMUNICATION',
      loading_alert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      delete_communication: 'communication/delete_communication',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
    }),
    async deleteCommunication() {
      if (!this.disabledDelete) {
        this.disabledDelete = true
        try {
          this.loading_alert()
          await this.delete_communication(this.activeCommunication.id)
          this.success_alert('Предпочитаемый метод связи был успешно удален')
        } catch (err) {
          const errors = []
          if (err.response && err.response.data) {
            for (let key in err.response.data) {
              errors.push(`${key} - ${err.response.data[key][0]}`)
            }
          } else {
            errors.push(
              'Предпочитаемый метод связи при удаления Предпочитаемый метод связи'
            )
          }
          this.error_alert(errors)
          this.disabledDelete = false
        }
      }
    },
  },
}
</script>
