import dayjs from "dayjs";

export const state = () => ({
  logs: [],
  log: {},
  screening: {},
  count: '',
  isLoading: false,
  search: '',
  isShowEditColumns: false
})

export const mutations = {
  SET_LOGS(state, payload) { // Changed from 'SET_SUBREGIONS' to 'SET_LOGS'
    state.logs = payload
    state.logs.map((item) => {
      item.participation_date = dayjs(item.participation_date).format('YYYY-MM-DD HH:mm')
      item.full_name = `${item.first_name ? item?.first_name : ''} ${item.last_name ? item.last_name : ''} ${item.middle_name ? item.middle_name : ''}`
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_LOG(state, payload) { // Changed from 'SET_SUBREGION' to 'SET_LOG'
    state.log = payload
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
  SET_SCREENING(state, payload) {
    state.screening = payload
  }
}

export const getters = {}

export const actions = {
  async get_logs({ commit }, search) { // Changed from 'get_subregions' to 'get_logs'
    commit('SET_LOGS', [])
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
    let res = await this.$axios.get(`monitoring/?${filter}`)
    commit('SET_LOGS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async create_log({ commit, dispatch }, form) { // Changed from 'create_subregion' to 'create_log'
    let res = await this.$axios.post('monitoring/', form)
    commit('SET_LOG', res.data)
    dispatch('get_logs')
  },
  async get_log({ commit }, id) { // Changed from 'get_subregion' to 'get_log'
    commit('SET_LOG', {})
    let res = await this.$axios.get(`monitoring/${id}/`)
    commit('SET_LOG', res.data)
  },
  async edit_log({ commit, dispatch }, { id, form }) { // Changed from 'edit_subregion' to 'edit_log'
    let res = await this.$axios.patch(`monitoring/${id}/`, form)
    commit('SET_LOG', res.data)
    dispatch('get_logs')
  },
  async delete_log({ commit, dispatch }, id) { // Changed from 'delete_subregion' to 'delete_log'
    await this.$axios.delete(`monitoring/${id}/`)
    commit('SHOW_DELETELOG', false)
    dispatch('get_logs', { page: 1 })
  },
}
