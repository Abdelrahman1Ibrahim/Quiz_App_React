import quizComplete from "../assets/quiz-complete.png";
import questions from "../question";

export default function Summary({ answers }) {
  let correct = 0,
    skipped = 0,
    wrong = 0;
  function clacScore() {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === questions[i].answers[0]) {
        correct++;
      } else if (answers[i] == null) {
        skipped++;
      } else {
        wrong++;
      }
    }
  }
  clacScore();

  correct = Math.round((correct / answers.length) * 100);
  skipped = Math.round((skipped / answers.length) * 100);
  wrong = Math.round((wrong / answers.length) * 100);

  return (
    <section id="summary">
      <img src={quizComplete} alt="quizComplete" />
      <h2>Quiz Complete</h2>

      <div id="summary-stats">
        <p>
          <span className="number">{skipped}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correct}%</span>
          <span className="text">Answerd Correctly</span>
        </p>
        <p>
          <span className="number">{wrong}%</span>
          <span className="text">Answerd Incorrectly</span>
        </p>
      </div>

      <ol>
        {answers.map((answer, index) => (
          <li key={answer == null ? index : answer}>
            <h3>{index + 1}</h3>
            <p>{questions[index].text}</p>
            <p
              className={`user-answer ${
                answer === questions[index].answers[0]
                  ? "correct"
                  : answer == null
                  ? "skipped"
                  : "wrong"
              }`}
            >
              {answer == null ? "Skipped" : answer}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
