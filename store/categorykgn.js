import dayjs from "dayjs";
export const state = () => ({
  categorykgns: [],
  categorykgn: {},
  count: '',
  isLoading: true,
  isShowAddcategorykgn: false,
  isShowEditcategorykgn: false,
  isShowDeletecategorykgn: false,
})

export const mutations = {
  SET_CATEGORYKGNS(state, payload) {
    state.categorykgns = payload
    state.categorykgns.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_CATEGORYKGN(state, payload) {
    state.categorykgn = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDCATEGORYKGN(state, payload) {
    state.isShowAddcategorykgn = payload
  },
  SHOW_EDITCATEGORYKGN(state, payload) {
    state.isShowEditcategorykgn = payload
  },
  SHOW_DELETECATEGORYKGN(state, payload) {
    state.isShowDeletecategorykgn = payload
  },
}

export const getters = {}

export const actions = {
  async create_categorykgn({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/kp-categories/', form)
    commit('SET_CATEGORYKGN', res.data)
    dispatch('get_categorykgns')
  },
  async get_categorykgns({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_CATEGORYKGNS', [])
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/kp-categories/?${filter}`)
    commit('SET_CATEGORYKGNS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async get_categorykgn({commit}, id) {
    commit('SET_CATEGORYKGN', {})
    let res = await this.$axios.get(`clients/kp-categories/${id}/`)
    commit('SET_CATEGORYKGN', res.data)
  },
  async edit_categorykgn({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/kp-categories/${id}/`, form)
    commit('SET_CATEGORYKGN', res.data)
    // dispatch('get_categorykgns')
  },
  async delete_categorykgn({commit, dispatch}, id) {
    await this.$axios.delete(`clients/kp-categories/${id}/`)
    commit('SHOW_DELETECATEGORYKGN', false)
    dispatch('get_categorykgns', {page: 1})
  },
}
