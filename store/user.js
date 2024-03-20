import dayjs from "dayjs";

export const state = () => ({
  users: [],
  user: {},
  count: '',
  isLoading: true,
  isShowAddUser: false,
  isShowEditUser: false,
  search: ''
})

export const mutations = {
  SET_USERS(state, payload) {
    state.users = payload;
    state.users.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm');
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm');
    });
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SHOW_ADDUSER(state, payload) {
    state.isShowAddUser = payload;
  },
  SHOW_EDITUSER(state, payload) {
    state.isShowEditUser = payload;
  },
  SET_SEARCH(state, payload) {
    state.search = payload;
  }
}

export const getters = {}

export const actions = {
  async getUsers({ commit }, search) {
    commit('SET_USERS', []);
    commit('SET_LOADING', true);
    let filter = '';
    for (let key in search) {
      let newKey = key
      if(key == 'is_active' || key == 'date_from' || key == 'date_to') {
        newKey = key.replace("_", "-")
      }
      if (search[key]) {
        filter = filter + `${newKey}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`accounts/users/?${filter}`);
    commit('SET_USERS', res.data.results);
    commit('SET_COUNT', res.data.count);
    commit('SET_LOADING', false);
  },
  async createUser({ commit, dispatch }, form) {
    let res = await this.$axios.post('accounts/users/', form);
    commit('SET_USER', res.data);
    dispatch('getUsers');
  },
  async getUser({ commit }, id) {
    commit('SET_USER', {});
    let res = await this.$axios.get(`accounts/users/${id}/`);
    commit('SET_USER', res.data);
  },
  async editUser({ commit, dispatch }, { id, form }) {
    let res = await this.$axios.put(`accounts/users/${id}/`, form);
    commit('SET_USER', res.data);
  },
  async deleteUser({ commit, dispatch }, id) {
    await this.$axios.delete(`accounts/users/${id}/`);
    commit('SHOW_DELETEUSER', false);
    dispatch('getUsers', { page: 1 });
  },
}
