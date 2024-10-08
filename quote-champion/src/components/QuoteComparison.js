import React from 'react';

function QuoteComparison({ quote1, quote2, onVote }) {
  return (
    <div className="quote-comparison">
      <h3>Choose the better quote:</h3>
      <div className="quote-container">
        <div className="quote">
          <p>"{quote1.text}"</p>
          <button onClick={() => onVote(quote1.id)}>Vote for this quote</button>
        </div>
        <div className="quote">
          <p>"{quote2.text}"</p>
          <button onClick={() => onVote(quote2.id)}>Vote for this quote</button>
        </div>
      </div>
    </div>
  );
}

export default QuoteComparison;