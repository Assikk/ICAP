import dayjs from "dayjs";
export const state = () => ({
  resonsrejects: [],
  resonsreject: {},
  count: '',
  isLoading: true,
  isShowAddresonsreject: false,
  isShowEditresonsreject: false,
  isShowDeleteresonsreject: false,
})

export const mutations = {
  SET_RESONSREJECTS(state, payload) {
    state.resonsrejects = payload
    state.resonsrejects.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_RESONSREJECT(state, payload) {
    state.resonsreject = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDRESONSREJECT(state, payload) {
    state.isShowAddresonsreject = payload
  },
  SHOW_EDITRESONSREJECT(state, payload) {
    state.isShowEditresonsreject = payload
  },
  SHOW_DELETERESONSREJECT(state, payload) {
    state.isShowDeleteresonsreject = payload
  },
}

export const getters = {}

export const actions = {
  async create_resonsreject({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/rejection-reasons/', form)
    commit('SET_RESONSREJECT', res.data)
    dispatch('get_resonsrejects')
  },
  async get_resonsrejects({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_RESONSREJECT', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/rejection-reasons/?${filter}`)
    commit('SET_RESONSREJECTS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_resonsreject({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/rejection-reasons/${id}/`, form)
    commit('SET_RESONSREJECT', res.data)
    dispatch('get_resonsrejects')
  },
  async delete_resonsreject({commit, dispatch}, id) {
    await this.$axios.delete(`clients/rejection-reasons/${id}/`)
    commit('SHOW_DELETERESONSREJECT', false)
    dispatch('get_resonsrejects', {page: 1})
  },
}
