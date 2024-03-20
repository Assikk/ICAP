import dayjs from "dayjs";
export const state = () => ({
  questionnaires: [],
  questionnaire: {},
  count: '',
  isLoading: true,
  isShowAddquestionnaire: false,
  isShowEditquestionnaire: false,
  isShowDeletequestionnaire: false,
})

export const mutations = {
  SET_QUESTIONNAIRES(state, payload) {
    state.questionnaires = payload
    state.questionnaires.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_QUESTIONNAIRE(state, payload) {
    state.questionnaire = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDQUESTIONNAIRE(state, payload) {
    state.isShowAddquestionnaire = payload
  },
  SHOW_EDITQUESTIONNAIRE(state, payload) {
    state.isShowEditquestionnaire = payload
  },
  SHOW_DELETEQUESTIONNAIRE(state, payload) {
    state.isShowDeletequestionnaire = payload
  },
}

export const getters = {}

export const actions = {
  async create_questionnaire({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/questionnaires/', form)
    commit('SET_QUESTIONNAIRE', res.data)
    dispatch('get_questionnaires')
  },
  async get_questionnaires({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_QUESTIONNAIRE', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/questionnaires/?${filter}`)
    commit('SET_QUESTIONNAIRES', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_questionnaire({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/questionnaires/${id}/`, form)
    commit('SET_QUESTIONNAIRE', res.data)
    dispatch('get_questionnaires')
  },
  async delete_questionnaire({commit, dispatch}, id) {
    await this.$axios.delete(`clients/questionnaires/${id}/`)
    commit('SHOW_DELETEQUESTIONNAIRE', false)
    dispatch('get_questionnaires', {page: 1})
  },
}
