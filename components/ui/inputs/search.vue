<template>
  <div class="flex items-center gap-2 border border-[#D1D5DB] rounded-md text-xs text-[#6B7280] px-3 py-2">
    <svg width="16" height="16" fill="#6B7280" class="min-w-[16px] h-4">
      <use xlink:href="#search"/>
    </svg>
    <input type="text" class="outline-none bg-transparent w-full"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)">
  </div>
</template>
<script>
export default {
  name: 'SearchComponent',
  props: {
    placeholder: {
      type: String
    },
    value: {}
  }
}
</script>
