<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_deleteClient(false)"/>
    <div class="relative bg-white text-center rounded-md px-6 py-4 flex flex-col gap-4 w-96">
      <div>
        <h2 class="font-semibold text-lg my-3 text-[#1F2937]">Удаление</h2>
        <p class="text-sm text-[#5E6470] mb-4">
          Вы уверены что хотите удалить этого клиента?
          <br>При удаление все данные клиента удаляется
          <br>из базы данных
        </p>
      </div>
      <div class="flex gap-3 py-3 justify-center border-t border-t-[#E5E7EB]">
        <Button white @click="show_deleteClient(false)"> Отмена </Button>
        <Button :disabled="disabledDelete" @click="deleteClient">
          Удалить
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapActions} from 'vuex'
import Button from '@/components/ui/buttons/default.vue'
export default {
  name: 'DeletePartnerModal',
  components: {
    Button,
  },
  props: {
    activeClient: {},
    activePage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      disabledDelete: false
    }
  },
  methods: {
    ...mapMutations({
      show_deleteClient: 'client/SHOW_DELETECLIENT',
      loading_alert: 'alert/LOADING_ALERT'
    }),
    ...mapActions({
      delete_client: 'client/delete_client',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert',
      get_clients: 'client/get_clients'
    }),
    async deleteClient() {
      if(!this.disabledDelete) {
        this.disabledDelete = true
        try {
          this.loading_alert()
          await this.delete_client(this.activeClient.id)
          await this.get_clients({page: this.activePage})
          this.success_alert('Клиент успешно удален')
        } catch(err) {
          console.log(err);
          const errors = []
          if (err.response?.data) {
            for (let key in err.response.data) {
              errors.push(`${key} - ${err.response.data[key]}`)
            }
          }
          this.error_alert(errors)
          thid.disabledDelete = false
        }
      }
    }
  },
}
</script>
