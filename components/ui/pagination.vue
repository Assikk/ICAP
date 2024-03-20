<template>
  <ul class="flex">
    <li
      v-if="!(firstPageSelected() && hidePrevNext)"
      :class="[prevClass, firstPageSelected() ? disabledClass : '']"
      class="flex justify-center items-center h-[38px] w-[38px] border border-r-0 border-[#e5e7eb] rounded-l-md"
    >
      <a
        @click="prevPage()"
        @keyup.enter="prevPage()"
        :class="prevLinkClass"
        :tabindex="firstPageSelected() ? -1 : 0"
        class="flex items-center gap-3"
      >
        <svg width="20" height="20" fill="#677593">
          <use xlink:href="#arrow" />
        </svg>
      </a>
    </li>
    <div class="flex items-end">
      <li
        v-for="(page, index) in pages"
        :key="index"
        :class="[
          pageClass,
          page.selected
            ? 'text-[#5E6470] bg-[#F1FAFF] border-[#e5e7eb]'
            : 'border-[#e5e7eb] text-[#677593]',
          page.disabled ? disabledClass : '',
          page.breakView ? breakViewClass : '',
        ]"
        class="w-[46px] h-full text-sm font-medium border"
      >
        <a
          v-if="page.breakView"
          :class="[pageLinkClass, breakViewLinkClass]"
          tabindex="0"
          ><slot name="breakViewContent">{{ breakViewText }}</slot></a
        >
        <a v-else-if="page.disabled" :class="pageLinkClass" tabindex="0">{{
          page.content
        }}</a>
        <a
          v-else
          @click="handlePageSelected(page.index + 1)"
          @keyup.enter="handlePageSelected(page.index + 1)"
          :class="pageLinkClass"
          tabindex="0"
          >{{ page.content }}</a
        >
      </li>
    </div>

    <li
      v-if="!(lastPageSelected() && hidePrevNext)"
      :class="[nextClass, lastPageSelected() ? disabledClass : '']"
      class="flex justify-center items-center h-[38px] w-[38px] border border-l-0 border-[#e5e7eb] rounded-r-md cursor-pointer"
      @click="nextPage()"
      @keyup.enter="nextPage()"
    >
      <a
        :class="nextLinkClass"
        :tabindex="lastPageSelected() ? -1 : 0"
        class="flex items-center gap-3"
      >
        <svg class="rotate-180" width="20" height="20" fill="#677593">
          <use xlink:href="#arrow" />
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
    },
    pageCount: {
      required: true,
    },
    forcePage: {
      type: Number,
    },
    clickHandler: {
      type: Function,
      default: () => {},
    },
    pageRange: {
      type: Number,
      default: 3,
    },
    marginPages: {
      type: Number,
      default: 1,
    },
    breakViewText: {
      type: String,
      default: '…',
    },
    pageClass: {
      type: String,
    },
    pageLinkClass: {
      type: String,
    },
    prevClass: {
      type: String,
    },
    prevLinkClass: {
      type: String,
    },
    nextClass: {
      type: String,
    },
    nextLinkClass: {
      type: String,
    },
    breakViewClass: {
      type: String,
    },
    breakViewLinkClass: {
      type: String,
    },
    activeClass: {
      type: String,
      default: 'active',
    },
    disabledClass: {
      type: String,
      default: 'disabled',
    },
    firstLastButton: {
      type: Boolean,
      default: false,
    },
    firstButtonText: {
      type: String,
      default: 'First',
    },
    lastButtonText: {
      type: String,
      default: 'Last',
    },
    hidePrevNext: {
      type: Boolean,
      default: false,
    },
  },
  beforeUpdate() {
    if (this.forcePage === undefined) return
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage
    }
  },
  computed: {
    selected: {
      get: function () {
        return this.value || this.innerValue
      },
      set: function (newValue) {
        this.innerValue = newValue
      },
    },
    pages: function () {
      let items = {}
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          let page = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1,
          }
          items[index] = page
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2)

        let setPageItem = (index) => {
          let page = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1,
          }

          items[index] = page
        }

        let setBreakView = (index) => {
          let breakView = {
            disabled: true,
            breakView: true,
          }

          items[index] = breakView
        }

        // 1st - loop thru low end of margin pages
        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i)
        }

        // 2nd - loop thru selected range
        let selectedRangeLow = 0
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange
        }

        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1
        }

        for (
          let i = selectedRangeLow;
          i <= selectedRangeHigh && i <= this.pageCount - 1;
          i++
        ) {
          setPageItem(i)
        }

        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1)
        }

        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1)
        }

        // 3rd - loop thru high end of margin pages
        for (
          let i = this.pageCount - 1;
          i >= this.pageCount - this.marginPages;
          i--
        ) {
          setPageItem(i)
        }
      }
      return items
    },
  },
  data() {
    return {
      innerValue: 1,
    }
  },
  methods: {
    handlePageSelected(selected) {
      if (this.selected === selected) return

      this.innerValue = selected
      this.$emit('input', selected)
      this.clickHandler(selected)
    },
    prevPage() {
      if (this.selected <= 1) return

      this.handlePageSelected(this.selected - 1)
    },
    nextPage() {
      if (this.selected >= this.pageCount) return

      this.handlePageSelected(this.selected + 1)
    },
    firstPageSelected() {
      return this.selected === 1
    },
    lastPageSelected() {
      return this.selected === this.pageCount || this.pageCount === 0
    },
    selectFirstPage() {
      if (this.selected <= 1) return

      this.handlePageSelected(1)
    },
    selectLastPage() {
      if (this.selected >= this.pageCount) return

      this.handlePageSelected(this.pageCount)
    },
  },
}
</script>

<style lang="css" scoped>
a {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
