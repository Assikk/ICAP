<template>
<div class="flex flex-col">
  <label :for="id" class="text-[#111827] text-sm font-medium"
  :class="[{ 'mb-1': label }, { 'text-[#EF4444]': error }]">
    {{label}}
  </label>
  <select class="outline-none px-3 py-2 border border-[#D1D5DB] rounded-md text-sm font-medium text-[#6B7280]"
  :class="[
  {'gray': gray}
  ]"
  :value="value"
  @input="$emit('input', $event.target.value)"
  :id="id"
  :disabled="disabled">
    <option v-if="placeholder" selected value="">{{placeholder}}</option>
    <option v-for="(item, index) in list" :key="index" :value="item[valueList]">{{item[textList]}}</option>
  </select>
  <p class="text-xs font-medium text-[#EF4444]" :class="[{ 'mt-1': error }]">
    <slot name="error"/>
  </p>
</div>
</template>
<script>
import Icon from '@/assets/img/arrow-down.svg'
export default {
  name: 'PrimarySelectComponent',
  props: {
    placeholder: {
      type: String
    },
    list: {
      type: Array
    },
    valueList: {},
    textList: {},
    value: {},
    id: {
      required: true
    },
    iconLocation: {
      type: String,
      default: '90'
    },
    gray: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    error: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeStyles() {
      let select = document.getElementById(this.id)
      select.style.webkitAppearance = 'none'
      if(!this.disabled) {
      select.style.background = `url(${Icon}) ${this.iconLocation}% 50% no-repeat`
      }
    }
  },
  mounted() {
    this.changeStyles()
  }
}
</script>
<style scoped>
.gray {
  color: #6B7280;
  font-size: 12px;
  line-height: 16px;
}
</style>
