import React, { useState, useEffect } from 'react';
import TournamentManager from './components/TournamentManager';
import { loadQuotes } from './utils/dataUtils';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadQuotes()
      .then(loadedQuotes => {
        setQuotes(loadedQuotes);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="App loading">Loading quotes...</div>;
  }

  if (error) {
    return <div className="App error">Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Quote Champion</h1>
      {quotes.length > 0 ? (
        <TournamentManager quotes={quotes} />
      ) : (
        <p className="no-quotes">No quotes available. Please check your data source.</p>
      )}
    </div>
  );
}

export default App;