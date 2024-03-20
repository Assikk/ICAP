<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_editColumns(false)"/>
    <div class="relative w-[291px] bg-white rounded-md flex flex-col justify-between px-4 py-1 scrollbar">
      <div class="flex items-center justify-between gap-4 py-2">
        <h5 class="text-sm text-[#1E293B] font-medium">
          Выбор столбцов
        </h5>
        <svg class="cursor-pointer" width="20" height="20" fill="#1E293B"
        @click="show_editColumns(false)">
          <use xlink:href="#close"/>
        </svg>
      </div>
      <div v-for="item in list" :key="item.id"
      class="flex flex-col">
        <div v-if="Object.keys(item).length > 0" class="flex items-center gap-3 py-2">
          <input v-model="item.isShow" type="checkbox" class="w-4 h-5">
          <p class="text-xs text-[#475569]">
            {{item.name}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  name: 'EditColumnsModal',
  props: {
    list: {}
  },
  methods: {
    ...mapMutations({
      show_editColumns: 'client/SHOW_EDITCOLUMNS'
    })
  }
}
</script>
<style scoped>
input[type='checkbox'] {
  accent-color: #0A7194;
}
</style>

