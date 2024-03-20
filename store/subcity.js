import dayjs from "dayjs";

export const state = () => ({
  subcities: [],
  subcity: {},
  count: '',
  isLoading: true,
  isShowAddsubcity: false,
  isShowEditsubcity: false,
  isShowDeletesubcity: false,
  search: ''
})

export const mutations = {
  SET_SUBCITIES(state, payload) {
    state.subcities = payload
    state.subcities.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_SUBCITY(state, payload) {
    state.subcity = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDSUBCITY(state, payload) {
    state.isShowAddsubcity = payload
  },
  SHOW_EDITSUBCITY(state, payload) {
    state.isShowEditsubcity = payload
  },
  SHOW_DELETESUBCITY(state, payload) {
    state.isShowDeletesubcity = payload
  },
  SET_SEARCH(state, payload) {
    state.search = payload
  }
}

export const getters = {
}

export const actions = {
  async get_subcities({
    commit
  }, search) {
    commit('SET_SUBCITIES', [])
    commit('SET_LOADING', true)
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`accounts/cities/?${filter}`)
    commit('SET_SUBCITIES', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async create_subcity({commit, dispatch}, form) {
    let res = await this.$axios.post('accounts/cities/', form)
    commit('SET_SUBCITY', res.data)
    dispatch('get_subcities')
  },
  async get_subсity({commit}, id) {
    commit('SET_SUBCITY', {})
    let res = await this.$axios.get(`accounts/cities/${id}/`)
    commit('SET_SUBCITY', res.data)
  },
  async edit_subcity({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`accounts/cities/${id}/`, form)
    commit('SET_SUBCITY', res.data)
    dispatch('get_subcities')
  },
  async delete_subcity({commit, dispatch}, id) {
    await this.$axios.delete(`accounts/cities/${id}/`)
    commit('SHOW_DELETESUBCITY', false)
    dispatch('get_subcities', {page: 1})
  },
}
