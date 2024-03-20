<template>
<div class="h-full relative">
  <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <LoadingDots/>
  </div>
  <div class="flex flex-col gap-6" v-else>
    <h2 class="title">
      Личная информация
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Input whitespace label="УИК участника*" v-model="form.uik" uppercase @blur="findSex"
      :error="(v.form.uik.$dirty && !v.form.uik.required) || (v.form.uik.$dirty && !v.form.uik.uikValidate)">
      <template #error>
        <span v-if="v.form.uik.$dirty && !v.form.uik.required">
          Это поле обязателен для заполнения
        </span>
        <span v-else-if="v.form.uik.$dirty && !v.form.uik.uikValidate">
          Неправильный формат. Например, ААББ190
        </span>
      </template>
      </Input>
      <Input label="ИИН участника*" v-model="form.iin"
      :error="(v.form.iin.$dirty && !v.form.iin.required) || (v.form.iin.$dirty && !v.form.iin.numeric)">
        <template #error>
          <span v-if="v.form.iin.$dirty && !v.form.iin.required">
            Это поле обязателен для заполнения
          </span>
          <span v-else-if="v.form.iin.$dirty && !v.form.iin.numeric">
            Разрешен только числовой формат
          </span>
        </template>
      </Input>
      <Button small :disabled="disabledCheckButtonUIK" @click="checkUik">
        Проверить УИК
      </Button>
      <Button small :disabled="disabledCheckButtonIIN" @click="checkIin">
        Проверить ИИН
      </Button>
      <Input whitespace label="Фамилия" v-model="form.first_name"
      :error="v.form.first_name.$dirty && !v.form.first_name.isText">
        <template #error>
          <span v-if="v.form.first_name.$dirty && !v.form.first_name.isText">
            Разерешен только буквенный формат
          </span>
        </template>
      </Input>
      <Input whitespace label="Имя" v-model="form.last_name"
      :error="v.form.last_name.$dirty && !v.form.last_name.isText">
        <template #error>
          <span v-if="v.form.last_name.$dirty && !v.form.last_name.isText">
            Разерешен только буквенный формат
          </span>
        </template>
      </Input>
      <Input whitespace label="Отчество" v-model="form.middle_name"
      :error="v.form.middle_name.$dirty && !v.form.middle_name.isText">
        <template #error>
          <span v-if="v.form.middle_name.$dirty && !v.form.middle_name.isText">
            Разерешен только буквенный формат
          </span>
        </template>
      </Input>
      <Select id="sex" label="Биологический пол" iconLocation="97" disabled
      :list="sexList"
      textList="name"
      valueList="value"
      v-model="form.sex">
      </Select>
      <Select id="gender" label="Гендер" iconLocation="97"
      :list="genders"
      textList="name_ru"
      valueList="id"
      v-model="form.gender"/>
      <Date label="Дата рождения" v-model="form.birth_date"
      :error="(v.form.birth_date.$dirty && !v.form.birth_date.required) || (v.form.birth_date.$dirty && !v.form.birth_date.checkStrongPastDate) || (v.form.birth_date.$dirty && !v.form.birth_date.dashDate)"
      @input="selectDateBirth">
        <template #error>
          <span v-if="v.form.birth_date.$dirty && !v.form.birth_date.required">
            Выберите дату рождения
          </span>
          <span v-else-if="v.form.birth_date.$dirty && !v.form.birth_date.checkStrongPastDate">
            Нельзя вводить будущую дату
          </span>
          <span v-else-if="v.form.birth_date.$dirty && !v.form.birth_date.dashDate">
            Неправильный формат. Допустимый формат - DD.MM.YYYY
          </span>
        </template>
      </Date>
      <Input label="Возраст" v-model="form.age" disabled
      :error="v.form.age.$dirty && !v.form.age.minValue">
        <template #error>
          <span v-if="v.form.age.$dirty && !v.form.age.minValue">
            Возраст должен быть больше 18
          </span>
        </template>
      </Input>
      <Phone label="Номер телефона" v-model="form.phone"
      :error="v.form.phone.$dirty && !v.form.phone.numericDash">
        <template #error>
          <span v-if="v.form.phone.$dirty && !v.form.phone.numericDash">
            Разрешен только числовой формат
          </span>
        </template>
      </Phone>
      <Input label="Ник в Telegram" v-model="form.messanger"/>
      <Select id="communication" label="Предпочитаемый метод связи" iconLocation="97"
      :list="communications"
      textList="name_ru"
      valueList="id"
      v-model="form.preferred_communication_method"/>
    </div>
    <h2 class="title">
      Категория клиента
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="flex items-center gap-6">
        <p class="text-[#374151] font-semibold">
          Первичный респондент?
        </p>
        <div>
          <CheckBox :list="voluntaryList" textList="name" valueList="value" :value="form.is_seed"
          @click="clickSeed"/>
        </div>
      </div>
      <div class="flex items-center gap-6">
        <p class="text-[#374151] font-semibold">
          ЛЖВ
        </p>
        <div>
          <CheckBox :list="voluntaryList" textList="name" valueList="value" :value="form.is_plhiv"
          @click="clickPlhiv"/>
        </div>
      </div>
      <Input label="Номер заключение" v-model="form.conclusion_num" :disabled="disabledConclusion"/>
      <Date label="Дата заключения" v-model="form.conclusion_date" :disabled="disabledConclusion"/>
      <Button small @click="checkConclusionNum">
        Проверить номер заключения
      </Button>
      <div/>
      <Select id="categorykgns" label="Категория КГН" iconLocation="97"
      :list="categorykgns"
      textList="name_ru"
      valueList="id"
      v-model="form.kp_category"
      @input="changeKGN"
      :error="v.form.kp_category.$dirty && !v.form.kp_category.required">
        <template #error>
          <span v-if="v.form.kp_category.$dirty && !v.form.kp_category.required">
            Выберите категорию КГН
          </span>
        </template>
      </Select>
      <Multi id="risk" label="Рискованное поведение" iconLocation="97"
      :list="risks"
      textList="name_ru"
      valueList="id"
      v-model="form.risky_behaviors"
      :error="v.form.risky_behaviors.$dirty && !v.form.risky_behaviors.required">
        <template #error>
          <span v-if="v.form.risky_behaviors.$dirty && !v.form.risky_behaviors.required">
            Выберите рискованное поведение
          </span>
        </template>
      </Multi>
      <Select id="drug" label="Вид наркотиков" iconLocation="97"
      :list="drugs"
      textList="name_ru"
      valueList="id"
      v-model="form.drugs_type"
      :disabled="disabledDrug"/>
      <Select id="uses" label="Преимущественный способ употребления" iconLocation="97"
      :list="usess"
      textList="name_ru"
      valueList="id"
      v-model="form.preferred_usage_method"
      :disabled="disabledDrug"/>
    </div>
  </div>
