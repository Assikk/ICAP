<template>
  <div class="h-full relative">
    <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <LoadingDots/>
    </div>
    <div v-else>
      <h3 class="text-xl font-semibold text-[#000] mb-6">
        Профилактика
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
        <div class="flex items-center gap-6">
          <p class="text-sm text-[#374151]">
            Участнику провели консультацию после обследования*
          </p>
          <CheckBox :list="consultationList" textList="name" valueList="value" :value="form.is_consulted"
          @click="form.is_consulted = !form.is_consulted"/>
        </div>
        <div/>
        <Multi id="preventive_materials" label="Набор профилактических материалов*" iconLocation="97"
        :list="promaterialss"
        textList="name"
        valueList="id"
        v-model="form.preventive_materials"
        :error="v.preventionForm.preventive_materials.$dirty && !v.preventionForm.preventive_materials.required">
          <template #error>
            <span v-if="v.preventionForm.preventive_materials.$dirty && !v.preventionForm.preventive_materials.required">
              Выберите набор пррофилактических материалов
            </span>
          </template>
        </Multi>
        <Multi id="iom_issued_materials" label="Участнику выданы ИОМ*" iconLocation="97"
        :list="participantioms"
        textList="name"
        valueList="id"
        v-model="form.iom_issued_materials"
        :error="v.preventionForm.iom_issued_materials.$dirty && !v.preventionForm.iom_issued_materials.required">
          <template #error>
            <span v-if="v.preventionForm.iom_issued_materials.$dirty && !v.preventionForm.iom_issued_materials.required">
              Выберите ИОМ
            </span>
          </template>
        </Multi>
        <div class="flex flex-col gap-3">
          <p class="text-sm text-[#374151]">
            Согласие на смс-оповещение/Звонок для повторного тестирования через 6 мес.
          </p>
          <CheckBox :list="consentList" textList="name" valueList="value" :value="form.consent_for_sms_call_for_retest"
          @click="clickRetest"/>
        </div>
        <Date label="Назначенная дата оповещения" v-model="form.next_test_notif_date" :disabled="!form.consent_for_sms_call_for_retest"/>
        <Select id="is_prep_consulted" label="Консультация по ДКП проведена?*" iconLocation="97"
        :list="prepConsultedList" textList="name" valueList="value" v-model="form.is_prep_consulted"
        v-if="hivForm.hiv_test_result == 2"
        @input="clickPrepConsulted"
        :error="v.preventionForm.is_prep_consulted.$dirty && !v.preventionForm.is_prep_consulted.requiredIfPrepConsulted">
          <template #error>
            <span v-if="v.preventionForm.is_prep_consulted.$dirty && !v.preventionForm.is_prep_consulted.requiredIfPrepConsulted">
              Выберите консультацию по ДКП
            </span>
          </template>
        </Select>
        <Select id="prep_refusal_reason" label="Причины отказа*" iconLocation="97"
        :list="resonsrejects" textList="name" valueList="id" v-model="form.prep_refusal_reason"
        v-if="form.is_prep_consulted === 'false'"
        :error="v.preventionForm.prep_refusal_reason.$dirty && !v.preventionForm.prep_refusal_reason.requiredIfPrepReason">
          <template #error>
            <span v-if="v.preventionForm.prep_refusal_reason.$dirty && !v.preventionForm.prep_refusal_reason.requiredIfPrepReason">
              Выберите причину отказа
            </span>
          </template>
        </Select>
        <div class="flex flex-col gap-3"
        v-if="form.is_prep_consulted === 'true'">
          <p class="text-sm text-[#374151]">
            Участника сопроводили к координатору по ДКП*
          </p>
          <CheckBox :list="prepCoordinatorList" textList="name" valueList="value" :value="form.is_taken_to_prep_coordinator"
          @click="clickPrepCoordinator"/>
        </div>
        <Date label="Дата начала ДКП" v-model="form.prep_start_date"
        v-if="form.is_taken_to_prep_coordinator && form.is_prep_consulted === 'true'"/>
        <div class="flex flex-col gap-3" v-if="infoForm.kp_categories == 4">
          <p class="text-sm text-[#374151]">
            Состоял ли участник в ОЗТ*
          </p>
          <CheckBox :list="prepCoordinatorList" textList="name" valueList="value" :value="form.is_ost_attended"
          @click="clickOstAttended"/>
        </div>
        <Date label="Когда участник состоял на ОЗТ*" v-model="form.ost_attendance_date"
        v-if="infoForm.kp_categories == 4 && form.is_ost_attended"
        :error="v.preventionForm.ost_attendance_date.$dirty && !v.preventionForm.ost_attendance_date.requiredOstDate">
          <template #error>
            <span v-if="v.preventionForm.ost_attendance_date.$dirty && !v.preventionForm.ost_attendance_date.requiredOstDate">
              Выберите дату участия на ОЗТ
            </span>
          </template>
        </Date>
        <div class="flex flex-col gap-3">
          <p class="text-sm text-[#374151]">
            Участник направлен в ОЗТ*
          </p>
          <CheckBox :list="prepCoordinatorList" textList="name" valueList="value" :value="form.is_directed_to_ost"
          @click="clickOstDirected"/>
        </div>
        <Date label="Дата консультации на сайте ОЗТ" v-model="form.ost_consultation_date"
        v-if="form.is_ost_attended && form.is_directed_to_ost"/>
        <TextArea label="Дополнительный комментарий" rows="7" v-model="form.additional_comments"/>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import LoadingDots from '@/components/ui/loading/dots.vue'
