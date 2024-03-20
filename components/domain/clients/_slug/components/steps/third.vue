<template>
  <div class="h-full relative">
    <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoadingDots/>
    </div>
    <div v-else>
      <h3 class="text-xl font-semibold text-[#000] mb-6">
        Участие в SNS
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
        <Select id="parent_organization" label="Организация первичного респондента" iconLocation="97"
        :list="organizations"
        textList="name"
        valueList="id"
        v-model="snsForm.parent_organization"
        disabled/>
        <Select id="organizationClient" label="Организация" iconLocation="97"
        :list="organizations"
        textList="name"
        valueList="id"
        v-model="snsForm.organization"
        disabled/>
        <Input label="Пользователь" disabled v-model="snsForm.user"/>
        <Date label="Дата участия в SNS" v-model="snsForm.participation_date"/>
        <Input label="Регистрационный номер купон-приглашения" v-model="snsForm.coupon_reg_num"
        :disabled="form.is_seed"
        :error="v.sns.coupon_reg_num.$dirty && !v.sns.coupon_reg_num.numeric">
          <template #error>
            <span v-if="v.sns.coupon_reg_num.$dirty && !v.sns.coupon_reg_num.numeric">
              Разрешен только числовой формат
            </span>
          </template>
        </Input>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Select from '@/components/ui/selects/primary.vue'
import Input from '@/components/ui/inputs/default.vue'
import Date from '@/components/ui/inputs/date.vue'
import dayjs from 'dayjs'
import Button from '@/components/ui/buttons/default.vue'
export default {
  name: 'ThirdStepComponent',
  components: {
    LoadingDots,
    Select,
    Input,
    Date,
    Button
  },
  props: {
    snsForm: {},
    form: {},
    v: {}
  },
  computed: {
    ...mapState({
      organizations: state => state.organization.organizations
    })
  },
  data() {
    return {
      isLoading: true
    }
  },
  methods: {
    ...mapActions({
      get_organizations: 'organization/getOrganizations'
    }),
    initForm() {
      this.snsForm.participation_date = dayjs(this.snsForm.participation_date).format('YYYY-MM-DD')
    }
  },
  async mounted() {
    this.initForm()
    await this.get_organizations()
    this.isLoading = false
  }
}
</script>
