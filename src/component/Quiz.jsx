import { useState, useCallback, useMemo } from "react";

import questions from "../question";
import Progress from "./Progress";
import Summary from "./Summary";

function reareangeArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const TIME_QUESTION = 4000 ;
const TIMER_PROGRESS = 1000 ;

export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const [cssClasses, setCssClasses] = useState("");

  let currentIndex = answers.length;

  if (
    cssClasses == "selected" ||
    cssClasses == "correct" ||
    cssClasses == "wrong"
  ) {
    currentIndex = currentIndex - 1;
  }

  const shuffledAnswers = useMemo(
    () => reareangeArray(questions[currentIndex]?.answers || []),
    [currentIndex, reareangeArray]
  );

  function handelClick(answer) {
    setAnswers((prev) => [...prev, answer]);
    setCssClasses("selected");

    const timeOut = setTimeout(() => {
      if (answer === questions[currentIndex].answers[0]) {
        setCssClasses("correct");
      } else {
        setCssClasses("wrong");
      }
      setTimeout(() => {
        clearTimeout(timeOut);
        setCssClasses("");
      }, 1000);
    }, 1000);
  }

  const skipQuestion = useCallback(function skipQuestion() {
    setAnswers((prev) => [...prev, null]);
    setCssClasses("");
  }, []);

  if (currentIndex === questions.length) {
    return <Summary answers={answers} />;
  }

  return (
    <>
      <Progress
        timeOut={cssClasses != "" ? TIMER_PROGRESS : TIME_QUESTION}
        progressState={cssClasses}
        skipQuestion={skipQuestion}
        key={`${currentIndex}-${cssClasses}`}
      />

      <p>{questions[currentIndex].text}</p>
      <ul id="answers">
        {shuffledAnswers.map((answer) => (
          <li className="answer" key={answer}>
            <button
              onClick={() => handelClick(answer)}
              className={answer === answers[currentIndex] ? cssClasses : ""}
              disabled={cssClasses}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
