<template>
<div class="flex flex-col text-[#111827] text-sm font-medium">
  <label :for="id"
  :class="[{ 'mb-1': label }, { 'text-[#EF4444]': error }]">
    {{label}}
  </label>
  <input type="date" class="bg-transparent px-3 py-2 border border-[#D1D5DB] rounded-md text-sm text-[#6B7280] outline-none"
  :class="[
  {'text-xs': xs},
  ]"
  :value="value"
  @input="$emit('input', $event.target.value)"
  :disabled="disabled"
  :min="min">
  <p class="text-xs font-medium text-[#EF4444]" :class="[{ 'mt-1': error }]">
    <slot name="error" />
  </p>
</div>

</template>
<script>
export default {
  name: 'DateComponent',
  props: {
    value: {},
    id: {},
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
    },
    xs: {
      type: Boolean,
      default: false
    },
    min: {
      type: String
    }
  },
}
</script>
