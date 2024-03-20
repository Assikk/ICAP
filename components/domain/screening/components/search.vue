<template>
  <div
    class="w-full flex items-center gap-3 p-2 border border-gray-300 bg-white rounded-lg"
    :class="isInputFocused ? 'border-[#111827]' : 'border-[#111827]'"
  >
    <svg width="20" height="20" fill="#677593">
      <use xlink:href="#search" />
    </svg>
    <input
      type="text"
      class="outline-none w-full text-sm text-[#677593]"
      placeholder="Поиск"
      :value="value"
      @input="handleInput($event)"
      @focus="isInputFocused = true"
      @blur="isInputFocused = false"
    />
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'SearchComponent',
  computed: {
    value: {
      get() {
        return this.$store.state.subregion.search
      },
      set(value) {
        this.set_search(value)
      },
    },
  },
  data() {
    return {
      isInputFocused: false,
    }
  },
  methods: {
    ...mapMutations({
      set_search: 'subcity/SET_SEARCH',
    }),
    handleInput(event) {
      setTimeout(() => {
        this.set_search(event.target.value)
        this.$emit('input', event.target.value)
      }, 750)
    },
  },
}
</script>
