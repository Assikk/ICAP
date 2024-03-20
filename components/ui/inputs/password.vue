<template>
  <div class="flex flex-col text-[#111827] text-sm font-medium">
    <label :for="id" :class="[{ 'mb-1': label }, { 'text-[#EF4444]': error }]">
      {{ label }}
    </label>
    <div
      class="relative border border-gray-300 rounded-md py-2.5 px-3.5 outline-none text-xs"
      :class="[{ 'border-[#FCA5A5]': error }]"
    >
      <input
        :id="id"
        :type="type"
        class="w-full outline-none"
        :value="value"
        @input="handle($event)"
      />
      <svg
        v-if="type == 'password'"
        class="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer"
        width="20"
        height="20"
        fill="none"
        stroke="#D1D5DB"
        @click="type = 'text'"
      >
        <use xlink:href="#open-eye" />
      </svg>
      <svg
        v-else
        class="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer"
        width="20"
        height="20"
        fill="none"
        stroke="#D1D5DB"
        @click="type = 'password'"
      >
        <use xlink:href="#close-eye" />
      </svg>
    </div>
    <p class="text-xs font-medium text-[#EF4444]" :class="[{ 'mt-1': error }]">
      <slot name="error" />
    </p>
  </div>
</template>
<script>
export default {
  name: 'PasswordInput',
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
  },
  data() {
    return {
      type: 'password',
    }
  },
  methods: {
    handle(event) {
      if (event.target.value.includes(' ')) {
        event.target.value = event.target.value.replace(/\s/g, '');
      }
      this.$emit('input', event.target.value)
    },
  }
}
</script>
