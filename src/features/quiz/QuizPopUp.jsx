import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllQuizIds, selectAnswerSheet } from "./quizSlice";

const StyledPopupBox = styled.div`
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(p) => p.theme.color.black_a8};
  z-index: 333;
`;

const StyledPopupCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(p) => p.theme.color.darkBlueBlack};
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 8px 12px 10px rgba(255, 255, 255, 0.1),
    -8px -12px 10px rgba(255, 255, 255, 0.1);

  & > .title {
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  & > .body {
    font-size: 1.2rem;
    padding: 0.5rem 1rem 1rem 2rem;
  }

  & > .popup-footer {
    padding: 1rem;
    display: flex;
    justify-content: space-between;

    & > button {
      padding: 0.9rem 1.5rem;
      border-radius: 0.3rem;
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: 2px;
      border: none;
      cursor: pointer;
      color: ${(p) => p.theme.color.white_a8};

      &.submit {
        background-color: darkgreen;
        margin-right: 1.5rem;
      }

      &.cancel {
        background-color: darkslateblue;
      }
    }
  }
`;

export function QuizPopUp({ showPopup, setShowPopup, setSureSubmit }) {
  const answered = useSelector(selectAnswerSheet);
  const qIds = useSelector(selectAllQuizIds);
  const handleSubmit = () => {
    setShowPopup(false);
    setSureSubmit(true);
  };
  const handleCancelSubmit = () => {
    setShowPopup(false);
  };

  return (
    <StyledPopupBox>
      <StyledPopupCard>
        <h4 className="title">Are you sure to submit the quiz?</h4>
        <p className="body">
          You've answered <b>{Object.entries(answered).length}</b> out of the{" "}
          <b>{qIds.length}</b>
        </p>
        <div className="popup-footer">
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
          <button className="cancel" onClick={handleCancelSubmit}>
            Cancel
          </button>
        </div>
      </StyledPopupCard>
    </StyledPopupBox>
  );
}
