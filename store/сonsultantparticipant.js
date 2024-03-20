import dayjs from "dayjs";
export const state = () => ({
  сonsultantparticipants: [],
  сonsultantparticipant: {},
  count: '',
  isLoading: true,
  isShowAddсonsultantparticipant: false,
  isShowEditсonsultantparticipant: false,
  isShowDeleteсonsultantparticipant: false,
})

export const mutations = {
  SET_СONSULTANTPARTICIPANTS(state, payload) {
    state.сonsultantparticipants = payload
    state.сonsultantparticipants.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_СONSULTANTPARTICIPANT(state, payload) {
    state.сonsultantparticipant = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDСONSULTANTPARTICIPANT(state, payload) {
    state.isShowAddсonsultantparticipant = payload
  },
  SHOW_EDITСONSULTANTPARTICIPANT(state, payload) {
    state.isShowEditсonsultantparticipant = payload
  },
  SHOW_DELETEСONSULTANTPARTICIPANT(state, payload) {
    state.isShowDeleteсonsultantparticipant = payload
  },
}

export const getters = {}

export const actions = {
  async create_сonsultantparticipant({commit, dispatch}, form) {
    let res = await this.$axios.post('accounts/сonsultantparticipants/', form)
    commit('SET_СONSULTANTPARTICIPANT', res.data)
    dispatch('get_сonsultantparticipants')
  },
  async get_сonsultantparticipants({commit}) {
    commit('SET_LOADING', true)
    commit('SET_СONSULTANTPARTICIPANT', {})
    let res = await this.$axios.get('accounts/сonsultantparticipants/')
    commit('SET_СONSULTANTPARTICIPANTS', res.data.results)
    commit('SET_LOADING', false)
    commit('SET_COUNT', res.data.count)
  },
  async edit_сonsultantparticipant({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`accounts/сonsultantparticipants/${id}/`, form)
    commit('SET_СONSULTANTPARTICIPANT', res.data)
    dispatch('get_сonsultantparticipants')
  },
  async delete_сonsultantparticipant({commit, dispatch}, id) {
    await this.$axios.delete(`accounts/сonsultantparticipants/${id}/`)
    commit('SHOW_DELETEСONSULTANTPARTICIPANT', false)
    dispatch('get_сonsultantparticipants', {page: 1})
  },
}
