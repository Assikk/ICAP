import dayjs from "dayjs";

export const state = () => ({
  invitations: [],
  invitation: {},
  count: '',
  isLoading: true,
  isShowAddInvitation: false,
  isShowEditInvitation: false,
  isShowDeleteInvitation: false,
})

export const mutations = {
  SET_INVITATIONS(state, payload) {
    state.invitations = payload;
    state.invitations.map((item) => {
      item.activated = dayjs(item.activated).format('YYYY-MM-DD HH:mm');
      item.terminated = dayjs(item.terminated).format('YYYY-MM-DD HH:mm');
    });
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  },
  SET_INVITATION(state, payload) {
    state.invitation = payload;
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SHOW_ADDINVITATION(state, payload) {
    state.isShowAddInvitation = payload;
  },
  SHOW_EDITINVITATION(state, payload) {
    state.isShowEditInvitation = payload;
  },
  SHOW_DELETEINVITATION(state, payload) {
    state.isShowDeleteInvitation = payload;
  },
}

export const getters = {}

export const actions = {
  async getInvitations({ commit }, search) {
    commit('SET_INVITATIONS', []);
    commit('SET_LOADING', true);
    let filter = '';
    for (let key in search) {
      let newKey = key
      if(key == 'seed-name' || 'schild-name' || 'participation_date' || key == 'date_from' || key == 'date_to') {
        newKey = key.replace("_", "-")
      }
      if (search[key]) {
        filter = filter + `${newKey}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`clients/client-coupons/?${filter}`);
    commit('SET_INVITATIONS', res.data.results);
    commit('SET_COUNT', res.data.count);
    commit('SET_LOADING', false);
  },
  async createInvitation({ commit, dispatch }, form) {
    let res = await this.$axios.post('clients/client-coupons/', form);
    commit('SET_INVITATION', res.data);
    dispatch('getInvitations');
  },
  async getInvitation({ commit }, id) {
    commit('SET_INVITATION', {});
    let res = await this.$axios.get(`clients/client-coupons/${id}/`);
    commit('SET_INVITATION', res.data);
  },
  async editInvitation({ commit, dispatch }, { id, form }) {
    let res = await this.$axios.put(`clients/client-coupons/${id}/`, form);
    commit('SET_INVITATION', res.data);
    dispatch('getInvitations');
  },
  async deleteInvitation({}, id) {
    await this.$axios.delete(`clients/client-coupons/${id}/`);
  },
}
