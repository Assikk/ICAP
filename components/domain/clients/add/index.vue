<template>
  <div class="flex flex-col">
    <Header/>
    <div class="flex p-6 rounded-md flex-1">
      <div class="flex-1 bg-white p-6">
        <FirstStep v-if="activeTab == '01'" :form="form" :v="$v"/>
        <SecondStep v-if="activeTab == '02'" :form="screeningForm" :v="$v"/>
        <ThirdStep v-if="activeTab == '03'" :snsForm="sns" :form="form" :v="$v"/>
        <FourStep v-if="activeTab == '04'" :form="hivForm" :v="$v"/>
        <FiveStep v-if="activeTab == '05'" :form="preventionForm" :v="$v" :hivForm="hivForm" :infoForm="form"/>
        <SixStep v-if="activeTab == '06'" :couponForm="couponForm" :rewardForm="rewardForm" :form="form" :v="$v"/>
      </div>
      <div class="w-[400px] flex flex-col justify-between border-l border-[#E2E8F0]">
        <div class="flex flex-col">
          <Tab v-for="tab in tabs" :key="tab.id" :tab="tab" :activeTab="activeTab"/>
        </div>
        <div class="flex gap-4 justify-center py-4 border-t border-[#E2E8F0]">
          <Button white @click="$router.push('/')">
            Отмена
          </Button>
          <Button blue :disabled="couponForm.list.length == 0"
          @click="showPrintCoupons" v-if="activeTab == '06'">
            Печать купонов
          </Button>
          <Button @click="nextStep" :disabled="disabledStep">
            {{activeTab == '06' ? 'Сохранить' : 'Перейти к след. блоку'}}
          </Button>
        </div>
      </div>
    </div>
    <transition name="fade">
      <CouponsModal v-if="isShowPrintCoupons" :list="couponForm.list"/>
    </transition>
  </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import Tab from '../components/tab.vue'
