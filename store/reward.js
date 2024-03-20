export const state = () => ({
  rewards: [],
  count: null,
  isLoading: true,
  reward: {},
  isShowAddReward: false,
  isShowEditReward: false,
  isShowDeleteModal: false
})

export const mutations = {
  SET_REWARDS(state, payload) {
    state.rewards = payload
  },
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload
  },
  SET_REWARD(state, payload) {
    state.reward = payload
  },
  SHOW_ADDREWARD(state, payload) {
    state.isShowAddReward = payload
  },
  SHOW_EDITREWARD(state, payload) {
    state.isShowEditReward = payload
  },
  SHOW_DELETEREWARD(state, payload) {
    state.isShowDeleteModal = payload
  }
}

export const getters = {}

export const actions = {
  async get_rewards({commit}, search) {
    commit('SET_REWARDS', [])
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
    let res = await this.$axios.get(`clients/client-rewards/?${filter}`)
    commit('SET_REWARDS', res.data.results)
    commit('SET_COUNT', res.data.count)
    commit('SET_LOADING', false)
  },
  async create_reward({commit}, form) {
    let res = await this.$axios.post('clients/client-rewards/', form)
    commit('SET_REWARD', res.data)
  },
  async generate_reward({commit}, form) {
    let res = await this.$axios.post('clients/generate-rewards/', form)
    commit('SET_REWARD', res.data)
  },
  async edit_reward({commit}, {id, form}) {
    let res = await this.$axios.patch(`clients/client-rewards/${id}/`, form)
    commit('SET_REWARD', res.data)
  },
  async get_reward_by_client({commit}, clientID) {
    let res = await this.$axios.get(`clients/client-rewards/?client=${clientID}&issuance-reason=1`)
    commit('SET_REWARD', res.data.results.length > 0 ? res.data.results[0] : {})
  },
  async get_reward({commit}, id) {
    commit('SET_REWARD', {})
    let res = await this.$axios.get(`clients/client-rewards/${id}/`)
    commit('SET_REWARD', res.data)
  },
  async delete_reward({commit}, id) {
    await this.$axios.delete(`clients/client-rewards/${id}/`)
    commit('SET_REWARD', {})
  }
}