</div>

</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import CheckBox from '@/components/domain/clients/components/checkbox.vue'
import Input from '@/components/ui/inputs/default.vue'
import Select from '@/components/ui/selects/primary.vue'
import LoadingDots from '@/components/ui/loading/dots.vue'
import Date from '@/components/ui/inputs/date.vue'
import Phone from '@/components/ui/inputs/phone.vue'
import Button from '@/components/ui/buttons/default.vue'
import dayjs from 'dayjs'
import Multi from '@/components/ui/selects/multi.vue'
export default {
  name: 'FirstStepComponent',
  props: {
    form: {},
    v: {}
  },
  components: {
    CheckBox,
    Input,
    Select,
    LoadingDots,
    Date,
    Phone,
    Button,
    Multi,
  },
  computed: {
    ...mapState({
      genders: state => state.gender.genders,
      sexList: state => state.sex.sexList,
      communications: state => state.communication.communications,
      categorykgns: state => state.categorykgn.categorykgns,
      risks: state => state.risk.risks,
      drugs: state => state.drug.drugs,
      usess: state => state.uses.usess,
    })
  },
  data() {
    return {
      voluntaryList: [
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
      isLoading: true,
      disabledCheckButtonUIK: false,
      disabledCheckButtonIIN: false,
      disabledCheckButtonConclusionNum: false,
      disabledConclusion: true,
      disabledDrug: true,
    }
  },
  methods: {
    ...mapMutations({
      loading_alert: 'alert/LOADING_ALERT'
    }),
    ...mapActions({
      get_genders: 'gender/get_genders',
      get_communications: 'communication/get_communications',
      get_categorykgns: 'categorykgn/get_categorykgns',
      get_risks: 'risk/get_risks',
      get_drugs: 'drug/get_drugs',
      get_usess: 'uses/get_usess',
      success_alert: 'alert/success_alert',
      error_alert: 'alert/error_alert'
    }),
    async checkUik() {
      if (this.v.form.uik.$invalid) {
        this.v.form.uik.$touch()
        return
      }
      if(!this.disabledCheckButtonUIK) {
        this.disabledCheckButtonUIK = true
        this.loading_alert()
        let res = await this.$axios.get(`clients/check?uik=${this.form.uik}`)
        if(res.data.data) {
          const errors = ['Такой УИК уже существует']
          this.error_alert(errors)
        } else this.success_alert('УИК валиден')
        this.disabledCheckButtonUIK = false
      }
    },
    async checkIin() {
      if (this.v.form.iin.$invalid) {
        this.v.form.iin.$touch()
        return
      }
      if(!this.disabledCheckButtonIIN) {
        this.disabledCheckButtonIIN = true
        this.loading_alert()
        let res = await this.$axios.get(`clients/check?iin=${Number(this.form.iin)}`)
        if(res.data.data) {
          const errors = ['Такой ИИН уже существует']
          this.error_alert(errors)
        } else this.success_alert('ИИН валиден')
        this.disabledCheckButtonIIN = false
      }
    },
    async checkConclusionNum() {
      if(this.form.conclusion_num) {
        if(!this.disabledCheckButtonConclusionNum) {
          this.disabledCheckButtonConclusionNum = true
          this.loading_alert()
          let res = await this.$axios.get(`clients/check?conclusion-num=${Number(this.form.conclusion_num)}`)
          if(res.data.data) {
            this.success_alert('Такой номер заключения отсутствует')
          } else this.error_alert(['Такой номер заключения уже имеется'])
          this.disabledCheckButtonConclusionNum = false
        }
      } else this.error_alert(['Заполните номер заключения'])
    },
    selectDateBirth(event) {
      if(dayjs().diff(event, 'year')) {
        this.form.age = dayjs().diff(event, 'year')
      } else this.form.age = null
    },
    clickSeed() {
      this.form.is_seed = !this.form.is_seed
      this.form.coupon_reg_num = null
      if(!this.form.is_seed) {
        this.form.is_plhiv = false
        this.disabledConclusion = true
        this.form.conclusion_num = null
        this.form.conclusion_date = null
      }
    },
    clickPlhiv() {
      if(this.form.is_seed) {
        this.form.is_plhiv = !this.form.is_plhiv
      }
      if(this.form.is_plhiv) {
        this.disabledConclusion = false
      } else {
        this.disabledConclusion = true
        this.form.conclusion_num = null
        this.form.conclusion_date = null
      }
    },
    findSex() {
      if(this.form.uik[4] == 1) {
        this.form.sex = 'M'
      } else if(this.form.uik[4] == 2) {
        this.form.sex = 'F'
      } else this.form.sex = null
    },
    changeKGN() {
      const kp = this.categorykgns.filter((item) => item.id == this.form.kp_category)[0]
      if(kp.name == 'ЛУН') {
        this.disabledDrug = false
      } else {
        this.disabledDrug = true
        this.form.preferred_usage_method = null
        this.form.drugs_type = null
      }
    }
  },
  async mounted() {
    await this.get_genders()
    await this.get_communications()
    await this.get_categorykgns()
    await this.get_risks()
    await this.get_drugs()
    await this.get_usess()
    const kp = this.categorykgns.filter((item) => item.id == this.form.kp_category)[0]
    if(kp.name == 'ЛУН') {
      this.disabledDrug = false
    } else this.disabledDrug = true
    this.isLoading = false
  }
}
</script>
<style scoped>
.title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}
</style>
