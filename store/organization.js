export const state = () => ({
  organizations: [],
  organization: {},
  count: '',
  isLoading: true,
  isShowAddOrganization: false,
  isShowEditOrganization: false,
  isShowDeleteOrganization: false,
})

export const mutations = {
  SET_ORGANIZATIONS(state, payload) {
    state.organizations = payload;
    state.organizations.map((item) => {
      item.name = item.organization_name.name
    });
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  },
  SET_ORGANIZATION(state, payload) {
    state.organization = payload;
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SHOW_ADDORGANIZATION(state, payload) {
    state.isShowAddOrganization = payload;
  },
  SHOW_EDITORGANIZATION(state, payload) {
    state.isShowEditOrganization = payload;
  },
  SHOW_DELETEORGANIZATION(state, payload) {
    state.isShowDeleteOrganization = payload;
  },
}

export const getters = {}

export const actions = {
  async getOrganizations({ commit }, search) {
    commit('SET_ORGANIZATIONS', []);
    commit('SET_LOADING', true);
    let filter = '';
    for (let key in search) {
      let newKey = key
      if(key == 'full_name' || key == 'date_from' || key == 'date_to' || key == 'short_name' || key == 'contact_phone' || key == 'contact_name' || key == 'contact_designation') {
        newKey = key.replace("_", "-")
      }
      if (search[key]) {
        filter = filter + `${newKey}=${search[key]}&`
      }
    }
    let res = await this.$axios.get(`accounts/organizations/?${filter}`);
    commit('SET_ORGANIZATIONS', res.data.results);
    commit('SET_COUNT', res.data.count);
    commit('SET_LOADING', false);
  },
  async createOrganization({ commit, dispatch }, form) {
    let res = await this.$axios.post('accounts/organizations/', form);
    commit('SET_ORGANIZATION', res.data);
    dispatch('getOrganizations');
  },
  async getOrganization({ commit }, id) {
    commit('SET_ORGANIZATION', {});
    let res = await this.$axios.get(`accounts/organizations/${id}/`);
    commit('SET_ORGANIZATION', res.data);
  },
  async editOrganization({ commit }, { id, form }) {
    let res = await this.$axios.put(`accounts/organizations/${id}/`, form);
    commit('SET_ORGANIZATION', res.data);
  },
  async deleteOrganization({}, id) {
    await this.$axios.delete(`accounts/organizations/${id}/`);
  },
}
