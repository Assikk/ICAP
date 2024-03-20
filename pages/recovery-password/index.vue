<template>
  <Page/>
</template>
<script>
import Page from '@/components/domain/recovery-password/index.vue'
export default {
  name: 'RecoveryPasswordPage',
  components: {
    Page
  },
  auth: 'guest',
  layout: 'login'
}
</script>
