<template>
  <div class="flex items-center gap-4 py-5 px-[22px] text-sm font-medium"
  :class="activeTab == tab.step ? 'text-[#038DB7] border border-l-4 border-l-[#038DB7] border-[#D1D5DB]' : tab.isComplete ? 'text-[#111827]' : 'text-[#6B7280]'">
    <div v-if="tab.isComplete"
    class="w-10 h-10 rounded-[20px] bg-[#038DB7] flex items-center justify-center">
      <svg width="20" height="20" fill="white">
        <use xlink:href="#check" />
      </svg>
    </div>
    <div v-else-if="tab.isSkip" class="w-10 h-10 rounded-[20px] bg-[#6B7280] flex items-center justify-center">
      <svg width="20" height="20" fill="white">
        <use xlink:href="#close" />
      </svg>
    </div>
    <div v-else class="w-10 h-10 border-2 rounded-[20px] flex items-center justify-center"
    :class="activeTab == tab.step ? 'border-[#038DB7]' : 'border-[#D1D5DB]'"
    >
      <p>
        {{tab.step}}
      </p>
    </div>
    <p>
      {{tab.name}}
    </p>
  </div>
</template>
<script>
export default {
  name: 'TabComponent',
  props: {
    tab: {},
    activeTab: {}
  }
}
</script>
