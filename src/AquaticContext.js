import React from 'react'

const AquaticContext = React.createContext({
  results: [],
  searchResults: [],
  answers: [],
  currentUser: '',
  currentUsername: '',
  loggedIn: false,
  term: '',

  setLogged: () => {},
  updateTerm: () => {},
  addAnswer: () => {},
  updateCurrentUser: () => {},
  getAnswers: () => {},
  patchAnswer: () => {},
  deleteAnswer: () => {},

  getQuestions: () => {},
  clearResults: () => {},
  getPersonalQuestions: () => {},
  patchQuestion: () => {},
  deleteQuestion: () => {},
  getOneQuestion: () => {},

  clearUserAndUsername: () => {},
  updateSearchResults: () => {},
  setResults: () => {}
})

export default AquaticContext;