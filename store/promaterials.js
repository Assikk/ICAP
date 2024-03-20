import dayjs from "dayjs";
export const state = () => ({
  promaterialss: [],
  promaterials: {},
  count: '',
  isLoading: true,
  isShowAddpromaterials: false,
  isShowEditpromaterials: false,
  isShowDeletepromaterials: false,
})

export const mutations = {
  SET_PROMATERIALSS(state, payload) {
    state.promaterialss = payload
    state.promaterialss.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_PROMATERIALS(state, payload) {
    state.promaterials = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDPROMATERIALS(state, payload) {
    state.isShowAddpromaterials = payload
  },
  SHOW_EDITPROMATERIALS(state, payload) {
    state.isShowEditpromaterials = payload
  },
  SHOW_DELETEPROMATERIALS(state, payload) {
    state.isShowDeletepromaterials = payload
  },
}

export const getters = {}

export const actions = {
  async create_promaterials({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/preventive-materials/', form)
    commit('SET_PROMATERIALS', res.data)
    dispatch('get_promaterialss')
  },
  async get_promaterialss({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_PROMATERIALS', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/preventive-materials/?${filter}`)
    commit('SET_PROMATERIALSS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_promaterials({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/preventive-materials/${id}/`, form)
    commit('SET_PROMATERIALS', res.data)
    dispatch('get_promaterialss')
  },
  async delete_promaterials({commit, dispatch}, id) {
    await this.$axios.delete(`clients/preventive-materials/${id}/`)
    commit('SHOW_DELETEPROMATERIALS', false)
    dispatch('get_promaterialss', {page: 1})
  },
}
