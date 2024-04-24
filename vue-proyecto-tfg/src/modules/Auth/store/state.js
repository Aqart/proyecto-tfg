export default () => ({
  idToken: localStorage.getItem('idToken') || null,
  email: null,
  roles: null,
  someThingRequired: 'NOT'
})
