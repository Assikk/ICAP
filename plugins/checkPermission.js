export default ({ store }, inject) => {
  const checkPermission = (id) => {
    if(store.state.auth.user.groups.permissions.includes(id)) {
      return true
    } else return false
  }
  inject('checkPermission', checkPermission)
}
