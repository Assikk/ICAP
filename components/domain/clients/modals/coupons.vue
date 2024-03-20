<template>
  <div class="fixed top-0 bg-[#00000046] left-0 w-full h-full z-10 flex items-center justify-center">
    <div class="absolute top-0 left-0 w-full h-full" @click="show_printCoupons(false)"/>
    <div class="relative bg-white rounded-md py-4 w-[860px] max-h-[90%] overflow-y-auto scrollbar">
      <div class="flex items-center justify-between gap-4 px-6">
        <h3 class="text-2xl font-semibold text-[#0F172A]">
          Печать купонов
        </h3>
        <svg width="24" height="24" fill="#94A3B8" class="cursor-pointer"
        @click="show_printCoupons(false)">
          <use xlink:href="#close" />
        </svg>
      </div>
      <div id="coupons123" class="p-8 flex flex-col gap-3">
        <div v-for="(item, index) in list" :key="index" class="coupon">
          <div class="p-4 h-full c
          text-center">
            <h2 class="text-[68px] text-[#063246] font-bold">
              Купон
            </h2>
            <p class="text-[#125B78] text-lg italic">
              на бесплатное прохождение теста
            </p>
            <p class="text-[#063246] text-[22px] font-medium">
              ID: {{item.id}}
            </p>
            <img class="mx-auto mt-2" src="@/assets/img/primary-logo.svg" alt="LogoPrimary" />
          </div>
        </div>
      </div>
      <div class="pt-4 px-6 flex justify-end border-t border-[#E2E8F0]">
        <div class="flex gap-4">
          <Button white @click="show_printCoupons(false)">
            Назад
          </Button>
          <Button @click="printCoupons">
            Печать
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import Button from '@/components/ui/buttons/default.vue'
import html2canvas from 'html2canvas';
export default {
  name: 'DeletePartnerModal',
  components: {
    Button
  },
  props: {
    list: {}
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations({
      show_printCoupons: 'client/SHOW_PRINTCOUPONS'
    }),
    async printCoupons() {
      const printableContent = document.getElementById('coupons123');
      try {
        const canvas = await html2canvas(printableContent);
        const imgData = canvas.toDataURL('image/png');
        const img = new Image();
        img.onload = function () {
          const printWindow = window.open('', '_blank');
          printWindow.document.write('<html><head><title>Print</title></head><body>');
          printWindow.document.write('<img src="' + img.src + '"/>');
          printWindow.document.write('</body></html>');
          printWindow.document.close();
          printWindow.onload = function () {
          printWindow.print();
          printWindow.close();
          };
        };
        img.src = imgData;
      } catch (error) {
        console.error('Error in html2canvas:', error);
      }
    }
  },
}
</script>
<style scoped>
.coupon {
  background: linear-gradient(262deg, #75B5E2 0%, #F0FEFF 100%, #CEF9FF 100%);
  height: 265px;
  border-radius: 6px;
}
</style>
