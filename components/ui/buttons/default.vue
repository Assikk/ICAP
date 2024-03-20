<template>
  <button class="flex items-center gap-2 text-sm rounded-md font-semibold bg-[#038DB7] hover:bg-[#0A7194] text-white py-2 px-3"
  @click="$emit('click')"
  :class="[
  {'blue': blue},
  {'white': white},
  {'outlined': outlined},
  {'w-fit': small}
  ]"
  :disabled="disabled">
    <template>
      <slot name="prev-icon"/>
    </template>
    <slot/>
    <template>
      <slot name="next-icon"/>
    </template>
  </button>
</template>
<script>
export default {
  name: 'DefaultButtonComponent',
  props: {
    blue: {
      type: Boolean,
      default:  false
    },
    white: {
      type: Boolean,
      deafult: false
    },
    outlined: {
      type: Boolean,
      deafult: false
    },
    small: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
  button:disabled {
    background: #789CAB;
    color: #FFFFFF80;
  }
  .blue {
    background: #DAF4FF;
    color: #0A7194;
    border: none;
  }
  .white {
    background: white;
    color: #A1A1AA;
    border: 1px solid #D1D5DB;
    font-weight: 500;
  }
  .outlined {
    background: white;
    border: 1px solid #D1D5DB;
    color: #0A7194;
    font-weight: 500;
  }
</style>
