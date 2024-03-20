import dayjs from "dayjs";
export const state = () => ({
  clients: [],
  client: {},
  screening: {},
  hiv: {},
  prevention: {},
  count: '',
  isLoading: false,
  search: '',
  isShowEditColumns: false,
  isShowDeleteClient: false,
  isShowPrintCoupons: false
})

export const mutations = {
  SET_CLIENTS(state, payload) { // Changed from 'SET_SUBREGIONS' to 'SET_CLIENTS'
    state.clients = payload
    state.clients.map((item) => {
      item.participation_date = dayjs(item.participation_date).format('YYYY-MM-DD HH:mm')
      item.full_name = `${item.first_name ? item?.first_name : ''} ${item.last_name ? item.last_name : ''} ${item.middle_name ? item.middle_name : ''}`
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_CLIENT(state, payload) { // Changed from 'SET_SUBREGION' to 'SET_CLIENT'
    state.client = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SET_SEARCH(state, payload) {
    state.search = payload
  },
  SHOW_EDITCOLUMNS(state, payload) {
    state.isShowEditColumns = payload
  },
  SHOW_DELETECLIENT(state, payload) {
    state.isShowDeleteClient = payload
  },
  SET_SCREENING(state, payload) {
    state.screening = payload
  },
  SET_HIV(state, payload) {
    state.hiv = payload
  },
  SET_PREVENTION(state, payload) {
    state.prevention = payload
  },
  SHOW_PRINTCOUPONS(state, payload) {
    state.isShowPrintCoupons = payload
  }
}

export const getters = {}

export const actions = {
  async get_clients({ commit }, search) { // Changed from 'get_subregions' to 'get_clients'
    commit('SET_CLIENTS', [])
    commit('SET_LOADING', true)
    let filter = ''
    for (let key in search) {
      let newKey = key
      if(key == 'participation_date' || key == 'date_from' || key == 'date_to') {
        newKey = key.replace("_", "-")
      }
      if (search[key]) {
        filter = filter + `${newKey}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/clients/?${filter}`)
    commit('SET_CLIENTS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async create_client({ commit, dispatch }, form) { // Changed from 'create_subregion' to 'create_client'
    let res = await this.$axios.post('clients/clients/', form)
    commit('SET_CLIENT', res.data)
    dispatch('get_clients')
  },
  async get_client({ commit }, id) { // Changed from 'get_subregion' to 'get_client'
    commit('SET_CLIENT', {})
    let res = await this.$axios.get(`clients/clients/${id}/`)
    commit('SET_CLIENT', res.data)
  },
  async edit_client({ commit, dispatch }, { id, form }) { // Changed from 'edit_subregion' to 'edit_client'
    let res = await this.$axios.patch(`clients/clients/${id}/`, form)
    commit('SET_CLIENT', res.data)
    dispatch('get_clients')
  },
  async delete_client({ commit }, id) { // Changed from 'delete_subregion' to 'delete_client'
    await this.$axios.delete(`clients/clients/${id}/`)
    commit('SHOW_DELETECLIENT', false)
  },
  async create_screening({commit}, form) {
    let res = await this.$axios.post('clients/client-screening/', form)
    commit('SET_SCREENING', res.data)
  },
  async get_screening({commit}, id) {
    let res = await this.$axios.get(`clients/client-screening/${id}/`)
    commit('SET_SCREENING', res.data)
  },
  async edit_screening({commit}, {id, form}) {
    let res = await this.$axios.patch(`clients/client-screening/${id}/`, form)
    commit('SET_SCREENING', res.data)
  },
  async get_hiv({commit}, id) {
    let res = await this.$axios.get(`clients/client-hiv/${id}/`)
    commit('SET_HIV', res.data)
  },
  async create_hiv({commit}, form) {
    let res = await this.$axios.post('clients/client-hiv/', form)
    commit('SET_HIV', res.data)
  },
  async edit_hiv({commit}, {id, form}) {
    let res = await this.$axios.patch(`clients/client-hiv/${id}/`, form)
    commit('SET_HIV', res.data)
  },
  async get_prevention({commit}, id) {
    let res = await this.$axios.get(`clients/client-prevention/${id}`)
    commit('SET_PREVENTION', res.data)
  },
  async create_prevention({commit}, form) {
    let res = await this.$axios.post('clients/client-prevention/', form)
    commit('SET_PREVENTION', res.data)
  },
  async edit_prevention({commit}, {id, form}) {
    let res = await this.$axios.patch(`clients/client-prevention/${id}/`, form)
    commit('SET_PREVENTION', res.data)
  }
}
