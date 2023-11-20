import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ReactQuiz.css';

const ReactQuiz = (props) => {
  const {questions, choices, correctAnswers } = props;
  const history = useHistory();
  console.log(typeof questions)
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (questionIndex, choiceIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = choiceIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    // Calculate the score
    const score = selectedAnswers.reduce((acc, selectedChoice, index) => {
      return selectedChoice === correctAnswers[index] ? acc + 1 : acc;
    }, 0);

    // Display the score
    alert(`Your Score: ${score}/${questions.length}`);

    // Reset selected answers
    setSelectedAnswers(Array(questions.length).fill(null));

    //Move officer back to their dashboard
    history.push('/officer/dashboard');
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <p>{question}</p>
            {choices[questionIndex].map((choice, choiceIndex) => (
              <label key={choiceIndex}>
                <input
                  type="radio"
                  name={`question_${questionIndex}`}
                  value={choiceIndex}
                  onChange={() => handleInputChange(questionIndex, choiceIndex)}
                  checked={selectedAnswers[questionIndex] === choiceIndex}
                  disabled={submitted}
                />
                {choice}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" disabled={submitted}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReactQuiz;
