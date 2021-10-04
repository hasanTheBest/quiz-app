import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { AsideLinks } from "../../components/aside/AsideLinks";
import { AsideTags } from "../../components/aside/AsideTags";
import { submitQuiz } from "../result/resultSlice";
import { fetchQuizAsyncThunk, selectAllQuizs } from "./quizSlice";

  export const QuizAns = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answerSheet, setAnswerSheet] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const status = useSelector((state) => state.quiz.status);
  const allQuizs = useSelector(selectAllQuizs);

  const singleQuiz = allQuizs[current];
  const {
    correct_answers,
    answers,
    tags,
    category,
    question,
    description,
    id,
  } = singleQuiz ? singleQuiz : {};

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuizAsyncThunk());
    }
  }, [dispatch]);

  const onClickNextQuiz = () => {
    if (current < allQuizs.length - 1) {
      setCurrent(current + 1);
    }
  };

  const onClickPrevQuiz = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  // const justifyAnswer = (ans, i) => {
  //   setAnswerSheet((state) => {
  //     return {
  //       ...state,
  //       [current]: {
  //         isCorrect: ans === "true" ? "correct" : "wrong",
  //         index: i,
  //       },
  //     };
  //   });

  //   if (ans === "true") {
  //     setScore(score + 1);
  //   }

  //   setTimeout(() => {
  //     onClickNextQuiz(current + 1);
  //   }, 300);
  // };

  // justifyQuizAnswer
  
  const justifyQuizAnswer = (qid, ans, oid, key_ans) => {
    setAnswerSheet((state) => {
      return {
        ...state,
        [qid]: {
          isCorrect: ans === "true",
          index: oid,
          id: qid,
          key_ans,
        },
      };
    });

    // Increase Score
    if (ans === "true") {
      setScore(score + 1);
    }

    // Show next question
    setTimeout(() => {
      onClickNextQuiz(current + 1);
    }, 300);
  };

  // Submit quiz
  const onClickSubmitQuiz = () => {
    dispatch(submitQuiz(answerSheet));
    history.push("/result");
  };

  // Quiz options
  const quizOptions =
    singleQuiz &&
    Object.entries(answers).map(([key, value], option_i) => {
      if (value === null) {
        return;
      }

      const [key_ans, value_ans] =
        singleQuiz && Object.entries(correct_answers)[option_i];

      const optionClasses = classNames("question-option", {
        correct:
          correct_answers[answerSheet[id]?.key_ans] === "true" &&
          answerSheet[id]?.index === option_i,
        wrong:
          correct_answers[answerSheet[id]?.key_ans] !== "true" &&
          answerSheet[id]?.index === option_i,
      });

      return (
        <li
          className={optionClasses}
          key={key}
          onClick={() => justifyQuizAnswer(id, value_ans, option_i, key_ans)}
        >
          {value}
        </li>
      );
    });

  const totalQuestions = allQuizs.map((q, i) => {

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

    const answeredQuestions = Object.keys(answerSheet);

    console.log(answeredQuestions)
    
    answeredQuestions.forEach((qn) => {
      if (String(qn) === q.id) {
        questionClasses = "link question answered";
      }
    });

    return (
      <button
        key={q.id}
        className={questionClasses}
        onClick={() => setCurrent(i)}
      >
        {i + 1}
      </button>
    );
  });

  const disabledOptions =
    Object.keys(answerSheet).indexOf(String(id)) !== -1
      ? "disabled-options"
      : "";

  const quizMarkup = (
    <>
      <h2 className="quiz-header">
        {category} - <span className="score">{score}</span>
      </h2>
      <div className="question-wrapper">
        <div className="question-number">{totalQuestions}</div>
        <h6 className="question main">
          <span className="question-number">{current + 1}.</span> {question}{" "}
          <span className="question-hint">{description && description}</span>
        </h6>
        <div className="question-options-wrapper">
          <ol type="A" className={`option-list ${disabledOptions}`}>
            {quizOptions}
          </ol>
        </div>
        <div className="question-prev-next">
          <button className="link prev" onClick={onClickPrevQuiz}>
            Previous
          </button>
          <button className="link submit" onClick={onClickSubmitQuiz}>
            submit
          </button>
          <button className="link next" onClick={onClickNextQuiz}>
            Next
          </button>
        </div>
      </div>
    </>
  );

  return (
    <main className="content">
      <aside>
        <AsideLinks />
        <AsideTags tags={tags} />
      </aside>

      {status === "loading" ? (
        <h1>Await .....fetching data</h1>
      ) : (
        <div className="content-main">{quizMarkup}</div>
      )}
    </main>
  );
};
