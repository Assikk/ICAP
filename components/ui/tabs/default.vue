<template>
  <div class="rounded-md cursor-pointer">
    <p v-for="item in list" :key="item.id" class="text-sm font-medium pb-[18px] p-4 bg-white rounded-md border-b"
    :class="active == item.id ? 'border-b-2 border-indigo-500 text-gray-900 whitespace-nowrap border-x-gray-500 w-full' : 'text-gray-500 w-full whitespace-nowrap border-x'"
    @click="clickTab(item)">
      {{item.name}}
    </p>
  </div>
</template>
<script>
export default {
  name: 'TabsComponent',
  props: {
    list: {
      type: Array
    },
    active: {},
  },
  methods: {
    clickTab(item) {
        this.$emit('click', item)
    }
  }
}
</script>