import CheckBox from '@/components/domain/clients/components/checkbox.vue'
import Multi from '@/components/ui/selects/multi.vue'
import Date from '@/components/ui/inputs/date.vue'
import Select from '@/components/ui/selects/primary.vue'
import TextArea from '@/components/ui/textarea.vue'
export default {
  name: 'FiveStepComponent',
  components: {
    LoadingDots,
    CheckBox,
    Multi,
    Date,
    Select,
    TextArea
  },
  computed: {
    ...mapState({
      promaterialss: state => state.promaterials.promaterialss,
      participantioms: state => state.participantiom.participantioms,
      resonsrejects: state => state.resonsreject.resonsrejects
    })
  },
  props: {
    form: {},
    v: {},
    hivForm: {},
    infoForm: {}
  },
  data() {
    return {
      isLoading: true,
      consultationList: [
        {
          id: 1,
          name: 'Нет',
          value: false
        },
        {
          id: 2,
          name: 'Да',
          value: true
        }
      ],
      consentList: [
        {
          id: 1,
          name: 'Нет',
          value: false
        },
        {
          id: 2,
          name: 'Да',
          value: true
        }
      ],
      prepConsultedList: [
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
      prepCoordinatorList: [
        {
          id: 1,
          name: 'Нет',
          value: false
        },
        {
          id: 2,
          name: 'Да',
          value: true
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      get_promaterialss: 'promaterials/get_promaterialss',
      get_participantioms: 'participantiom/get_participantioms',
      get_resonsrejects: 'resonsreject/get_resonsrejects'
    }),
    clickPrepCoordinator() {
      this.form.is_taken_to_prep_coordinator = !this.form.is_taken_to_prep_coordinator
      this.form.prep_start_date = null
    },
    clickPrepConsulted() {
      if(this.form.is_prep_consulted) {
        this.form.is_taken_to_prep_coordinator = true
      } else this.form.is_taken_to_prep_coordinator = false
    },
    clickOstAttended() {
      this.form.is_ost_attended = !this.form.is_ost_attended
      this.form.ost_attendance_date = null
    },
    clickOstDirected() {
      this.form.is_directed_to_ost = !this.form.is_directed_to_ost
      this.form.ost_consultation_date = null
    },
    clickRetest() {
      if(this.infoForm.phone) {
        this.form.consent_for_sms_call_for_retest = !this.form.consent_for_sms_call_for_retest
        this.form.next_test_notif_date = null
      }
    }
  },
  async mounted() {
    await this.get_promaterialss()
    await this.get_participantioms()
    await this.get_resonsrejects()
    this.isLoading = false
  }
}
</script>
