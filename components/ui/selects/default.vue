<template>
  <div class="text-sm text-[#111827]">
    <div class="flex flex-col">
      <p :class="label ? 'mb-1' : ''" class="text-sm font-medium text-gray-700">
        {{ label }}
      </p>
      <div>
        <div
          class="border border-gray-300 bg-white rounded-md py-2 px-3.5 flex items-center gap-4 justify-between cursor-pointer"
          :class="[{ 'border-[#FCA5A5]': error }]"
          @click="isShowList = !isShowList"
        >
          <p v-if="active.name">
            {{ active[textList] }}
          </p>
          <p v-else class="text-[#677593] text-xs">
            {{ placeholder }}
          </p>
          <svg
            :class="isShowList ? 'rotate-90' : 'rotate-[270deg]'"
            width="20"
            height="20"
            fill="#677593"
          >
            <use xlink:href="#arrow" />
          </svg>
        </div>
        <p
          class="text-xs font-medium text-[#EF4444]"
          :class="[{ 'mt-2': error }]"
        >
          <slot name="error" />
        </p>
      </div>
    </div>
    <div
      v-if="isShowList"
      class="max-h-[150px] overflow-y-auto border border-[#111827] rounded-md mt-2 flex flex-col gap-2"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="py-2 px-1.5 cursor-pointer flex items-center gap-1.5 transition ease-linear"
        :class="
          active[valueList] == item[valueList]
            ? 'bg-[#F1FAFF]'
            : 'hover:bg-[#F1FAFF]'
        "
        @click="clickItem(item)"
      >
        <div class="w-5 h-5">
          <svg
            v-if="active.id == item.id"
            width="20"
            height="20"
            fill="#5E6470"
          >
            <use xlink:href="#check" />
          </svg>
        </div>
        <p>
          {{ item[textList] }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectDefaultComponent',
  props: {
    placeholder: {
      type: String,
    },
    list: {
      type: Array,
    },
    textList: {},
    valueList: {},
    activeId: {
      default: null,
    },
    error: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
  },
  data() {
    return {
      active: {},
      isShowList: false,
    }
  },
  methods: {
    getActive() {
      this.active = this.list.filter(
        (item) => item[this.valueList] == this.activeId
      )[0] || {
        name: '',
        value: '',
      }
    },
    clickItem(item) {
      this.active = item
      this.isShowList = false
      this.$emit('click', this.active)
    },
  },
  created() {
    this.getActive()
  },
}
</script>
