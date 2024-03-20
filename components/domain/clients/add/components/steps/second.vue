<template>
  <div class="h-full relative">
    <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoadingDots/>
    </div>
    <div v-else>
      <h3 class="text-xl font-semibold text-[#000] mb-6">
        Скрининг
      </h3>
      <div class="flex flex-col gap-4 w-1/2">
        <Select id="type" label="Тип опросника" iconLocation="97"
        :list="questionnaires"
        textList="name_ru"
        valueList="id"
        v-model="form.questionnaire"
        :error="v.screeningForm.questionnaire.$dirty && !v.screeningForm.questionnaire.required"
        @input="changeQuestionnaire">
          <template #error>
            <span v-if="v.screeningForm.questionnaire.$dirty && !v.screeningForm.questionnaire.required">
              Выберите тип опросника
            </span>
          </template>
        </Select>
        <Select id="activeusess" label="Активно употребляет наркотики" iconLocation="97"
        :list="activeusess"
        textList="name_ru"
        valueList="id"
        v-model="form.actively_uses_drugs"
        :disabled="disabledDrug"
        :error="v.screeningForm.actively_uses_drugs.$dirty && !v.screeningForm.actively_uses_drugs.requiredDrugs">
          <template #error>
            <span v-if="v.screeningForm.actively_uses_drugs.$dirty && !v.screeningForm.actively_uses_drugs.requiredDrugs">
              Выберите тип опросника
            </span>
          </template>
        </Select>
        <div class="flex flex-col gap-2">
          <p class="text-[#374151] text-sm font-medium">
            Не знает есть ли у него ВИЧ-инфекция
          </p>
          <CheckBox :list="vichList" textList="name" valueList="value" :value="form.unknown_hiv_status"
          @click="form.unknown_hiv_status = !form.unknown_hiv_status"/>
        </div>
        <Select id="lasttests" label="Последняя дата тестирования на ВИЧ" iconLocation="97"
          :list="lasttests"
          textList="name_ru"
          valueList="id"
          v-model="form.last_hiv_test_date"
          :error="v.screeningForm.last_hiv_test_date.$dirty && !v.screeningForm.last_hiv_test_date.required">
          <template #error>
            <span v-if="v.screeningForm.last_hiv_test_date.$dirty && !v.screeningForm.last_hiv_test_date.required">
              Выберите тип опросника
            </span>
          </template>
        </Select>
        <div class="flex flex-col gap-2">
          <p class="text-[#374151] text-sm font-medium">
            Ранее никогда не участвовал в программе по таким купонам
          </p>
          <CheckBox :list="vichList" textList="name" valueList="value" :value="form.never_participated_in_program"
          @click="form.never_participated_in_program = !form.never_participated_in_program"/>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Select from '@/components/ui/selects/primary.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
import CheckBox from '@/components/domain/clients/components/checkbox.vue'
export default {
  name: 'SecondStepComponent',
  components: {
    Select,
    LoadingDots,
    CheckBox
  },
  props: {
    form: {},
    v: {}
  },
  data() {
    return {
      isLoading: true,
      vichList: [
        {
          id: 1,
          name: 'Да',
          value: true
        },
        {
          id: 2,
          name: 'Нет',
          value: false
        }
      ],
      disabledDrug: true
    }
  },
  computed: {
    ...mapState({
      questionnaires: state => state.questionnaire.questionnaires,
      activeusess: state => state.activeuses.activeusess,
      lasttests: state => state.lasttest.lasttests,
      categorykgns: state => state.categorykgn.categorykgns
    })
  },
  methods: {
    ...mapActions({
      get_questionnaires: 'questionnaire/get_questionnaires',
      get_activeusess: 'activeuses/get_activeusess',
      get_lasttests: 'lasttest/get_lasttests',
      get_categorykgns: 'categorykgn/get_categorykgns',
    }),
    changeQuestionnaire() {
      const kp = this.categorykgns.filter((item) => item.id == this.form.questionnaire)[0]
      if(kp.name == 'ЛУН') {
        this.disabledDrug = false
      } else {
        this.disabledDrug = true
        this.form.actively_uses_drugs = null
      }
    }
  },
  async mounted() {
    await this.get_categorykgns()
    await this.get_questionnaires()
    await this.get_activeusess()
    await this.get_lasttests()
    this.isLoading = false
  }
}
</script>
