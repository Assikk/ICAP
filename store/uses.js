import dayjs from "dayjs";
export const state = () => ({
  usess: [],
  uses: {},
  count: '',
  isLoading: true,
  isShowAdduses: false,
  isShowEdituses: false,
  isShowDeleteuses: false,
})

export const mutations = {
  SET_USESS(state, payload) {
    state.usess = payload
    state.usess.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_USES(state, payload) {
    state.uses = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDUSES(state, payload) {
    state.isShowAdduses = payload
  },
  SHOW_EDITUSES(state, payload) {
    state.isShowEdituses = payload
  },
  SHOW_DELETEUSES(state, payload) {
    state.isShowDeleteuses = payload
  },
}

export const getters = {}

export const actions = {
  async create_uses({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/preferred-usage-methods/', form)
    commit('SET_USES', res.data)
    dispatch('get_usess')
  },
  async get_usess({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_USES', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/preferred-usage-methods/?${filter}`)
    commit('SET_USESS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_uses({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/preferred-usage-methods/${id}/`, form)
    commit('SET_USES', res.data)
    dispatch('get_usess')
  },
  async delete_uses({commit, dispatch}, id) {
    await this.$axios.delete(`clients/preferred-usage-methods/${id}/`)
    commit('SHOW_DELETEUSES', false)
    dispatch('get_usess', {page: 1})
  },
}
