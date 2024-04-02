export default () => ({
  status: 'Authenticated',
  idToken: localStorage.getItem('idToken') || null,
  email: null
})
