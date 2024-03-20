<template>
  <div class="fixed bottom-9 z-10 right-9 min-w-[385px] max-w-[90%] w-max rounded-md p-4"
  :class="alertClass">
    <div class="flex items-center gap-3 font-medium">
      <svg v-if="alert.type == 'success'" width="24" height="24" fill="#34D399">
        <use xlink:href="#success"/>
      </svg>
      <svg v-else-if="alert.type == 'error'" width="24" height="24" fill="#F87171">
        <use xlink:href="#error"/>
      </svg>
      <svg v-else width="24" height="24" fill="#FBBF24">
        <use xlink:href="#warning"/>
      </svg>
      <div v-if="alert.type == 'error'">
        <div class="flex flex-col gap-2">
          <p v-for="item in alert.msg" :key="item">
            {{item}}
          </p>
        </div>
      </div>
      <p v-else>
        {{alert.msg}}
      </p>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'AlertComponent',
  computed: {
    ...mapState({
      alert: state => state.alert.alert
    }),
    alertClass() {
      let alertClass
      switch (this.alert.type) {
        case 'error':
          alertClass = 'bg-[#FEF2F2] text-[#991B1B]'
          break;
        case 'success':
          alertClass = 'bg-[#cff7e4] text-[#065F46]'
          break;
        default:
          alertClass = 'bg-[#FFFBEB] text-[#92400E]'
          break;
      }
      return alertClass
    }
  },
}
</script>
