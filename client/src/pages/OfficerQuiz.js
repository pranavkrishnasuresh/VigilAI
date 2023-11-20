import React, { useState } from 'react';
import ReactQuiz from '../components/ReactQuiz';
const questionsArray = [
  'Question 1: ...',
  'Question 2: ...',
  'Question 3: ...',
  'Question 4: ...',
  'Question 4: ...',
  // Add more questions here
];
const choicesArray = [
  ['blah', 'blah', 'blah', 'blah', 'blah',],
  ['blah', 'blah', 'blah', 'blah', 'blah',],
  ['blah', 'blah', 'blah', 'blah', 'blah',],
  ['blah', 'blah', 'blah', 'blah', 'blah',],
  ['blah', 'blah', 'blah', 'blah', 'blah',],
  ['blah', 'blah', 'blah', 'blah', 'blah',],
  // Add more questions here
];
const correctAnswersArray = [
  'hello',
  'hello',
  'hello',
  'hello',
  'hello',
  // Add more questions here
];
function OfficerQuiz() {
  return ( 
  <div>
    <ReactQuiz 
    questions={questionsArray}
    choices={choicesArray}
    correctAnswers={correctAnswersArray}/>
  </div>
  );
}

export default OfficerQuiz;
