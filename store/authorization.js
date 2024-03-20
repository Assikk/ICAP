export const state = () => ({
  isShowLogout: false
})

export const mutations = {
  SHOW_LOGOUT(state, payload) {
    state.isShowLogout = payload
  }
}

export const getters = {
}

export const actions = {
  async reset_password({commit}, form) {
    let res = await this.$axios.post('accounts/reset-password/', form)
    this.$router.push(`/new-password?token=${res.data.token}`)
  },
  async validate_token({commit}, token) {
    if(token) {
      try {
        await this.$axios.post('accounts/reset-password/validate_token/', {
          token: token
        })
      } catch(err) {
        console.log(err);
        this.$router.push('/recovery-password')
      }
    } else this.$router.push('/recovery-password')
  },
  async new_password({commit}, form) {
    await this.$axios.post('accounts/reset-password/confirm/', form)
    this.$router.push('/login')
  }
}
