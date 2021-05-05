import React from 'react'

const AquaticContext = React.createContext({
  results: [],
  answers: [],
  users: [],
  showHideNewReviewInput: '',
  currentUser: '',
  loggedIn: false,
  setLogged: () => {}
})

export default AquaticContext;