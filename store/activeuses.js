import dayjs from "dayjs";
export const state = () => ({
  activeusess: [],
  activeuses: {},
  count: '',
  isLoading: true,
  isShowAddactiveuses: false,
  isShowEditactiveuses: false,
  isShowDeleteactiveuses: false,
})

export const mutations = {
  SET_ACTIVEUSESS(state, payload) {
    state.activeusess = payload
    state.activeusess.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_ACTIVEUSES(state, payload) {
    state.activeuses = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDACTIVEUSES(state, payload) {
    state.isShowAddactiveuses = payload
  },
  SHOW_EDITACTIVEUSES(state, payload) {
    state.isShowEditactiveuses = payload
  },
  SHOW_DELETEACTIVEUSES(state, payload) {
    state.isShowDeleteactiveuses = payload
  },
}

export const getters = {}

export const actions = {
  async create_activeuses({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/active-drugs-usage-periods/', form)
    commit('SET_ACTIVEUSES', res.data)
    dispatch('get_activeusess')
  },
  async get_activeusess({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_ACTIVEUSES', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/active-drugs-usage-periods/?${filter}`)
    commit('SET_ACTIVEUSESS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_activeuses({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/active-drugs-usage-periods/${id}/`, form)
    commit('SET_ACTIVEUSES', res.data)
    dispatch('get_activeusess')
  },
  async delete_activeuses({commit, dispatch}, id) {
    await this.$axios.delete(`clients/active-drugs-usage-periods/${id}/`)
    commit('SHOW_DELETEACTIVEUSES', false)
    dispatch('get_activeusess', {page: 1})
  },
}
