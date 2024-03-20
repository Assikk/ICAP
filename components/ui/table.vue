<template>
  <div
    class="relative h-full w-full rounded-md border border-[#E5E7EB] flex flex-col justify-between bg-white"
  >
    <div class="h-full min-h-[660px]">
      <div
        v-if="isLoading"
        class="h-full flex justify-center items-center min-h-[660px]"
      >
        <LoadingDots />
      </div>
      <table v-else>
        <thead>
          <tr>
            <th v-for="item in head" :key="item.id">
              <span>
                {{ item.name }}
              </span>
            </th>
          </tr>
          <tr>
            <slot name="search" />
          </tr>
        </thead>
        <tbody>
          <slot name="body" />
        </tbody>
      </table>
    </div>
    <div
      v-if="isPagination"
      class="sticky left-0 bottom-0 px-6 py-[21px] flex items-center justify-between gap-4"
    >
      <p class="text-sm text-[#64748B]">
        Показано:
        <span class="border border-[#D1D5DB] rounded-md px-3 py-2 mx-2"
          ><span class="font-medium">{{ activePage }} - {{ count }}</span> из
          <span class="font-medium">{{ list.length }}</span>
          <span class="font-medium">{{ count }}</span></span
        >
      </p>
      <Pagination :pageCount="Math.ceil(count / 10)" :clickHandler="change" />
    </div>
  </div>
</template>
<script>
import LoadingDots from '@/components/ui/loading/dots.vue'
import Pagination from '@/components/ui/pagination.vue'
export default {
  name: 'TableComponent',
  components: {
    LoadingDots,
    Pagination,
  },
  props: {
    head: {
      type: Array,
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    count: {},
    list: {
      default: 10,
    },
    isPagination: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      activePage: 1,
    }
  },
  methods: {
    change(page) {
      this.activePage = page
      if (page > 1) {
        this.activePage = `${page - 1}${page - 1}`
      }
      this.$emit('changePage', page)
    },
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
