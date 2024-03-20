<template>
  <div class="flex flex-col text-[#111827] text-sm font-medium">
    <label :for="id" :class="[{ 'mb-1': label }, { 'text-[#EF4444]': error }]">
      {{ label }}
    </label>
    <textarea
      class="border border-gray-300 rounded-md py-2.5 px-3.5 outline-none text-xs"
      :name="id"
      :id="id"
      :cols="cols"
      :rows="rows"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <p class="text-xs font-medium text-[#EF4444]" :class="[{ 'mt-1': error }]">
      <slot name="error" />
    </p>
  </div>
</template>
<script>
export default {
  name: 'DefaultInput',
  props: {
    label: {
      type: String,
    },
    id: {
      type: String,
    },
    value: {},
    error: {
      type: Boolean,
      default: false,
    },
    cols: {
      default: '30',
    },
    rows: {
      default: '10',
    },
  },
}
</script>
