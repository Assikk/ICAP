import dayjs from "dayjs";
export const state = () => ({
  subregions: [],
  subregion: {},
  count: '',
  isLoading: true,
  isShowAddsubregion: false,
  isShowEditsubregion: false,
  isShowDeletesubregion: false,
  search: '',
})

export const mutations = {
  SET_SUBREGIONS(state, payload) {
    state.subregions = payload
    state.subregions.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_SUBREGION(state, payload) {
    state.subregion = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDSUBREGION(state, payload) {
    state.isShowAddsubregion = payload
  },
  SHOW_EDITSUBREGION(state, payload) {
    state.isShowEditsubregion = payload
  },
  SHOW_DELETESUBREGION(state, payload) {
    state.isShowDeletesubregion = payload
  },
  SET_SEARCH(state, payload) {
    state.search = payload
  }
}

export const getters = {}

export const actions = {
  async get_subregions({
    commit
  }, search) {
    commit('SET_SUBREGIONS', [])
    commit('SET_LOADING', true)
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`accounts/regions/?${filter}`)
    commit('SET_SUBREGIONS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async create_subregion({commit, dispatch}, form) {
    let res = await this.$axios.post('accounts/regions/', form)
    commit('SET_SUBREGION', res.data)
    dispatch('get_subregions')
  },
  async get_subregion({commit}, id) {
    commit('SET_SUBREGION', {})
    let res = await this.$axios.get(`accounts/regions/${id}/`)
    commit('SET_SUBREGION', res.data)
  },
  async edit_subregion({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`accounts/regions/${id}/`, form)
    commit('SET_SUBREGION', res.data)
    dispatch('get_subregions')
  },
  async delete_subregion({commit, dispatch}, id) {
    await this.$axios.delete(`accounts/regions/${id}/`)
    commit('SHOW_DELETESUBREGION', false)
    dispatch('get_subregions', {page: 1})
  },
}
