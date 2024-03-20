<template>
  <div class="flex flex-col text-[#111827] text-sm font-medium">
    <label :for="id" :class="[{ 'mb-1': label }, { 'text-[#EF4444]': error }]">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      class="border border-gray-300 rounded-md py-2.5 px-3.5 outline-none text-xs"
      :class="[{ 'border-[#FCA5A5]': error }]"
      :value="value"
      @input="handle($event)"
      :placeholder="placeholder"
      :disabled="disabled"
      @blur="$emit('blur')"
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
    type: {
      type: String,
      default: 'text',
    },
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
    placeholder: {
      type: String,
    },
    uppercase: {
      type: Boolean,
      deafult: false,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    whitespace: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handle(event) {
      if (this.uppercase) {
        event.target.value = event.target.value.toUpperCase()
      }
      if(this.whitespace) {
        if (event.target.value.includes(' ')) {
          event.target.value = event.target.value.replace(/\s/g, '');
        }
      }
      this.$emit('input', event.target.value)
    },
  },
}
</script>
