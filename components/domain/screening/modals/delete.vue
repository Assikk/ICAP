<template>
  <div
    class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full"
      @click="showDeleteUser(false)"
    />
    <div
      class="relative bg-white text-center rounded-md px-6 py-4 flex flex-col gap-4 w-96"
    >
      <div>
        <h2 class="font-semibold text-lg my-3 text-[#1F2937]">Удаление</h2>
        <p class="text-sm text-[#5E6470] mb-4">
          Вы уверены что хотите удалить этот город?
          <br />При удаление все данные города удаляется <br />из базы данных
        </p>
      </div>
      <div class="flex gap-3 py-3 px-8 border-t border-t-[#E5E7EB]">
        <Button white full @click="showDeleteUser(false)" class="w-full justify-center"> Отмена </Button>
        <Button :disabled="disabledDelete" full @click="deleteUser" class="w-full justify-center">
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
    activeUser: {},
  },
  data() {
    return {
      disabledDelete: false,
    }
  },
  methods: {
    ...mapMutations({
      showDeleteUser: 'user/SHOW_DELETE_USER',
      loadingAlert: 'alert/LOADING_ALERT',
    }),
    ...mapActions({
      deleteUser: 'user/deleteUser',
      successAlert: 'alert/success_alert',
      errorAlert: 'alert/error_alert',
    }),
    async deleteUser() {
      if (!this.disabledDelete) {
        this.disabledDelete = true
        try {
          this.loadingAlert()
          await this.deleteUser(this.activeUser.id)
          this.successAlert('Город был успешно удален')
        } catch (err) {
          const errors = []
          if (err.response && err.response.data) {
            for (let key in err.response.data) {
              errors.push(`${key} - ${err.response.data[key][0]}`)
            }
          } else {
            errors.push('Ошибка при удаления Города')
          }
          this.errorAlert(errors)
          this.disabledDelete = false
        }
      }
    },
  },
}
</script>