import Header from '@/components/ui/header.vue'
import FirstStep from './components/steps/first.vue'
import SecondStep from './components/steps/second.vue'
import ThirdStep from './components/steps/third.vue'
import FourStep from './components/steps/four.vue'
import FiveStep from './components/steps/five.vue'
import SixStep from './components/steps/six.vue'
import Button from '@/components/ui/buttons/default.vue'
import { required, requiredIf, numeric, minValue } from 'vuelidate/lib/validators'
import dayjs from 'dayjs'
import CouponsModal from '../modals/coupons.vue'
import validators from '@/plugins/validators'
export default {
  name: 'ClientsAddComponent',
  head: {
    title: 'Добавление клиента'
  },
  components: {
    Header,
    Tab,
    FirstStep,
    SecondStep,
    ThirdStep,
    FourStep,
    FiveStep,
    SixStep,
    Button,
    CouponsModal
  },
  computed: {
    ...mapState({
      client: state => state.client.client,
      activeusess: state => state.activeuses.activeusess,
      lasttests: state => state.lasttest.lasttests,
      screening: state => state.client.screening,
      hiv: state => state.client.hiv,
      prevention: state => state.client.prevention,
      reward: state => state.reward.reward,
      coupons: state => state.coupon.list,
      isShowPrintCoupons: state => state.client.isShowPrintCoupons,
      categorykgns: state => state.categorykgn.categorykgns,
    })
  },
  data() {
    return {
      tabs: [ /* Список табов */
        {
          id: 1,
          step: '01',
          name: 'Личная информация и категория клиента',
          isComplete: false,
          isSkip: false
        },
        {
          id: 2,
          step: '02',
          name: 'Скрининг',
          isComplete: false,
          isSkip: false
        },
        {
          id: 3,
          step: '03',
          name: 'Участие в SNS',
          isComplete: false,
          isSkip: false
        },
        {
          id: 4,
          step: '04',
          name: 'Тестирование на ВИЧ',
          isComplete: false,
          isSkip: false
        },
        {
          id: 5,
          step: '05',
          name: 'Профилактика',
          isComplete: false,
          isSkip: false
        },
        {
          id: 6,
          step: '06',
          name: 'Купоны',
          isComplete: false,
          isSkip: false
        }
      ],
      activeTab: '01', /* Переменная, отвечающая за активный таб */
      form: {
        id: null,
        consent_agreement: false,
        iin: null,
        uik: null,
        first_name: null,
        last_name: null,
        middle_name: null,
        sex: null,
        gender: null,
        birth_date: null,
        age: 0,
        phone: null,
        messanger: '',
        preferred_communication_method: null,
        conclusion_num: null,
        conclusion_date: null,
        kp_category: null,
        risky_behaviors: [],
        drugs_type: '',
        is_seed: false,
        is_plhiv: false,
      },
      screeningForm: {
        unknown_hiv_status: true,
        never_participated_in_program: true,
        questionnaire: null,
        actively_uses_drugs: null,
        last_hiv_test_date: null
      },
      sns: {
        parent_organization: null,
        organization: this.$auth.user.organization,
        user: this.$auth.user.first_name,
        participation_date: dayjs().format('YYYY-MM-DD'),
        coupon_reg_num: null
      },
      hivForm: {
        hiv_test_date: dayjs().format('YYYY-MM-DD'),
        confirmed_hiv_test_date: null,
        hiv_test_result: null,
        confirmed_hiv_test_result: null,
        confirmed_hiv_test_result_absence_reason: null,
        conclusion_num: null,
        conclusion_date: null,
        art_start_date: null,
        art_absence_reason: null
      },
      preventionForm: {
        is_consulted: true,
        preventive_materials: [],
        iom_issued_materials: [],
        consent_for_sms_call_for_retest: false,
        next_test_notif_date: null,
        is_prep_consulted: null,
        prep_refusal_reason: null,
        is_taken_to_prep_coordinator: false,
        prep_start_date: null,
        is_ost_attended: false,
        ost_attendance_date: null,
        is_directed_to_ost: false,
        ost_consultation_date: null,
        additional_comments: null
      },
      couponForm: {
        count: 0,
        reason: null,
        list: []
      },
      rewardForm: {
        package_num: null,
        client: null,
        issuance_reason: 1,
        status: 2,
        organization: null
      },
      disabledStep: false
    }
  },
  validations() {
    return {
      form: {
        consent_agreement: {isTrue: (value) => {
          return value === true
        }},
        uik: {required,
          uikValidate: (value) => /^[A-ZА-Я]{4}[12]\d{2}$/.test(value)
        },
        iin: {required, numeric},
        phone: {numericDash: (value) => validators.numericDash(value) || !value},
        gender: {required},
        birth_date: {
        required,
        dashDate: (value) => validators.dashDate(value),
        checkStrongPastDate: (value) => validators.checkStrongPastDate(value)},
        age: {minValue: minValue(18)},
        kp_category: {required},
        risky_behaviors: {required},
        first_name: {isText: (value) => /^[a-zA-Zа-яА-Я]+$/.test(value) || !value},
        last_name: {isText: (value) => /^[a-zA-Zа-яА-Я]+$/.test(value) || !value},
        middle_name: {isText: (value) => /^[a-zA-Zа-яА-Я]+$/.test(value) || !value}
      },
      screeningForm: {
        questionnaire: {required},
        actively_uses_drugs: {requiredDrugs: requiredIf(() => {
          const kp = this.categorykgns.filter((item) => item.id == this.screeningForm.questionnaire)[0]
          return kp?.name == "ЛУН"
        })},
        last_hiv_test_date: {required}
      },
      sns: {
        coupon_reg_num: {numeric}
      },
      hivForm: {
        hiv_test_result: {required}
      },
      preventionForm: {
        preventive_materials: {required},
        iom_issued_materials: {required},
        is_prep_consulted: {requiredIfPrepConsulted: requiredIf(() => {
          return this.hivForm.hiv_test_result == 2
        })},
        prep_refusal_reason: {requiredIfPrepReason: requiredIf(() => {
          return this.preventionForm.is_prep_consulted == false
        })},
        ost_attendance_date: {requiredOstDate: requiredIf(() => {
          const kp = this.categorykgns.filter((item) => item.id == this.form.kp_category)[0]
          return kp.name == 'ЛУН' && this.preventionForm.is_ost_attended
        })}
      },
      rewardForm: {
        package_num: {requiredIfRewardIssued: requiredIf(() => {
          return this.rewardForm.status == 1
        })}
      },
      couponForm: {
        reason: {requiredIfReason: requiredIf(() => {
          return this.couponForm.count == 0
        })}
      }
    }
  },
  methods: {
    ...mapMutations({
      loading_alert: 'alert/LOADING_ALERT',
      show_printCoupons: 'client/SHOW_PRINTCOUPONS'
    }),
    ...mapActions({
      error_alert: 'alert/error_alert',
      success_alert: 'alert/success_alert',
      create_client: 'client/create_client',
      create_screening: 'client/create_screening',
      edit_client: 'client/edit_client',
      create_hiv: 'client/create_hiv',
      create_prevention: 'client/create_prevention',
      create_reward: 'reward/create_reward',
      edit_coupon: 'coupon/edit_coupon',
    }),
    showPrintCoupons() {
      this.show_printCoupons(true)
    },
    async nextStep() {
      if(this.activeTab == '01') {
        if(this.$v.form.$invalid) { /* Проверка валидации */
          this.$v.form.$touch()
          this.error_alert(['Форма заполнена неправильно'])
          return
        }
        if(!this.disabledStep) {
          this.disabledStep = true
          try {
            for (let key in this.form) { /* Проходимся по объекту и заменяем пустые строки на null, т.к. бэк не принимает пустую строку */
              if(this.form[key] === '') {
                this.form[key] = null
              }
            }
            this.loading_alert()
            await this.create_client(this.form)
            this.success_alert('Клиент успешно создан')
            for (let key in this.client) {
              for(let val in this.form) {
                if(key == val) {
                  this.form[val] = this.client[key]
                }
              }
            }
            for (let key in this.client) {
              for(let val in this.sns) {
                if(key == val) {
                  this.sns[val] = this.client[key]
                }
              }
            }
            if(this.form.is_seed) {
              this.activeTab = '03'
              this.tabs[0].isComplete = true
              this.tabs[1].isSkip = true
            } else {
              this.activeTab = '02'
              this.tabs[0].isComplete = true
            }
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
          }
          this.disabledStep = false
        }
      } else if(this.activeTab == '02') {
        if(this.$v.screeningForm.$invalid) {
          this.$v.screeningForm.$touch()
          this.error_alert(['Форма заполнена неправильно'])
          return
        }
        if(!this.disabledStep) {
          this.disabledStep = true
          this.loading_alert()
          try {
            await this.create_screening(this.screeningForm)
            await this.edit_client({id: this.form.id, form: {screening: this.screening.id}})
            this.activeTab = '03'
            this.tabs[1].isComplete = true
            this.success_alert('Скрининг успешно создан и привязан')
          } catch(err) {
            const errors = []
            if (err.response?.data) {
              for (let key in err.response.data) {
                errors.push(`${key} - ${err.response.data[key]}`)
              }
            }
            this.error_alert(errors)
          }
          this.disabledStep = false
        }
        // const isActiveUsesDrugs = this.activeusess.filter(item => item.id == this.screeningForm.actively_uses_drugs)[0].passing_choice
        // const isActiveLastTests = this.lasttests.filter(item => item.id == this.screeningForm.last_hiv_test_date)[0].passing_choice
        // if(isActiveUsesDrugs && isActiveLastTests && this.screeningForm.unknown_hiv_status && this.screeningForm.never_participated_in_program) {
        //   if(!this.disabledStep) {
        //     this.disabledStep = true
        //     this.loading_alert()
        //     try {
        //       await this.create_screening(this.screeningForm)
        //       await this.edit_client({id: this.form.id, form: {screening: this.screening.id}})
        //       this.activeTab = '03'
        //       this.tabs[1].isComplete = true
        //       this.success_alert('Скрининг успешно создан и привязан')
        //     } catch(err) {
        //       const errors = []
        //       if (err.response?.data) {
        //         for (let key in err.response.data) {
        //           errors.push(`${key} - ${err.response.data[key]}`)
        //         }
        //       }
        //       this.error_alert(errors)
        //     }
        //     this.disabledStep = false
        //   }
        // } else {
        //   this.disabledStep = true
        //   this.error_alert(['Человек не соответствует критериям участия в программе'])
        // }
      } else if(this.activeTab == '03') {
        if(this.$v.sns.$invalid) {
          this.$v.sns.$touch()
          this.error_alert(['Форма заполнена неправильно'])
          return
        }
        if(!this.disabledStep) {
          this.disabledStep = true
          this.loading_alert()
          try {
            this.sns.user = this.client.user.id
            await this.edit_client({id: this.form.id, form: this.sns})
            if(this.form.is_seed) {
              this.activeTab = '05'
              this.tabs[2].isComplete = true
              this.tabs[3].isSkip = true
            } else {
              this.activeTab = '04'
              this.tabs[2].isComplete = true
            }
            this.success_alert('Изменения успешно применены')
          } catch(err) {
            console.log(err.response);
            const errors = []
            if (err.response?.data) {
              for (let key in err.response.data) {
                errors.push(`${key} - ${err.response.data[key]}`)
              }
            }
            this.error_alert(errors)
          }
          this.disabledStep = false
        }
      } else if(this.activeTab == '04') {
        if(this.$v.hivForm.$invalid) {
          this.$v.hivForm.$touch()
          this.error_alert(['Форма заполнена неправильно'])
          return
        }
        if(!this.disabledStep) {
          this.disabledStep = true
          this.loading_alert()
          try {
            await this.create_hiv(this.hivForm)
            await this.edit_client({id: this.form.id, form: {hiv_test: this.hiv.id}})
            this.preventionForm.next_test_notif_date = dayjs(this.client.hiv_test_result).add(180, 'day').format('YYYY-MM-DD')
            this.activeTab = '05'
            this.tabs[3].isComplete = true
            this.success_alert('Изменения успешно применены')
          } catch(err) {
            const errors = []
            if (err.response?.data) {
              for (let key in err.response.data) {
                errors.push(`${key} - ${err.response.data[key]}`)
              }
            }
            this.error_alert(errors)
          }
          this.disabledStep = false
        }
      } else if(this.activeTab == '05') {
        if(this.$v.preventionForm.$invalid) {
          this.$v.preventionForm.$touch()
          this.error_alert(['Форма заполнена неправильно'])
          return
        }
        if(!this.disabledStep) {
          this.disabledStep = true
          this.loading_alert()
          try {
            await this.create_prevention(this.preventionForm)
            await this.edit_client({id: this.form.id, form: {prevention: this.prevention.id}})
            this.activeTab = '06'
            this.tabs[4].isComplete = true
            this.success_alert('Изменения успешно применены')
          } catch(err) {
            const errors = []
            if (err.response?.data) {
              for (let key in err.response.data) {
                errors.push(`${key} - ${err.response.data[key]}`)
              }
            }
            this.error_alert(errors)
          }
          this.disabledStep = false
        }
      } else {
        if(this.$v.rewardForm.$invalid || this.$v.couponForm.$invalid) {
          this.$v.rewardForm.$touch()
          this.$v.couponForm.$touch()
          this.error_alert(['Форма заполнена неправильно'])
          return
        }
        this.rewardForm.client = this.form.id /* Присваиваем в переменную id клиента */
        this.rewardForm.organization = this.$auth.user.organization
        if(!this.disabledStep) {
          this.disabledStep = true
          this.loading_alert()
          try {
            await this.create_reward(this.rewardForm)
            await this.edit_client({id: this.form.id, form: {
              coupon_non_issuance_reason: this.couponForm.reason,
              num_issued_coupons: this.couponForm.count
            }})
            this.success_alert('Купон и вознаграждание успешно привязаны')
            this.$router.push('/')
          } catch(err) {
            const errors = []
            if (err.response?.data) {
              for (let key in err.response.data) {
                errors.push(`${key} - ${err.response.data[key]}`)
              }
            }
            this.error_alert(errors)
          }
          this.disabledStep = false
        }
      }
    },
  },
  mounted() {
    if(!this.$checkPermission(205)) {
      this.$router.back(-1)
    }
  },
}
</script>
