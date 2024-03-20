import dayjs from "dayjs";
export const state = () => ({
  attendanceperiodss: [],
  attendanceperiods: {},
  count: '',
  isLoading: true,
  isShowAddattendanceperiods: false,
  isShowEditattendanceperiods: false,
  isShowDeleteattendanceperiods: false,
})

export const mutations = {
  SET_ATTENDANCEPERIODSS(state, payload) {
    state.attendanceperiodss = payload
    state.attendanceperiodss.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm')
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm')
    })
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_ATTENDANCEPERIODS(state, payload) {
    state.attendanceperiods = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SHOW_ADDATTENDANCEPERIODS(state, payload) {
    state.isShowAddattendanceperiods = payload
  },
  SHOW_EDITATTENDANCEPERIODS(state, payload) {
    state.isShowEditattendanceperiods = payload
  },
  SHOW_DELETEATTENDANCEPERIODS(state, payload) {
    state.isShowDeleteattendanceperiods = payload
  },
}

export const getters = {}

export const actions = {
  async create_attendanceperiods({commit, dispatch}, form) {
    let res = await this.$axios.post('clients/ost-attendance-periods/', form)
    commit('SET_ATTENDANCEPERIODS', res.data)
    dispatch('get_attendanceperiodss')
  },
  async get_attendanceperiodss({ commit }, search) {
    commit('SET_LOADING', true)
    commit('SET_ATTENDANCEPERIODS', {})
    let filter = ''
    for (let key in search) {
      if (search[key]) {
        filter = filter + `${key}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/ost-attendance-periods/?${filter}`)
    commit('SET_ATTENDANCEPERIODSS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },

  async edit_attendanceperiods({commit, dispatch}, {id, form}) {
    let res = await this.$axios.put(`clients/ost-attendance-periods/${id}/`, form)
    commit('SET_ATTENDANCEPERIODS', res.data)
    dispatch('get_attendanceperiodss')
  },
  async delete_attendanceperiods({commit, dispatch}, id) {
    await this.$axios.delete(`clients/ost-attendance-periods/${id}/`)
    commit('SHOW_DELETEATTENDANCEPERIODS', false)
    dispatch('get_attendanceperiodss', {page: 1})
  },
}
