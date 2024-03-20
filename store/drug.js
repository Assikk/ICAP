import dayjs from "dayjs";
export const state = () => ({
  drugs: [],
  drug: {},
  count: '',
  isLoading: true,
  isShowAdddrug: false,
  isShowEditdrug: false,
  isShowDeletedrug: false,
})

export const mutations = {
  SET_DRUGS(state, payload) {
    state.drugs = payload
    state.drugs.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_DRUG(state, payload) {
    state.drug = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDDRUG(state, payload) {
    state.isShowAdddrug = payload
  },
  SHOW_EDITDRUG(state, payload) {
    state.isShowEditdrug = payload
  },
  SHOW_DELETEDRUG(state, payload) {
    state.isShowDeletedrug = payload
  },
}

export const getters = {}

export const actions = {
  async create_drug({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/drugs-types/', form)
    commit('SET_DRUG', res.data)
    dispatch('get_drugs')
  },
  async get_drugs({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_DRUG', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/drugs-types/?${filter}`)
    commit('SET_DRUGS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_drug({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/drugs-types/${id}/`, form)
    commit('SET_DRUG', res.data)
    dispatch('get_drugs')
  },
  async delete_drug({commit, dispatch}, id) {
    await this.$axios.delete(`clients/drugs-types/${id}/`)
    commit('SHOW_DELETEDRUG', false)
    dispatch('get_drugs', {page: 1})
  },
}
