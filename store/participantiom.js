import dayjs from "dayjs";
export const state = () => ({
  participantioms: [],
  participantiom: {},
  count: '',
  isLoading: true,
  isShowAddparticipantiom: false,
  isShowEditparticipantiom: false,
  isShowDeleteparticipantiom: false,
})

export const mutations = {
  SET_PARTICIPANTIOMS(state, payload) {
    state.participantioms = payload
    state.participantioms.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_PARTICIPANTIOM(state, payload) {
    state.participantiom = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDPARTICIPANTIOM(state, payload) {
    state.isShowAddparticipantiom = payload
  },
  SHOW_EDITPARTICIPANTIOM(state, payload) {
    state.isShowEditparticipantiom = payload
  },
  SHOW_DELETEPARTICIPANTIOM(state, payload) {
    state.isShowDeleteparticipantiom = payload
  },
}

export const getters = {}

export const actions = {
  async create_participantiom({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/iom-materials/', form)
    commit('SET_PARTICIPANTIOM', res.data)
    dispatch('get_participantioms')
  },
  async get_participantioms({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_PARTICIPANTIOM', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/iom-materials/?${filter}`)
    commit('SET_PARTICIPANTIOMS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_participantiom({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/iom-materials/${id}/`, form)
    commit('SET_PARTICIPANTIOM', res.data)
    dispatch('get_participantioms')
  },
  async delete_participantiom({commit, dispatch}, id) {
    await this.$axios.delete(`clients/iom-materials/${id}/`)
    commit('SHOW_DELETEPARTICIPANTIOM', false)
    dispatch('get_participantioms', {page: 1})
  },
}
