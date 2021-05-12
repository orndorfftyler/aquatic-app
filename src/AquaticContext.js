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

  clearUserAndUsername: () => {}


})

export default AquaticContext;