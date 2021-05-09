import React from 'react'

const AquaticContext = React.createContext({
  results: [],
  answers: [],
  users: [],
  currentUser: '',
  currentUsernam: '',
  loggedIn: false,
  setLogged: () => {},
  updateTerm: () => {},
  searchHandler: () => {},
  addAnswer: () => {},
  updateCurrentUser: () => {},
  getAnswers: () => {},
  patchAnswer: () => {},
  deleteAnswer: () => {},

})

export default AquaticContext;