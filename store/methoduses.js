import dayjs from "dayjs";
export const state = () => ({
  methodusess: [],
  methoduses: {},
  count: '',
  isLoading: true,
  isShowAddmethoduses: false,
  isShowEditmethoduses: false,
  isShowDeletemethoduses: false,
})

export const mutations = {
  SET_METHODUSESS(state, payload) {
    state.methodusess = payload
    state.methodusess.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_METHODUSES(state, payload) {
    state.methoduses = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDMETHODUSES(state, payload) {
    state.isShowAddmethoduses = payload
  },
  SHOW_EDITMETHODUSES(state, payload) {
    state.isShowEditmethoduses = payload
  },
  SHOW_DELETEMETHODUSES(state, payload) {
    state.isShowDeletemethoduses = payload
  },
}

export const getters = {}

export const actions = {
  async create_methoduses({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/preferred-usage-methods/', form)
    commit('SET_METHODUSES', res.data)
    dispatch('get_methodusess')
  },
  async get_methodusess({commit}) {
    commit('SET_LOADING', true)
    commit('SET_METHODUSES', {})
    let res = await this.$axios.get('clients/preferred-usage-methods/')
    commit('SET_METHODUSESS', res.data.results)
    commit('SET_LOADING', false)
    commit('SET_COUNT', res.data.count)
  },
  async edit_methoduses({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/preferred-usage-methods/${id}/`, form)
    commit('SET_METHODUSES', res.data)
    dispatch('get_methodusess')
  },
  async delete_methoduses({commit, dispatch}, id) {
    await this.$axios.delete(`clients/preferred-usage-methods/${id}/`)
    commit('SHOW_DELETEMETHODUSES', false)
    dispatch('get_methodusess', {page: 1})
  },
}
