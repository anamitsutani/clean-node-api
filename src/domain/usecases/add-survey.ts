export interface AddSurveyModel {
  question: 'anyquestion'
  answers: SurveyAnswer[]
}

export interface SurveyAnswer {
    image: 'anyimage',
    answer: 'anyanswer'
}

export interface  AddSurvey {
  add (data: AddSurveyModel): Promise<void>
}
