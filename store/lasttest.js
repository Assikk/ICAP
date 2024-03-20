import dayjs from "dayjs";
export const state = () => ({
  lasttests: [],
  lasttest: {},
  count: '',
  isLoading: true,
  isShowAddlasttest: false,
  isShowEditlasttest: false,
  isShowDeletelasttest: false,
})

export const mutations = {
  SET_LASTTESTS(state, payload) {
    state.lasttests = payload
    state.lasttests.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_LASTTEST(state, payload) {
    state.lasttest = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDLASTTEST(state, payload) {
    state.isShowAddlasttest = payload
  },
  SHOW_EDITLASTTEST(state, payload) {
    state.isShowEditlasttest = payload
  },
  SHOW_DELETELASTTEST(state, payload) {
    state.isShowDeletelasttest = payload
  },
}

export const getters = {}

export const actions = {
  async create_lasttest({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/hiv-test-periods/', form)
    commit('SET_LASTTEST', res.data)
    dispatch('get_lasttests')
  },
  async get_lasttests({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_LASTTEST', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/hiv-test-periods/?${filter}`)
    commit('SET_LASTTESTS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_lasttest({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/hiv-test-periods/${id}/`, form)
    commit('SET_LASTTEST', res.data)
    dispatch('get_lasttests')
  },
  async delete_lasttest({commit, dispatch}, id) {
    await this.$axios.delete(`clients/hiv-test-periods/${id}/`)
    commit('SHOW_DELETELASTTEST', false)
    dispatch('get_lasttests', {page: 1})
  },
}
