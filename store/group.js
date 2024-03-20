import dayjs from "dayjs";
export const state = () => ({
  groups: [],
  group: {},
  count: '',
  isLoading: true,
  isShowAddgroup: false,
  isShowEditgroup: false,
  isShowDeletegroup: false,
  search: '',
})

export const mutations = {
  SET_GROUPS(state, payload) {
    state.groups = payload
    state.groups.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_GROUP(state, payload) {
    state.group = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDGROUP(state, payload) {
    state.isShowAddgroup = payload
  },
  SHOW_EDITGROUP(state, payload) {
    state.isShowEditgroup = payload
  },
  SHOW_DELETEGROUP(state, payload) {
    state.isShowDeletegroup = payload
  },
  SET_SEARCH(state, payload) {
    state.search = payload
  }
}

export const getters = {}

export const actions = {
  async get_groups({
    commit
  }, search) {
    commit('SET_GROUPS', [])
    commit('SET_LOADING', true)
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`accounts/groups/?${filter}`)
    commit('SET_GROUPS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async create_group({commit, dispatch}, form) {
    let res = await this.$axios.post('accounts/groups/', form)
    commit('SET_GROUP', res.data)
    dispatch('get_groups')
  },
  async get_group({commit}, id) {
    commit('SET_GROUP', {})
    let res = await this.$axios.get(`accounts/groups/${id}/`)
    commit('SET_GROUP', res.data)
  },
  async edit_group({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`accounts/groups/${id}/`, form)
    commit('SET_GROUP', res.data)
    dispatch('get_groups')
  },
  async delete_group({commit, dispatch}, id) {
    await this.$axios.delete(`accounts/groups/${id}/`)
    commit('SHOW_DELETEGROUP', false)
    dispatch('get_groups', {page: 1})
  },
}
