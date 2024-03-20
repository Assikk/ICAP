import dayjs from "dayjs";
export const state = () => ({
  communications: [],
  communication: {},
  count: '',
  isLoading: true,
  isShowAddcommunication: false,
  isShowEditcommunication: false,
  isShowDeletecommunication: false,
})

export const mutations = {
  SET_COMMUNICATIONS(state, payload) {
    state.communications = payload
    state.communications.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_COMMUNICATION(state, payload) {
    state.communication = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDCOMMUNICATION(state, payload) {
    state.isShowAddcommunication = payload
  },
  SHOW_EDITCOMMUNICATION(state, payload) {
    state.isShowEditcommunication = payload
  },
  SHOW_DELETECOMMUNICATION(state, payload) {
    state.isShowDeletecommunication = payload
  },
}

export const getters = {}

export const actions = {
  async create_communication({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/communication-methods/', form)
    commit('SET_COMMUNICATION', res.data)
    dispatch('get_communications', {page: 1})
  },
  async get_communications({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_COMMUNICATIONS', [])
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/communication-methods/?${filter}`)
    commit('SET_COMMUNICATIONS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async get_communication({commit}, id) {
    commit('SET_COMMUNICATION', {})
    let res = await this.$axios.get(`clients/communication-methods/${id}/`)
    commit('SET_COMMUNICATION', res.data)
  },
  async edit_communication({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/communication-methods/${id}/`, form)
    commit('SET_COMMUNICATION', res.data)
  },
  async delete_communication({commit, dispatch}, id) {
    await this.$axios.delete(`clients/communication-methods/${id}/`)
    commit('SHOW_DELETECOMMUNICATION', false)
    dispatch('get_communications', {page: 1})
  },
}
