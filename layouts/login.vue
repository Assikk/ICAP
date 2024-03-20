<template>
  <section>
    <Icons/>
    <Nuxt/>
    <transition name="fade">
      <Alert v-if="Alert.isActive"/>
    </transition>
  </section>
</template>
<script>
import {mapState} from 'vuex'
import Alert from '@/components/ui/modals/alert.vue'
import Icons from '@/components/ui/icons.vue'
export default {
  name: 'LoginLayout',
  components: {
    Icons,
    Alert
  },
  computed :{
    ...mapState({
      Alert: state => state.alert.alert
    })
  }
}
</script>
