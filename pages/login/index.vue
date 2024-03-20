<template>
  <Page/>
</template>
<script>
import Page from '@/components/domain/login/index.vue'
export default {
  name: 'LoginPage',
  components: {
    Page
  },
  middleware: "auth",
  layout: 'login'
}
</script>
