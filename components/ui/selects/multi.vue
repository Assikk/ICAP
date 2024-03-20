<template>
  <div class="flex flex-col text-sm text-[#374151]">
    <p :class="[{ 'mb-1': label }, { 'text-[#EF4444]': error }]">
      {{label}}
    </p>
    <div class="relative">
      <div class="border border-[#D1D5DB] rounded-md px-3 py-2 flex justify-between items-center cursor-pointer"
      @click="isShowList = !isShowList">
        <div class="flex items-center gap-2">
          <span v-for="(item, index) in activeList" :key="index" class="px-2 py-0.5 text-xs rounded-full bg-[#E2E8F0]">
            {{item[textList]}}
          </span>
        </div>
        <svg :class="isShowList ? 'rotate-180' : ''" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z" fill="#6B7280"/>
        </svg>
      </div>
      <p class="text-xs font-medium text-[#EF4444]" :class="[{ 'mt-2': error }]">
        <slot name="error"/>
      </p>
      <div v-if="isShowList" class="absolute top-full left-0 w-full border border-[#D1D5DB] rounded z-10 bg-white mt-2 flex flex-col">
        <div v-if="list.length > 0">
          <div class="flex items-center gap-2 px-3 py-1 cursor-pointer transition ease-linear"
          :class="item.isActive ? 'bg-[#F1FAFF]' : 'hover:bg-[#F1FAFF]'"
          v-for="(item, index) in list" :key="index"
          @click="addToList(item)">
            <svg width="20" height="20" fill="#5E6470" v-if="item.isActive">
              <use xlink:href="#check"/>
            </svg>
            <div class="w-5 h-5" v-else/>
            <p>
              {{item[textList]}}
            </p>
          </div>
        </div>
        <p v-else class="px-3 py-1 text-center">
          Not Found
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MultiSelectComponent',
  props: {
    label: {
      type: String,
    },
    list: [],
    textList: {
      type: String
    },
    valueList: {
      type: String
    },
    value: {},
    error: {}
  },
  data() {
    return {
      isShowList: false,
      activeList: [],
    }
  },
  methods: {
    init() {
      this.activeList = []
      this.list.forEach((item) => {
        item.isActive = false
        if(this.value.includes(item[this.valueList])) {
          this.activeList.push(item)
          item.isActive = true
        }
      })
    },
    addToList(item) {
      if(this.value.includes(item.id)) {
        const idx = this.value.indexOf(item.id)
        this.value.splice(idx, 1)
      } else {
        this.value.push(item.id)
      }
      this.init()
      this.isShowList = false
      this.$emit('change')
    },
  },
  mounted() {
    this.init()
  }
}
</script>
