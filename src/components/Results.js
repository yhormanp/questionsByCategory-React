import React from 'react';
import PropTypes from 'prop-types';

function Result(props) {
  return (
    <div>
      <div className="result">
        {/* You prefer <strong>{props.quizResult}</strong>! */}
        you have achieved   
        <p>
          <strong>{props.quizResult.correct}</strong> Correct  
        </p>
        <p>
          <strong>{props.quizResult.incorrect}</strong> Incorrect  
        </p>
      </div>
      <div>
        <button onClick={props.onReturnToCategories} > Return to Categories </button>
      </div>
    </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.string.isRequired,
};

export default Result;
