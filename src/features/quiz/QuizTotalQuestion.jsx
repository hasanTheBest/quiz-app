import React from 'react'
import { useSelector } from 'react-redux';
import { nextQuiz, selectAllQuizIds, selectAnswerSheet, selectCurrent } from './quizSlice';

export const QuizTotalQuestion = () => {
  
  const quizIds = useSelector(selectAllQuizIds)
  const current = useSelector(selectCurrent)
  const answerSheet = useSelector(selectAnswerSheet)

  const totalQuestions = quizIds.map((q, i) => {

    let questionClasses = `link question`;

    if (current === i) {
      questionClasses = "link question active";
    }

    // if (
    //   current === i &&
    //   Object.keys(answerSheet).indexOf(String(current)) !== -1
    // ) {
    //   questionClasses = "link question answered";
    // }

    const answeredQuestions = answerSheet && Object.keys(answerSheet);

    console.log(answeredQuestions)
    
    answerSheet && Object.keys(answerSheet).forEach((qn) => {
      if (String(qn) === q) {
        questionClasses = "link question answered";
      }
    });

    return (
      <button
        key={"qOption" + q}
        className={questionClasses}
        onClick={() => nextQuiz(i)}
      >
        {i + 1}
      </button>
    );
  });

  return (
    <div className="question-number">{totalQuestions}</div>
  )
}

