<template>
  <div class="border-b border-[#111827] flex gap-8">
    <p
      v-for="item in list"
      :key="item.id"
      class="cursor-pointer text-sm font-medium pb-[18px]"
      :class="
        active == item.id
          ? 'border-b border-[#5E6470] text-[#5E6470]'
          : 'text-[#677593]'
      "
      @click="clickTab(item)"
    >
      {{ item.name }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'TabsComponent',
  props: {
    list: {
      type: Array,
    },
    active: {},
  },
  methods: {
    clickTab(item) {
      this.$emit('click', item)
    },
  },
}
</script>
