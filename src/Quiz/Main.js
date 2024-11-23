import React, { useState } from "react";
import Questions from "../Data/Quetions.json"; // Adjust the file path as per your project

const Main = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current question index
  const [selectedAnswer, setSelectedAnswer] = useState(""); // Track the selected answer
  const [score, setScore] = useState(0); // Track the score
  const [showResult, setShowResult] = useState(false); // Show results after the quiz

  const currentQuestion = Questions[currentIndex]; // Get the current question

  const handleOptionChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmit = () => {
    // Check if the selected answer is correct
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }
    console.log(score)
    // Go to the next question or show results
    if (currentIndex < Questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(""); // Reset the selected answer for the next question
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="bg-gray-500 w-full h-screen flex justify-center items-center">
      <div className="w-11/12 md:w-3/5 lg:w-2/5 max-h-[90%] shadow-lg bg-white rounded-md overflow-auto">
        {!showResult ? (
          <div className="py-6 px-6 md:py-10 md:px-10">
            {/* Question */}
            <h2 className="text-lg md:text-xl font-semibold flex gap-2">
            <span className="flex-none">{currentQuestion.id}.</span>
            <span className="flex-1 leading-relaxed">{currentQuestion.question}</span>
            </h2>

            {/* Options */}
            <ul className="my-5 pl-4 space-y-4 md:space-y-6 list-none">
              {currentQuestion.options.map((option) => (
                <li key={option.key} className="flex items-center gap-3">
                  <input
                    type="radio"
                    id={option.key}
                    name={`question-${currentIndex}`}
                    value={option.key}
                    className="cursor-pointer"
                    onChange={handleOptionChange}
                    checked={selectedAnswer === option.key}
                    
                  />
                  <label
                    htmlFor={option.key}
                    className="text-sm md:text-base cursor-pointer"
                  >
                    {option.key}). {option.text}
                  </label>
                </li>
              ))}
            </ul>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="bg-green-300 w-full px-4 py-2 text-sm md:text-base rounded-md mt-5 hover:bg-green-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold">Quiz Completed!</h2>
            <p className="text-lg mt-4">
              Your Score: {score} / {Questions.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
