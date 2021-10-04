import React from 'react'
import className from "classnames"
import { useSelector, useDispatch } from 'react-redux';
import { specificQuiz, selectAllQuizIds, selectAnswerSheet, selectCurrent } from './quizSlice';

export const QuizTotalQuestion = () => {
  
  const quizIds = useSelector(selectAllQuizIds)
  const current = useSelector(selectCurrent)
  const answerSheet = useSelector(selectAnswerSheet)
  const dispatch = useDispatch();

  const totalQuestions = quizIds.map((q, i) => {

    let optionClases = className("link question", {
      "active": current === i,
      "answered": answerSheet.hasOwnProperty(quizIds[current]) &&  current === i,
    })

    // answerSheet && Object.keys(answerSheet).forEach(id => {
    //   if(String(id) === String(quizIds[current])){
    //     optionClases = "link question answered"
    //   }
    // })
    
    // console.log("answered question = " + i, Object.keys(answerSheet).indexOf(String(quizIds[current])), quizIds[current], Object.keys(answerSheet) )

    // let questionClasses = `link question`;

    // if (current === i) {
    //   questionClasses = "link question active";
    // }

    // if (
    //   current === i &&
    //   Object.keys(answerSheet).indexOf(String(current)) !== -1
    // ) {
    //   questionClasses = "link question answered";
    // }

    // answerSheet && Object.keys(answerSheet).forEach((qn) => {
    //   if (String(qn) === q) {
    //     questionClasses = "link question answered";
    //   }
    // });

    return (
      <button
        key={"qOption" + q}
        className={optionClases}
        onClick={() => dispatch(specificQuiz(i))}
      >
        {i + 1}
      </button>
    );
  });

  return (
    <div className="question-number">{totalQuestions}</div>
  )
}

