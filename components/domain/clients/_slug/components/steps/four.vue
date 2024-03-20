<template>
  <div class="h-full relative">
    <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoadingDots/>
    </div>
    <div v-else>
      <h3 class="text-xl font-semibold text-[#000] mb-6">
        Тестирование на ВИЧ
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
        <Input label="Дата экспресс-тест на ВИЧ" disabled v-model="form.hiv_test_date"/>
        <Select id="hiv_test_result" label="Результат экспресс-теста на ВИЧ" iconLocation="97"
        :list="testresults"
        textList="name"
        valueList="id"
        v-model="form.hiv_test_result"
        @input="selectHivTestResult"/>
        <Date :disabled="isNegativeTest" label="Дата подтверждающего тест на ВИЧ" v-model="form.confirmed_hiv_test_date"/>
        <Select id="confirmed_hiv_test_result" label="Результат подтверждающего теста на ВИЧ" iconLocation="97"
        :list="confirmationresults"
        textList="name"
        valueList="id"
        v-model="form.confirmed_hiv_test_result"
        :disabled="isNegativeTest"
        @input="selectConfirmedHivTestResult"/>
        <Select id="confirmed_hiv_test_result_absence_reason" label="Причина отсутствия подтверждающего теста" iconLocation="97"
        :list="reasonabsences"
        textList="name" valueList="id"
        v-model="form.confirmed_hiv_test_result_absence_reason"
        :disabled="disabledAbsensesReason"/>
        <Input label="Номер ИБ" :disabled="isNegativeTest" v-model="form.conclusion_num"/>
        <Date :disabled="isNegativeTest" label="Дата ИБ" v-model="form.conclusion_date"/>
        <Date :disabled="isNegativeTest" label="Дата начала АРТ" v-model="form.art_start_date"/>
        <Select id="art_absence_reason" label="Причины не взятия на АРТ" iconLocation="97"
        :list="reasonstakings"
        textList="name"
        valueList="id"
        v-model="form.art_absence_reason"
        :disabled="isNegativeTest"/>
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
export default {
  name: 'FourStepComponent',
  components: {
    LoadingDots,
    Input,
    Select,
    Date
  },
  props: {
    form: {}
  },
  computed: {
    ...mapState({
      testresults: state => state.testresult.testresults,
      confirmationresults: state => state.confirmationresult.confirmationresults,
      reasonabsences: state => state.reasonabsence.reasonabsences,
      reasonstakings: state => state.reasonstaking.reasonstakings
    })
  },
  data() {
    return {
      isLoading: true,
      isNegativeTest: true,
      disabledAbsensesReason: true
    }
  },
  methods: {
    ...mapActions({
      get_testresults: 'testresult/get_testresults',
      get_confirmationresults: 'confirmationresult/get_confirmationresults',
      get_reasonabsences: 'reasonabsence/get_reasonabsences',
      get_reasonstakings: 'reasonstaking/get_reasonstakings'
    }),
    selectHivTestResult(value) {
      if(value == 1) {
        this.isNegativeTest = false
      } else this.isNegativeTest = true
      this.form.confirmed_hiv_test_date = null
      this.form.confirmed_hiv_test_result = null
      this.form.confirmed_hiv_test_result_absence_reason = null
      this.form.conclusion_num = null
      this.form.conclusion_date = null
      this.form.art_start_date = null
      this.form.art_absence_reason = null
    },
    selectConfirmedHivTestResult(value) {
      if(value == 1) {
        this.disabledAbsensesReason = false
      } else this.disabledAbsensesReason = true
      this.form.confirmed_hiv_test_result_absence_reason = null
    }
  },
  async mounted() {
    await this.get_testresults()
    await this.get_confirmationresults()
    await this.get_reasonabsences()
    await this.get_reasonstakings()
    if(this.form.hiv_test_result == 1) {
      this.isNegativeTest = false
    }
    if(this.form.confirmed_hiv_test_result == 1) {
      this.disabledAbsensesReason = false
    }
    this.isLoading = false
  }
}
</script>
