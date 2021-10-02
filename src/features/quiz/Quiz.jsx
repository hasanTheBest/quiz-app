import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { AsideLinks } from "../../components/aside/AsideLinks";
import { AsideTags } from "../../components/aside/AsideTags";
import { fetchQuizAsyncThunk, selectAllQuizs } from "./quizSlice";

export const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answerSheet, setAnswerSheet] = useState({});
  
  const dispatch = useDispatch();

  const status = useSelector((state) => state.quiz.status);
  const allQuizs = useSelector(selectAllQuizs);
  const singleQuiz = allQuizs[current];
  const { correct_answers, answers, tags, category, question } = singleQuiz
    ? singleQuiz
    : {};

    useEffect(() => {
      if(status === "idle"){
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

  // const justifyAnswer = (givenAns, correctAns, i) => {
  const justifyAnswer = (ans, i) => {
    setAnswerSheet((state) => {
      return {
        ...state,
        [current]: {
          isCorrect: ans === "true" ? "correct" : "wrong",
          index: i,
        },
        // [current]: { isCorrect: givenAns === correctAns, index: i },
      };
    });
    // setIsClicked(!isClicked);

    if (ans === "true") {
      setScore(score + 1);
    }

    setTimeout(() => {
      onClickNextQuiz(current + 1);
    }, 300);
  };


  const onClickSubmitQuiz = () => {console.log("onClickSubmitQuiz");}
  
  // question number button
  const quizOptions = singleQuiz && Object.entries(answers).map(([key, value], option_i) => {
    if (value === null) {
      return;
    }

    const [key_ans, value_ans] = singleQuiz && Object.entries(correct_answers)[option_i];

    let optionClasses = `question-option ${
      option_i === answerSheet[current]?.index &&
      answerSheet[current]?.isCorrect
    }`;

    // if(answerSheet[current]?.isCorrect && key === correct_answer){
    //   optionClasses = `question-option correct`
    // }

    // const oi = Number(answerSheet[current]?.index)
    //  if(answerSheet[current] && correct_answers_array[oi][1] === "false"){
    //   optionClasses = `question-option wrong`
    // }

    return (
      <li
        className={optionClasses}
        key={key}
        onClick={() => justifyAnswer(value_ans, option_i)}
        // onClick={() => justifyAnswer(key, correct_answer, option_i)}
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
    if (
      current === i &&
      Object.keys(answerSheet).indexOf(String(current)) !== -1
    ) {
      questionClasses = "link question answered";
    }

    const answeredQuestions = Object.keys(answerSheet);

    answeredQuestions.forEach((qn) => {
      if (Number(qn) === i) {
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
    Object.keys(answerSheet).indexOf(String(current)) !== -1
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
          <span className="question-number">{current + 1}.</span> {question}
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

      { status === "loading" ? (<h1>Await .....fetching data</h1>) : <content className="content-main">{quizMarkup}</content>}
    </main>
  );
};
