import dayjs from "dayjs";
export const state = () => ({
  countries: [],
  country: {},
  count: '',
  isLoading: true,
  isShowAddcountry: false,
  isShowEditcountry: false,
  isShowDeletecountry: false,
  search: '',
})

export const mutations = {
  SET_COUNTRIES(state, payload) {
    state.countries = payload
    state.countries.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_COUNTRY(state, payload) {
    state.country = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDCOUNTRY(state, payload) {
    state.isShowAddcountry = payload
  },
  SHOW_EDITCOUNTRY(state, payload) {
    state.isShowEditcountry = payload
  },
  SHOW_DELETECOUNTRY(state, payload) {
    state.isShowDeletecountry = payload
  },
  SET_SEARCH(state, payload) {
    state.search = payload
  }
}

export const getters = {}

export const actions = {
  async get_countries({
    commit
  }, search) {
    commit('SET_COUNTRIES', [])
    commit('SET_LOADING', true)
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`accounts/countries/?${filter}`)
    commit('SET_COUNTRIES', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async create_country({commit, dispatch}, form) {
    let res = await this.$axios.post('accounts/countries/', form)
    commit('SET_COUNTRY', res.data)
    dispatch('get_countries')
  },
  async get_country({commit}, id) {
    commit('SET_COUNTRY', {})
    let res = await this.$axios.get(`accounts/countries/${id}/`)
    commit('SET_COUNTRY', res.data)
  },
  async edit_country({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`accounts/countries/${id}/`, form)
    commit('SET_COUNTRY', res.data)
    dispatch('get_countries')
  },
  async delete_country({commit, dispatch}, id) {
    await this.$axios.delete(`accounts/countries/${id}/`)
    commit('SHOW_DELETECOUNTRY', false)
    dispatch('get_countries', {page: 1})
  },
}
