import dayjs from "dayjs";

export const state = () => ({
  suborganizations: [],
  suborganization: {},
  count: '',
  isLoading: true,
  isShowAddsuborganization: false,
  isShowEditsuborganization: false,
  isShowDeletesuborganization: false,
  search: ''
})

export const mutations = {
  SET_SUBORGANIZATIONS(state, payload) {
    state.suborganizations = payload
    state.suborganizations.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_SUBORGANIZATION(state, payload) {
    state.suborganization = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDSUBORGANIZATION(state, payload) {
    state.isShowAddsuborganization = payload
  },
  SHOW_EDITSUBORGANIZATION(state, payload) {
    state.isShowEditsuborganization = payload
  },
  SHOW_DELETESUBORGANIZATION(state, payload) {
    state.isShowDeletesuborganization = payload
  },
  SET_SEARCH(state, payload) {
    state.search = payload
  }
}

export const getters = {}

export const actions = {
  async get_suborganizations({ commit }, search) {
    commit('SET_SUBORGANIZATIONS', [])
    commit('SET_LOADING', true)
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`accounts/organization-names/?${filter}`)
    commit('SET_SUBORGANIZATIONS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async create_suborganization({ commit, dispatch }, form) {
    let res = await this.$axios.post('accounts/organization-names/', form)
    commit('SET_SUBORGANIZATION', res.data)
    dispatch('get_suborganizations')
  },
  async get_suborganization({ commit }, id) {
    commit('SET_SUBORGANIZATION', {})
    let res = await this.$axios.get(`accounts/organization-names/${id}/`)
    commit('SET_SUBORGANIZATION', res.data)
  },
  async edit_suborganization({ commit, dispatch }, { id, form }) {
    let res = await this.$axios.put(`accounts/organization-names/${id}/`, form)
    commit('SET_SUBORGANIZATION', res.data)
    dispatch('get_suborganizations')
  },
  async delete_suborganization({ commit, dispatch }, id) {
    await this.$axios.delete(`accounts/organization-names/${id}/`)
    commit('SHOW_DELETESUBORGANIZATION', false)
    dispatch('get_suborganizations', { page: 1 })
  },
}
