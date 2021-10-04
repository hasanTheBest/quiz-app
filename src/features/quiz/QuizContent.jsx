import React from "react";
import { QuizContentHeader } from "./QuizContentHeader";
import { QuizNavigation } from "./QuizNavigation";
import { QuizQuestionOptions } from "./QuizQuestionOptions";
import { QuizQuestionTitle } from "./QuizQuestionTitle";
import { QuizTotalQuestion } from "./QuizTotalQuestion";

export const QuizContent = () => {
  return (
    <>
      <div className="question-wrapper">
        <QuizContentHeader />
        <QuizTotalQuestion />
        <QuizQuestionTitle />
        <QuizQuestionOptions />
        <QuizNavigation />
      </div>
    </>
  );
};
