import dayjs from "dayjs";
export const state = () => ({
  genders: [],
  gender: {},
  count: '',
  isLoading: true,
  isShowAddgender: false,
  isShowEditgender: false,
  isShowDeletegender: false,
})

export const mutations = {
  SET_GENDERS(state, payload) {
    state.genders = payload
    state.genders.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_GENDER(state, payload) {
    state.gender = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDGENDER(state, payload) {
    state.isShowAddgender = payload
  },
  SHOW_EDITGENDER(state, payload) {
    state.isShowEditgender = payload
  },
  SHOW_DELETEGENDER(state, payload) {
    state.isShowDeletegender = payload
  },
}

export const getters = {}

export const actions = {
  async create_gender({commit, dispatch}, form) {
    let res = await this.$axios.post('accounts/genders/', form)
    commit('SET_GENDER', res.data)
    dispatch('get_genders')
  },
  async get_genders({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_GENDER', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`accounts/genders/?${filter}`)
    commit('SET_GENDERS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_gender({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`accounts/genders/${id}/`, form)
    commit('SET_GENDER', res.data)
    dispatch('get_genders')
  },
  async delete_gender({commit, dispatch}, id) {
    await this.$axios.delete(`accounts/genders/${id}/`)
    commit('SHOW_DELETEGENDER', false)
    dispatch('get_genders', {page: 1})
  },
}
