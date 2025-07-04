import { useState, useEffect } from "react";

export default function Progress({ timeOut, progressState, skipQuestion }) {
  const [progress, setProgress] = useState(timeOut);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev - 10;

        if (next <= 0) {
          clearInterval(interval);
        }

        return next;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [timeOut]);

  useEffect(() => {
    if (progress <= 0 && progressState === "") {
      skipQuestion(); 
    }
  }, [progress, progressState, skipQuestion]);

  return (
    <p id="question">
      <progress
        className={progressState}
        max={timeOut}
        value={progress}
      ></progress>
    </p>
  );
}
