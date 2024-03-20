<template>
  <section class="flex min-h-[100vh] h-full bg-[#F3F4F6]">
    <Icons/>
    <Aside/>
    <Nuxt class="flex-1"/>
    <transition-group name="fade">
      <Alert key="alert" v-if="Alert.isActive"/>
      <Logout key="logout" v-if="isShowLogout"/>
    </transition-group>
  </section>
</template>
<script>
import {mapState} from 'vuex'
import Alert from '@/components/ui/modals/alert.vue'
import Logout from '@/components/ui/modals/logout.vue'
import Icons from '@/components/ui/icons.vue'
import Aside from '@/components/ui/aside.vue'
export default {
  name: 'DefaultLayout',
  components: {
    Aside,
    Icons,
    Alert,
    Logout,
  },
  computed :{
    ...mapState({
      Alert: state => state.alert.alert,
      isShowLogout: state => state.authorization.isShowLogout
    })
  }
}
</script>
