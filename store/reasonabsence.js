import dayjs from "dayjs";
export const state = () => ({
  reasonabsences: [],
  reasonabsence: {},
  count: '',
  isLoading: true,
  isShowAddreasonabsence: false,
  isShowEditreasonabsence: false,
  isShowDeletereasonabsence: false,
})

export const mutations = {
  SET_REASONABSENCES(state, payload) {
    state.reasonabsences = payload
    state.reasonabsences.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_REASONABSENCE(state, payload) {
    state.reasonabsence = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDREASONABSENCE(state, payload) {
    state.isShowAddreasonabsence = payload
  },
  SHOW_EDITREASONABSENCE(state, payload) {
    state.isShowEditreasonabsence = payload
  },
  SHOW_DELETEREASONABSENCE(state, payload) {
    state.isShowDeletereasonabsence = payload
  },
}

export const getters = {}

export const actions = {
  async create_reasonabsence({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/confirmed-hiv-test-absence-reasons/', form)
    commit('SET_REASONABSENCE', res.data)
    dispatch('get_reasonabsences')
  },
  async get_reasonabsences({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_REASONABSENCE', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/confirmed-hiv-test-absence-reasons/?${filter}`)
    commit('SET_REASONABSENCES', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_reasonabsence({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/confirmed-hiv-test-absence-reasons/${id}/`, form)
    commit('SET_REASONABSENCE', res.data)
    dispatch('get_reasonabsences')
  },
  async delete_reasonabsence({commit, dispatch}, id) {
    await this.$axios.delete(`clients/confirmed-hiv-test-absence-reasons/${id}/`)
    commit('SHOW_DELETEREASONABSENCE', false)
    dispatch('get_reasonabsences', {page: 1})
  },
}
