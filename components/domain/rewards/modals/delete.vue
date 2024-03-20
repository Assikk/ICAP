<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_deleteReward(false)"/>
    <div class="relative bg-white text-center rounded-md px-6 py-4 flex flex-col gap-4 w-96">
      <div>
        <h2 class="font-semibold text-lg my-3 text-[#1F2937]">Удаление</h2>
        <p class="text-sm text-[#5E6470] mb-4">
          Вы уверены что хотите удалить это вознаграждение?
        </p>
      </div>
      <div class="flex gap-3 py-3 px-8 border-t border-t-[#E5E7EB]">
        <Button white full class="w-full justify-center" @click="show_deleteReward(false)"> Отмена </Button>
        <Button :disabled="disabledDelete" full @click="deleteReward" class="w-full justify-center">
          Да
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapActions} from 'vuex'
import Button from '@/components/ui/buttons/default.vue'
export default {
  name: 'DeleteRewardModal',
  props: {
    activeReward: {},
    activePage: {}
  },
  components: {
    Button
  },
  data() {
    return {
      disabledDelete: false
    }
  },
  methods: {
    ...mapMutations({
      show_deleteReward: 'reward/SHOW_DELETEREWARD',
      loading_alert: 'alert/LOADING_ALERT'
    }),
    ...mapActions({
      delete_reward: 'reward/delete_reward',
      get_rewards: 'reward/get_rewards',
      error_alert: 'alert/error_alert',
      success_alert: 'alert/success_alert',
    }),
    async deleteReward() {
      if(!this.disabledDelete) {
        this.disabledDelete = true
        try {
          this.loading_alert()
          await this.delete_reward(this.activeReward.id)
          await this.get_rewards({page: this.activePage})
          this.success_alert('Вознаграждение успешно удалено')
          this.show_deleteReward(false)
        } catch(err) {
          const errors = []
          if (err.response.data.data) {
            for (let key in err.response.data.data) {
              errors.push(`${key} - ${err.response.data.data[key]}`)
            }
          } else {
            for (let key in err.response.data) {
              errors.push(`${key} - ${err.response.data[key]}`)
            }
          }
          this.error_alert(errors)
          this.disabledDelete = false
        }
      }
    }
  },
}
</script>
