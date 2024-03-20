import dayjs from "dayjs";
export const state = () => ({
  reasonstakings: [],
  reasonstaking: {},
  count: '',
  isLoading: true,
  isShowAddreasonstaking: false,
  isShowEditreasonstaking: false,
  isShowDeletereasonstaking: false,
})

export const mutations = {
  SET_REASONSTAKINGS(state, payload) {
    state.reasonstakings = payload
    state.reasonstakings.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_REASONSTAKING(state, payload) {
    state.reasonstaking = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDREASONSTAKING(state, payload) {
    state.isShowAddreasonstaking = payload
  },
  SHOW_EDITREASONSTAKING(state, payload) {
    state.isShowEditreasonstaking = payload
  },
  SHOW_DELETEREASONSTAKING(state, payload) {
    state.isShowDeletereasonstaking = payload
  },
}

export const getters = {}

export const actions = {
  async create_reasonstaking({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/art-absence-reasons/', form)
    commit('SET_REASONSTAKING', res.data)
    dispatch('get_reasonstakings')
  },
  async get_reasonstakings({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_REASONSTAKING', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/art-absence-reasons/?${filter}`)
    commit('SET_REASONSTAKINGS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_reasonstaking({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/art-absence-reasons/${id}/`, form)
    commit('SET_REASONSTAKING', res.data)
    dispatch('get_reasonstakings')
  },
  async delete_reasonstaking({commit, dispatch}, id) {
    await this.$axios.delete(`clients/art-absence-reasons/${id}/`)
    commit('SHOW_DELETEREASONSTAKING', false)
    dispatch('get_reasonstakings', {page: 1})
  },
}
