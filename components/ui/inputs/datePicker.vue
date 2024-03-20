<template>
  <div>
    <p class="text-[#111827] text-sm font-medium" :class="[{ 'text-[#EF4444]': error }]"
    v-if="label">
      {{ label }}
    </p>
    <DatePicker :value="value"
    @input="testInput" :class="[{'mt-1': label}]" valueType="format"
    :disabled-date="(date) => date < new Date()"/>
    <p class="text-xs font-medium text-[#EF4444]" :class="[{ 'mt-1': error }]">
      <slot name="error" />
    </p>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
  props: {
    label: {
      type: String
    },
    value: {},
    error: {
      type: Boolean,
      default: false
    },
  },
  components: {
    DatePicker
  },
  methods: {
    testInput(event) {
      console.log(event);
      this.$emit('input', event)
    }
  }
}
</script>
<style scoped>
.mx-datepicker {
  width: 100%;
}
::v-deep .mx-input {
  padding: 8px 12px;
  box-shadow: none;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
}
::v-deep .mx-datepicker-popup {
  margin-top: 4px;
}
</style>
