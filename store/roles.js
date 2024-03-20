export const state = () => ({
  roles: [],
  role: null,
  isLoading: true,
  count: null,
  isShowAddRole: false,
  isShowEditRole: false,
  isShowDeleteRole: false
})

export const mutations = {
  SET_ROLES(state, payload) {
    state.roles = payload
  },
  SET_ROLE(state, payload) {
    state.role = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SHOW_ADDROLE(state, payload) {
    state.isShowAddRole = payload
  },
  SHOW_EDITROLE(state, payload) {
    state.isShowEditRole = payload
  },
  SHOW_DELETEROLE(state, payload) {
    state.isShowDeleteRole = payload
  }
}

export const getters = {}

export const actions = {
  async get_roles({commit}, search) {
    commit('SET_ROLES', [])
    commit('SET_COUNT', null)
    commit('SET_LOADING', true)
    let filter = ''
    for (let key in search) {
      let newKey = key
      newKey = key.replace("_", "-")
      if (search[key]) {
        filter = filter + `${newKey}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`accounts/groups/?${filter}`)
    commit('SET_ROLES', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async get_role({commit}, id) {
    commit('SET_ROLE', null)
    let res = await this.$axios.get(`accounts/groups/${id}/`)
    commit('SET_ROLE', res.data)
  },
  async add_role({commit}, form) {
    commit('SET_ROLE', null)
    let res = await this.$axios.post('accounts/groups/', form)
    commit('SET_ROLE', res.data)
  },
  async edit_role({commit}, {id, form}) {
    let res = await this.$axios.put(`accounts/groups/${id}/`, form)
    commit('SET_ROLE', res.data)
  },
  async delete_role({commit}, id) {
    await this.$axios.delete(`accounts/groups/${id}/`)
  }
}
