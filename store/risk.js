import dayjs from "dayjs";
export const state = () => ({
  risks: [],
  risk: {},
  count: '',
  isLoading: true,
  isShowAddrisk: false,
  isShowEditrisk: false,
  isShowDeleterisk: false,
})

export const mutations = {
  SET_RISKS(state, payload) {
    state.risks = payload
    state.risks.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_RISK(state, payload) {
    state.risk = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDRISK(state, payload) {
    state.isShowAddrisk = payload
  },
  SHOW_EDITRISK(state, payload) {
    state.isShowEditrisk = payload
  },
  SHOW_DELETERISK(state, payload) {
    state.isShowDeleterisk = payload
  },
}

export const getters = {}

export const actions = {
  async create_risk({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/risky-behaviors/', form)
    commit('SET_RISK', res.data)
    dispatch('get_risks')
  },
  async get_risks({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_RISK', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/risky-behaviors/?${filter}`)
    commit('SET_RISKS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_risk({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/risky-behaviors/${id}/`, form)
    commit('SET_RISK', res.data)
    dispatch('get_risks')
  },
  async delete_risk({commit, dispatch}, id) {
    await this.$axios.delete(`clients/risky-behaviors/${id}/`)
    commit('SHOW_DELETERISK', false)
    dispatch('get_risks', {page: 1})
  },
}
