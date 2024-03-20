import dayjs from "dayjs";
export const state = () => ({
  sublangs: [],
  sublang: {},
  count: '',
  isLoading: true,
  isShowAddsublang: false,
  isShowEditsublang: false,
  isShowDeletesublang: false,
  search: ''
})

export const mutations = {
  SET_SUBLANGS(state, payload) {
    state.sublangs = payload
    state.sublangs.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_SUBLANG(state, payload) {
    state.sublang = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDSUBLANG(state, payload) {
    state.isShowAddsublang = payload
  },
  SHOW_EDITSUBLANG(state, payload) {
    state.isShowEditsublang = payload
  },
  SHOW_DELETESUBLANG(state, payload) {
    state.isShowDeletesublang = payload
  },
  SET_SEARCH(state, payload) {
    state.search = payload
  }
}

export const getters = {
}

export const actions = {
  async get_sublangs({
    commit
  }, search) {
    commit('SET_SUBLANGS', [])
    commit('SET_LOADING', true)
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`accounts/cities/?${filter}`)
    commit('SET_SUBLANGS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async create_sublang({commit, dispatch}, form) {
    let res = await this.$axios.post('accounts/cities/', form)
    commit('SET_SUBLANG', res.data)
    dispatch('get_sublangs')
  },
  async get_sublang({commit}, id) {
    commit('SET_SUBLANG', {})
    let res = await this.$axios.get(`accounts/cities/${id}/`)
    commit('SET_SUBLANG', res.data)
  },
  async edit_sublang({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`accounts/cities/${id}/`, form)
    commit('SET_SUBLANG', res.data)
    dispatch('get_sublangs')
  },
  async delete_sublang({commit, dispatch}, id) {
    await this.$axios.delete(`accounts/cities/${id}/`)
    commit('SHOW_DELETESUBLANG', false)
    dispatch('get_sublangs', {page: 1})
  },
}
