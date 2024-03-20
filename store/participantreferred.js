import dayjs from "dayjs";
export const state = () => ({
  participantreferreds: [],
  participantreferred: {},
  count: '',
  isLoading: true,
  isShowAddparticipantreferred: false,
  isShowEditparticipantreferred: false,
  isShowDeleteparticipantreferred: false,
})

export const mutations = {
  SET_PARTICIPANTREFERREDS(state, payload) {
    state.participantreferreds = payload
    state.participantreferreds.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_PARTICIPANTREFERRED(state, payload) {
    state.participantreferred = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDPARTICIPANTREFERRED(state, payload) {
    state.isShowAddparticipantreferred = payload
  },
  SHOW_EDITPARTICIPANTREFERRED(state, payload) {
    state.isShowEditparticipantreferred = payload
  },
  SHOW_DELETEPARTICIPANTREFERRED(state, payload) {
    state.isShowDeleteparticipantreferred = payload
  },
}

export const getters = {}

export const actions = {
  async create_participantreferred({commit, dispatch}, form) {
    let res = await this.$axios.post('accounts/participantreferreds/', form)
    commit('SET_PARTICIPANTREFERRED', res.data)
    dispatch('get_participantreferreds')
  },
  async get_participantreferreds({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_PARTICIPANTREFERRED', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`accounts/participantreferreds/?${filter}`)
    commit('SET_PARTICIPANTREFERREDS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_participantreferred({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`accounts/participantreferreds/${id}/`, form)
    commit('SET_PARTICIPANTREFERRED', res.data)
    dispatch('get_participantreferreds')
  },
  async delete_participantreferred({commit, dispatch}, id) {
    await this.$axios.delete(`accounts/participantreferreds/${id}/`)
    commit('SHOW_DELETEPARTICIPANTREFERRED', false)
    dispatch('get_participantreferreds', {page: 1})
  },
}
