<template>
  <div class="h-full relative">
    <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoadingDots/>
    </div>
    <div v-else>
      <h3 class="text-xl font-semibold text-[#000] mb-6">
        Купоны и вознаграждения
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
        <div class="flex flex-col gap-3">
          <p class="text-[#111827] text-sm font-medium">
            Вознаграждения за прохождение экспресс-теста на ВИЧ выдано
          </p>
          <CheckBox :list="checkBoxList" textList="name" valueList="value" :value="rewardForm.status"
          @click="clickToggleReward"/>
        </div>
        <Input label="Номер пакета с вознаграждением за прохождение экспресс-теста на ВИЧ" :disabled="rewardForm.status == 2"
        v-model="rewardForm.package_num"
        :error="v.rewardForm.package_num.$dirty && !v.rewardForm.package_num.requiredIfRewardIssued">
          <template #error>
            <span v-if="v.rewardForm.package_num.$dirty && !v.rewardForm.package_num.requiredIfRewardIssued">
              Это поле обязателен к заполнению
            </span>
          </template>
        </Input>
        <div class="flex gap-2.5 items-end">
          <Input label="Количество выданных купонов" class="flex-1"
          v-model="couponForm.count"
          disabled/>
          <Button class="h-fit" :disabled="disabledGenerateCoupon" @click="createCoupon"
          v-if="couponForm.list.length < 3">
            Сгенерировать купон
          </Button>
        </div>
        <Select id="reason" label="Причина невыдачи" iconLocation="97"
        :list="reasonissues"
        textList="name"
        valueList="id"
        v-model="couponForm.reason"
        disabled>
        </Select>
      </div>
      <div v-if="couponForm.count > 0" class="w-1/2 mt-8 pt-4 flex flex-col gap-6">
        <h3 class="text-xl font-semibold text-[#000] mb-6">
          Купоны
        </h3>
        <div v-for="(item, index) in couponForm.list" :key="index" class="flex items-end gap-2.5">
          <Input :label="`Регистрационный номер выданного купона ${index + 1}`" disabled
          v-model="item.id" class="flex-1"/>
          <div class="w-[42px] h-[42px] bg-[#F1F5F9] rounded-md relative cursor-pointer"
          @click="deleteCoupon(item, index)">
            <svg width="20" height="20" fill="none" stroke="#5E6470" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <use xlink:href="#delete" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import LoadingDots from '@/components/ui/loading/dots.vue'
import CheckBox from '@/components/domain/clients/components/checkbox.vue'
import Input from '@/components/ui/inputs/default.vue'
import Select from '@/components/ui/selects/primary.vue'
import Button from '@/components/ui/buttons/default.vue'
export default {
  name: 'SixStepComponent',
  components: {
    LoadingDots,
    CheckBox,
    Input,
    Select,
    Button
  },
  props: {
    couponForm: {},
    rewardForm: {},
    form: {},
    v: {}
  },
  computed: {
    ...mapState({
      reasonissues: state => state.reasonissue.reasonissues,
      coupons: state => state.coupon.list,
      coupon: state => state.coupon.coupon
    })
  },
  data() {
    return {
      isLoading: true,
      checkBoxList: [
        {
          id: 1,
          name: 'Нет',
          value: 2
        },
        {
          id: 2,
          name: 'Да',
          value: 1
        }
      ],
      countCouponsList: [
        {
          id: 0
        },
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3
        }
      ],
      disabledGenerateCoupon: false
    }
  },
  methods: {
    ...mapMutations({
      loading_alert: 'alert/LOADING_ALERT'
    }),
    ...mapActions({
      get_reasonissues: 'reasonissue/get_reasonissues',
      get_list: 'coupon/get_list',
      error_alert: 'alert/error_alert',
      success_alert: 'alert/success_alert',
      create_coupon: 'coupon/create_coupon',
      delete_coupon: 'coupon/delete_coupon'
    }),
    clickToggleReward() {
      if(this.rewardForm.status == 1) {
        this.rewardForm.status = 2
      } else this.rewardForm.status = 1
      this.rewardForm.package_num = null
    },
    async createCoupon() {
      if(!this.disabledGenerateCoupon) {
        this.disabledGenerateCoupon = true
        try {
          this.loading_alert()
          await this.create_coupon({
            parent: this.form.id,
            organization: this.$auth.user.organization,
            status: 1
          })
          this.couponForm.list.push(this.coupon)
          this.couponForm.count = this.couponForm.list.length
          this.success_alert('Купон успешно сгенерирован')
        } catch(err) {
          const errors = []
          if (err.response?.data) {
            for (let key in err.response.data) {
              errors.push(`${key} - ${err.response.data[key]}`)
            }
          }
          this.error_alert(errors)
        }
        this.disabledGenerateCoupon = false
      }
    },
    async deleteCoupon(coupon, index) {
      try {
        this.loading_alert()
        await this.delete_coupon(coupon.id)
        this.couponForm.list.splice(index, 1)
        this.couponForm.count = this.couponForm.list.length
        this.success_alert('Купон успешно удален')
      } catch(err) {
        const errors = []
        if (err.response?.data) {
          for (let key in err.response.data) {
            errors.push(`${key} - ${err.response.data[key]}`)
          }
        }
        this.error_alert(errors)
      }
    }
  },
  async mounted() {
    await this.get_list({
      client: this.$route.params.slug
    })
    this.couponForm.list = structuredClone(this.coupons)
    this.couponForm.count = this.coupons.length
    await this.get_reasonissues()
    this.isLoading = false
  },
  watch: {
    'couponForm.count'() {
      if(this.couponForm.count > 0) {
        this.couponForm.reason = null
      }
    }
  }
}
</script>
