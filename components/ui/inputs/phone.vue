<template>
  <div class="flex flex-col text-[#111827] text-sm font-medium">
    <label :for="id" :class="[{ 'mb-1': label }, { 'text-[#EF4444]': error }]">
      {{ label }}
    </label>
    <div class="flex items-center">
      <button
        id="dropdown-phone-button"
        data-dropdown-toggle="dropdown-phone"
        class="flex-shrink-0 z-10 inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg"
        type="button"
      >
        (+996)
      </button>
      <input
        :id="id"
        :type="type"
        class="w-full border border-gray-300 rounded-md rounded-l-none py-2.5 px-3.5 outline-none text-xs"
        :class="[{ 'border-[#FCA5A5]': error }]"
        :value="value"
        @input="handle($event)"
        :placeholder="placeholder"
      />
    </div>
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
  },
  methods: {
    handle(event) {
      if (this.uppercase) {
        event.target.value = event.target.value.toUpperCase()
      }
      this.$emit('input', event.target.value)
    },
  },
}
</script>
