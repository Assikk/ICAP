<template>
  <Page/>
</template>
<script>
import Page from '@/components/domain/new-password/index.vue'
export default {
  name: 'NewPasswordPage',
  components: {
    Page
  },
  auth: 'guest',
  layout: 'login'
}
</script>
