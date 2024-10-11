import React, { useState, useEffect } from 'react';
import QuoteComparison from './QuoteComparison';
import { initializeTournament, advanceToNextRound, getRoundName, getFinalRankings } from '../utils/tournamentUtils';
import { saveState, loadState } from '../utils/dataUtils';

function TournamentManager({ quotes }) {
  const [phase, setPhase] = useState('initial');
  const [currentMatches, setCurrentMatches] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [finalRankings, setFinalRankings] = useState([]);
  const [stats, setStats] = useState({
    matchesCompleted: 0,
    quotesInContention: 64,
    currentRound: '',
  });
  const [semifinalists, setSemifinalists] = useState([]);

  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      setPhase(savedState.phase);
      setCurrentMatches(savedState.currentMatches);
      setCurrentMatchIndex(savedState.currentMatchIndex);
      setFinalRankings(savedState.finalRankings);
      setStats(savedState.stats);
      setSemifinalists(savedState.semifinalists || []);
      console.log('Loaded saved state:', savedState);
    } else {
      startNewTournament();
    }
  }, []);

  useEffect(() => {
    saveState({ phase, currentMatches, currentMatchIndex, finalRankings, stats, semifinalists });
    console.log('Current state:', { phase, currentMatches, currentMatchIndex, stats });
  }, [phase, currentMatches, currentMatchIndex, finalRankings, stats, semifinalists]);

  const startNewTournament = () => {
    console.log('Starting new tournament');
    const initialMatches = initializeTournament(quotes);
    setPhase('ongoing');
    setCurrentMatches(initialMatches);
    setCurrentMatchIndex(0);
    setFinalRankings([]);
    setSemifinalists([]);
    setStats({
      matchesCompleted: 0,
      quotesInContention: 64,
      currentRound: getRoundName(initialMatches.length),
    });
  };

  const handleVote = (winnerId) => {
    console.log(`Vote recorded for quote ${winnerId}`);
    const updatedMatches = [...currentMatches];
    updatedMatches[currentMatchIndex].winner = quotes.find(q => q.id === winnerId);
    setCurrentMatches(updatedMatches);

    setStats(prevStats => ({
      ...prevStats,
      matchesCompleted: prevStats.matchesCompleted + 1,
    }));

    if (currentMatchIndex < currentMatches.length - 1) {
      setCurrentMatchIndex(prevIndex => prevIndex + 1);
    } else {
      advanceRound();
    }
  };

  const advanceRound = () => {
    if (currentMatches.length > 1) {
      const nextRoundMatches = advanceToNextRound(currentMatches);
      setCurrentMatches(nextRoundMatches);
      setCurrentMatchIndex(0);
      setStats(prevStats => ({
        ...prevStats,
        quotesInContention: nextRoundMatches.length * 2,
        currentRound: getRoundName(nextRoundMatches.length),
      }));

      if (nextRoundMatches.length === 2) {
        setSemifinalists(currentMatches.flatMap(match => [match.quote1, match.quote2]));
      }
    } else {
      finalizeTournament();
    }
  };

  const finalizeTournament = () => {
    console.log('Finalizing tournament');
    setPhase('completed');
    const rankings = getFinalRankings(currentMatches, semifinalists);
    setFinalRankings(rankings);
  };

  return (
    <div>
      <h2>Current Phase: {phase}</h2>
      <div className="statistics">
        <h3>Statistics</h3>
        <p>Matches Completed: {stats.matchesCompleted}</p>
        <p>Quotes in Contention: {stats.quotesInContention}</p>
        <p>Current Round: {stats.currentRound}</p>
      </div>
      {phase === 'ongoing' && currentMatches[currentMatchIndex] && (
        <QuoteComparison
          quote1={currentMatches[currentMatchIndex].quote1}
          quote2={currentMatches[currentMatchIndex].quote2}
          onVote={handleVote}
        />
      )}
      {phase === 'completed' && (
        <div className="final-rankings">
          <h3>Final Rankings</h3>
          <ol>
            {finalRankings.map((quote, index) => (
              <li key={quote.id}>{quote.text} (Place: {index + 1})</li>
            ))}
          </ol>
          <button onClick={startNewTournament}>Start New Tournament</button>
        </div>
      )}
    </div>
  );
}

export default TournamentManager;
