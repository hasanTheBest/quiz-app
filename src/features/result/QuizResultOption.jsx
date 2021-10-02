import classNames from "classnames";
import React from 'react'

export const QuizResultOption = ({answer, option: [key, value], correct: [ans_key, ans_value]}) => {
  
  if(value === null) { return null} 

   const classes = classNames("question-option", {
     "correct" : ans_value === "true" && answer?.isCorrect,
     "wrong" : ans_value === "false" && answer?.key_ans === ans_key,
     "skipped" : ans_value === "true",
   })
 
   return(
     <li
         className={classes}
         key={key + ans_key}
       >
         {value}
       </li>
   )
 }