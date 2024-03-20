import dayjs from "dayjs";
export const state = () => ({
  testresults: [],
  testresult: {},
  count: '',
  isLoading: true,
  isShowAddtestresult: false,
  isShowEdittestresult: false,
  isShowDeletetestresult: false,
})

export const mutations = {
  SET_TESTRESULTS(state, payload) {
    state.testresults = payload
    state.testresults.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_TESTRESULT(state, payload) {
    state.testresult = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDTESTRESULT(state, payload) {
    state.isShowAddtestresult = payload
  },
  SHOW_EDITTESTRESULT(state, payload) {
    state.isShowEdittestresult = payload
  },
  SHOW_DELETETESTRESULT(state, payload) {
    state.isShowDeletetestresult = payload
  },
}

export const getters = {}

export const actions = {
  async create_testresult({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/hiv-test-results/', form)
    commit('SET_TESTRESULT', res.data)
    dispatch('get_testresults')
  },
  async get_testresults({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_TESTRESULT', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/hiv-test-results/?${filter}`)
    commit('SET_TESTRESULTS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_testresult({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/hiv-test-results/${id}/`, form)
    commit('SET_TESTRESULT', res.data)
    dispatch('get_testresults')
  },
  async delete_testresult({commit, dispatch}, id) {
    await this.$axios.delete(`clients/hiv-test-results/${id}/`)
    commit('SHOW_DELETETESTRESULT', false)
    dispatch('get_testresults', {page: 1})
  },
}
