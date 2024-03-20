<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_editReward(false)"/>
    <div class="relative overflow-y-auto w-[462px] bg-white rounded-md pt-6 pb-4">
      <div class="flex items-center justify-between gap-4 mb-6 px-6">
        <h3 class="text-lg text-[#111827] font-bold font-['Manrope']">
          Редактировать вознаграждение
        </h3>
        <svg width="24" height="24" fill="#9CA3AF" class="cursor-pointer" @click="show_editReward(false)">
          <use xlink:href="#close" />
        </svg>
      </div>
      <div v-if="isLoading" class="h-[152px] relative">
        <LoadingDots class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"/>
      </div>
      <div v-else class="flex flex-col gap-6 px-6">
        <DatePicker label="Дата извещения" v-model="form.notif_date"/>
        <DatePicker label="Дата получения вознаграждения" v-model="form.issuance_date"/>
      </div>
      <div class="pt-4 mt-6 flex justify-end border-t border-[#E5E7EB] px-6">
        <div class="flex gap-4">
          <Button white @click="show_editReward(false)">
            Отмена
          </Button>
          <Button @click="editReward" :disabled="disabledEdit">
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Date from '@/components/ui/inputs/date.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Button from '@/components/ui/buttons/default.vue'
import dayjs from 'dayjs'
import DatePicker from '@/components/ui/inputs/datePicker.vue'
export default {
  name: 'EditRewardModal',
  props: {
    activeReward: {},
    activePage: {}
  },
  components: {
    LoadingDots,
    Button,
    Date,
    DatePicker
  },
  computed: {
    ...mapState({
      reward: state => state.reward.reward
    }),
  },
  data() {
    return {
      isLoading: true,
      disabledEdit: false,
      form: {
        notif_date: null,
        issuance_date: null
      }
    }
  },
  methods: {
    ...mapMutations({
      show_editReward: 'reward/SHOW_EDITREWARD',
      loading_alert: 'alert/LOADING_ALERT'
    }),
    ...mapActions({
      get_reward: 'reward/get_reward',
      edit_reward: 'reward/edit_reward',
      get_rewards: 'reward/get_rewards',
      error_alert: 'alert/error_alert',
      success_alert: 'alert/success_alert',
    }),
    async editReward() {
      if(!this.disabledEdit) {
        this.disabledEdit = true
        try {
          this.loading_alert()
          await this.edit_reward({id: this.activeReward.id, form: this.form})
          await this.get_rewards({page: this.activePage})
          this.show_editReward(false)
          this.success_alert('Вознаграждение успешно изменено')
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
          this.disabledEdit = false
        }
      }
    },
    async getReward() {
      await this.get_reward(this.activeReward.id)
      for (let keyReward in this.reward) {
        for (let keyForm in this.form) {
          if(keyReward == keyForm) {
            this.form[keyForm] = this.reward[keyReward]
          }
        }
      }
    },
  },
  async mounted() {
    await this.getReward()
    this.isLoading = false
  }
}
</script>


