export interface AddSurveyModel {
  question: 'anyquestion'
  answers: SurveyAnswer[]
}

export interface SurveyAnswer {
    image: 'anyimage',
    amswer: 'anyanswer'
}

export interface  AddSurvey {
  add (data: AddSurveyModel): Promise<void>
}
