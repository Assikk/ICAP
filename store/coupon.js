export const state = () => ({
  list: [],
  coupon: {}
})

export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload
  },
  SET_COUPON(state, payload) {
    state.coupon = payload
  }
}

export const getters = {}

export const actions = {
  async get_list({commit}, search) {
    commit('SET_LIST', [])
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/client-coupons/?${filter}`)
    commit('SET_LIST', res.data.results)
  },
  async create_coupon({commit}, form) {
    commit('SET_COUPON', null)
    let res = await this.$axios.post('clients/client-coupons/', form)
    commit('SET_COUPON', res.data)
  },
  async edit_coupon({commit}, {id, form}) {
    let res = await this.$axios.patch(`clients/client-coupons/${id}/`, form)
    commit('SET_COUPON', res.data)
  },
  async delete_coupon({commit}, id) {
    await this.$axios.delete(`clients/client-coupons/${id}/`)
    commit('SET_COUPON', null)
  }
}
