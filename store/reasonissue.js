import dayjs from "dayjs";
export const state = () => ({
  reasonissues: [],
  reasonissue: {},
  count: '',
  isLoading: true,
  isShowAddreasonissue: false,
  isShowEditreasonissue: false,
  isShowDeletereasonissue: false,
})

export const mutations = {
  SET_REASONISSUES(state, payload) {
    state.reasonissues = payload
    state.reasonissues.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_REASONISSUE(state, payload) {
    state.reasonissue = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDREASONISSUE(state, payload) {
    state.isShowAddreasonissue = payload
  },
  SHOW_EDITREASONISSUE(state, payload) {
    state.isShowEditreasonissue = payload
  },
  SHOW_DELETEREASONISSUE(state, payload) {
    state.isShowDeletereasonissue = payload
  },
}

export const getters = {}

export const actions = {
  async create_reasonissue({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/coupon-non-issuance-reasons/', form)
    commit('SET_REASONISSUE', res.data)
    dispatch('get_reasonissues', {page: 1})
  },
  async get_reasonissues({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_REASONISSUES', [])
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/coupon-non-issuance-reasons/?${filter}`)
    commit('SET_REASONISSUES', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async get_reasonissue({commit}, id) {
    commit('SET_REASONISSUE', {})
    let res = await this.$axios.get(`clients/coupon-non-issuance-reasons/${id}/`)
    commit('SET_REASONISSUE', res.data)
  },
  async edit_reasonissue({commit}, {id, form}) {
    let res = await this.$axios.put(`clients/coupon-non-issuance-reasons/${id}/`, form)
    commit('SET_REASONISSUE', res.data)
  },
  async delete_reasonissue({commit, dispatch}, id) {
    await this.$axios.delete(`clients/coupon-non-issuance-reasons/${id}/`)
    commit('SHOW_DELETEREASONISSUE', false)
    dispatch('get_reasonissues', {page: 1})
  },
}
