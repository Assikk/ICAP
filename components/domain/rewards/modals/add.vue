<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_addReward(false)"/>
    <div class="relative overflow-y-auto w-[462px] bg-white rounded-md justify-between pt-6 pb-4">
      <div class="flex items-center justify-between gap-4 mb-6 px-6">
        <h3 class="text-lg text-[#111827] font-bold font-['Manrope']">
          Добавить вознаграждение
        </h3>
        <svg width="24" height="24" fill="#9CA3AF" class="cursor-pointer" @click="show_addReward(false)">
          <use xlink:href="#close" />
        </svg>
      </div>
      <div v-if="isLoading" class="h-[152px] relative">
        <LoadingDots class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"/>
      </div>
      <div v-else class="flex flex-col gap-6 px-6">
        <Select id="organizationAdd" :list="organizations" textList="name" valueList="id" iconLocation="96" label="Организация" v-model="form.org"
        :error="$v.form.org.$dirty && !$v.form.org.required">
          <template #error>
            <span v-if="$v.form.org.$dirty && !$v.form.org.required">
              Это поле обязателен к заполнению
            </span>
          </template>
        </Select>
        <Input whitespace label="Количество вознаграждения" v-model="form.size"
        :error="($v.form.size.$dirty && !$v.form.size.required) || ($v.form.size.$dirty && !$v.form.size.numeric)">
          <template #error>
            <span v-if="$v.form.size.$dirty && !$v.form.size.required">
              Это поле обязателен к заполнению
            </span>
            <span v-else-if="$v.form.size.$dirty && !$v.form.size.numeric">
              Разрешен только числовой формат
            </span>
          </template>
        </Input>
      </div>
      <div class="pt-4 mt-6 flex justify-end border-t border-[#E5E7EB] px-6">
        <div class="flex gap-4">
          <Button white @click="show_addReward(false)">
            Отмена
          </Button>
          <Button :disabled="disabledAdd" @click="addReward">
            Добавить
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Select from '@/components/ui/selects/primary.vue'
import Input from '@/components/ui/inputs/default.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Button from '@/components/ui/buttons/default.vue'
import { required, numeric } from 'vuelidate/lib/validators'
export default {
  name: 'AddRewardModal',
  components: {
    Select,
    Input,
    LoadingDots,
    Button
  },
  computed: {
    ...mapState({
      organizations: state => state.organization.organizations
    })
  },
  data() {
    return {
      isLoading: true,
      form: {
        org: null,
        size: null
      },
      disabledAdd: false
    }
  },
  validations() {
    return {
      form: {
        org: {required},
        size: {required, numeric}
      }
    }
  },
  methods: {
    ...mapMutations({
      show_addReward: 'reward/SHOW_ADDREWARD',
      loading_alert: 'alert/LOADING_ALERT'
    }),
    ...mapActions({
      get_organiozations: 'organization/getOrganizations',
      error_alert: 'alert/error_alert',
      success_alert: 'alert/success_alert',
      generate_reward: 'reward/generate_reward',
      get_rewards: 'reward/get_rewards'
    }),
    async addReward() {
      if(this.$v.$invalid) { /* Проверка валидации */
        this.$v.$touch()
        return
      }
      if(!this.disabledAdd) {
        this.disabledAdd = true
        try {
          this.loading_alert()
          await this.generate_reward(this.form)
          await this.get_rewards({page: 1})
          this.success_alert('Вознаграждение успешно добавлено')
          this.show_addReward(false)
        } catch(err) {
          this.error_alert([err.response.data])
          this.disabledAdd = false
        }
      }
    }
  },
  async mounted() {
    await this.get_organiozations()
    this.isLoading = false
  }
}
</script>

