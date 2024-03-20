import dayjs from "dayjs";
export const state = () => ({
  confirmationresults: [],
  confirmationresult: {},
  count: '',
  isLoading: true,
  isShowAddconfirmationresult: false,
  isShowEditconfirmationresult: false,
  isShowDeleteconfirmationresult: false,
})

export const mutations = {
  SET_CONFIRMATIONRESULTS(state, payload) {
    state.confirmationresults = payload
    state.confirmationresults.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_CONFIRMATIONRESULT(state, payload) {
    state.confirmationresult = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDCONFIRMATIONRESULT(state, payload) {
    state.isShowAddconfirmationresult = payload
  },
  SHOW_EDITCONFIRMATIONRESULT(state, payload) {
    state.isShowEditconfirmationresult = payload
  },
  SHOW_DELETECONFIRMATIONRESULT(state, payload) {
    state.isShowDeleteconfirmationresult = payload
  },
}

export const getters = {}

export const actions = {
  async create_confirmationresult({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/confirmed-hiv-test-results/', form)
    commit('SET_CONFIRMATIONRESULT', res.data)
    dispatch('get_confirmationresults')
  },
  async get_confirmationresults({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_CONFIRMATIONRESULTS', [])
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/confirmed-hiv-test-results/?${filter}`)
    commit('SET_CONFIRMATIONRESULTS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async get_confirmationresult({commit}, id) {
    commit('SET_CONFIRMATIONRESULT', {})
    let res = await this.$axios.get(`clients/confirmed-hiv-test-results/${id}/`)
    commit('SET_CONFIRMATIONRESULT', res.data)
  },
  async edit_confirmationresult({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/confirmed-hiv-test-results/${id}/`, form)
    commit('SET_CONFIRMATIONRESULT', res.data)
  },
  async delete_confirmationresult({commit, dispatch}, id) {
    await this.$axios.delete(`clients/confirmed-hiv-test-results/${id}/`)
    commit('SHOW_DELETECONFIRMATIONRESULT', false)
    dispatch('get_confirmationresults', {page: 1})
  },
}
