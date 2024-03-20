<template>
  <ul class="w-fit flex gap-[1px] p-0.5 bg-[#F3F4F6] rounded-lg text-sm font-medium mx-4">
    <li v-for="(item, index) in list" :key="index" class="px-4 py-1 rounded-md cursor-pointer"
    :class="value == item[valueList] ? active : 'text-[#94A3B8]'"
    @click="$emit('click')">
      {{item[textList]}}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'CheckboxComponent',
  props: {
    list: {
      type: Array
    },
    value: {},
    textList: {},
    valueList: {}
  },
  computed: {
    active() {
      if(this.value === true) {
        return 'bg-[#0A7194] text-[#F8FAFC]'
      } else if(this.value === false) {
        return 'bg-[#FFFFFF] text-[#334155]'
      }
    }
  },
}
</script>
