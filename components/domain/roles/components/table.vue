<template>
  <div class="relative w-full h-full rounded-md border border-[#E5E7EB] flex flex-col justify-between bg-white">
    <div v-if="isLoading" class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <LoadingDots />
    </div>
    <div v-else class="h-full flex flex-col justify-between">
      <table>
        <thead>
          <tr>
            <th v-for="item in head" :key="item.id">
              <span class="whitespace-nowrap">
                {{ item.name }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <slot name="body" />
        </tbody>
      </table>
      <div class="py-4 px-6 border-t border-[#E5E7EB] flex justify-end">
        <div class="flex gap-4">
          <Button white @click="$emit('back')">
            Отмена
          </Button>
          <Button :disabled="disabledButton" @click="$emit('save')">
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoadingDots from '@/components/ui/loading/dots.vue'
import Button from '@/components/ui/buttons/default.vue'
export default {
  name: 'TableComponent',
  components: {
    LoadingDots,
    Button
  },
  props: {
    head: {
      type: Array,
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    list: {
      default: 10,
    },
    disabledButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activePage: 1,
    }
  },
}
</script>
<style scoped>
table {
  width: 100%;
}
thead {
  background: #f9fafb;
}
thead tr th {
  padding: 12px 24px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: #6b7280;
  letter-spacing: 0.6px;
  text-align: start;
  border-radius: 8px 8px 0 0;
}
thead tr td {
  padding: 12px 24px;
}
tbody tr td {
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
  line-height: 20px;
  color: #1e3148;
}
</style>
