import React from 'react'

const AquaticContext = React.createContext({
  results: [],
  answers: [],
  users: [],
  currentUser: '',
  currentUsername: '',
  loggedIn: false,
  term: '',

  setLogged: () => {},
  updateTerm: () => {},
  searchHandler: () => {},
  addAnswer: () => {},
  updateCurrentUser: () => {},
  getAnswers: () => {},
  patchAnswer: () => {},
  deleteAnswer: () => {},

  getQuestions: () => {},
  clearResults: () => {},
  getPersonalQuestions: () => {},
  patchQuestion: () => {},
  deleteQuestion: () => {}


})

export default AquaticContext;