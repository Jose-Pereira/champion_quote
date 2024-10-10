import React, { useState, useEffect } from 'react';
import QuoteComparison from './QuoteComparison';
import { conductMiniTournament, aggregateScores, conductSwissTournament } from '../utils/tournamentUtils';
import { saveState, loadState } from '../utils/dataUtils';

function TournamentManager({ quotes }) {
  const [phase, setPhase] = useState('initial');
  const [miniTournaments, setMiniTournaments] = useState([]);
  const [aggregatedScores, setAggregatedScores] = useState({});
  const [finalRankings, setFinalRankings] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [swissTournament, setSwissTournament] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [stats, setStats] = useState({
    matchesCompleted: 0,
    quotesInContention: quotes.length,
    topQuotes: [],
  });

  // Reduced number of mini-tournaments for testing
  const NUM_MINI_TOURNAMENTS = 3;

  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      setPhase(savedState.phase);
      setMiniTournaments(savedState.miniTournaments);
      setAggregatedScores(savedState.aggregatedScores);
      setFinalRankings(savedState.finalRankings);
      setStats(savedState.stats);
      setSwissTournament(savedState.swissTournament || []);
      setCurrentRound(savedState.currentRound || 0);
    } else {
      startNewTournament();
    }
  }, []);

  useEffect(() => {
    saveState({ phase, miniTournaments, aggregatedScores, finalRankings, stats, swissTournament, currentRound });
    console.log('Current state:', { phase, miniTournaments, aggregatedScores, stats });
  }, [phase, miniTournaments, aggregatedScores, finalRankings, stats, swissTournament, currentRound]);

  const startNewTournament = () => {
    setPhase('initial');
    setMiniTournaments([]);
    setAggregatedScores({});
    setFinalRankings([]);
    setSwissTournament([]);
    setCurrentRound(0);
    setStats({
      matchesCompleted: 0,
      quotesInContention: quotes.length,
      topQuotes: [],
    });
    conductNextMiniTournament();
  };

  const conductNextMiniTournament = () => {
    if (miniTournaments.length < NUM_MINI_TOURNAMENTS) {
      const newMiniTournament = conductMiniTournament(quotes);
      setMiniTournaments(prevTournaments => [...prevTournaments, newMiniTournament]);
      setCurrentMatch(newMiniTournament[0]);
    } else {
      finalizeMiniTournaments();
    }
  };

  const finalizeMiniTournaments = () => {
    setPhase('scoring');
    const scores = aggregateScores(miniTournaments);
    setAggregatedScores(scores);
    startFinalPhase();
  };

  const startFinalPhase = () => {
    setPhase('final');
    const topQuotes = Object.entries(aggregatedScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 16)
      .map(([id]) => quotes.find(q => q.id === id));
    const newSwissTournament = conductSwissTournament(topQuotes);
    setSwissTournament(newSwissTournament);
    setCurrentMatch(newSwissTournament[0][0]);
    setCurrentRound(0);
    setStats(prevStats => ({
      ...prevStats,
      quotesInContention: 16,
      topQuotes: topQuotes,
    }));
  };

  const handleVote = (winnerId) => {
    setStats(prevStats => ({
      ...prevStats,
      matchesCompleted: prevStats.matchesCompleted + 1,
    }));

    if (phase === 'initial') {
      const currentTournamentIndex = miniTournaments.length - 1;
      const currentTournament = miniTournaments[currentTournamentIndex];
      const nextMatchIndex = currentTournament.findIndex(match => match === currentMatch) + 1;

      if (nextMatchIndex < currentTournament.length) {
        setCurrentMatch(currentTournament[nextMatchIndex]);
      } else {
        conductNextMiniTournament();
      }
    } else if (phase === 'final') {
      const currentMatchIndex = swissTournament[currentRound].findIndex(match => match === currentMatch);
      const winner = currentMatch.quote1.id === winnerId ? currentMatch.quote1 : currentMatch.quote2;
      winner.score = (winner.score || 0) + 1;

      if (currentMatchIndex < swissTournament[currentRound].length - 1) {
        setCurrentMatch(swissTournament[currentRound][currentMatchIndex + 1]);
      } else if (currentRound < 3) {
        setCurrentRound(prevRound => prevRound + 1);
        setCurrentMatch(swissTournament[currentRound + 1][0]);
      } else {
        finalizeTournament();
      }
    }
  };

  const finalizeTournament = () => {
    setPhase('completed');
    setCurrentMatch(null);
    const finalRankings = swissTournament[3]
      .flatMap(match => [match.quote1, match.quote2])
      .sort((a, b) => b.score - a.score);
    setFinalRankings(finalRankings);
  };

  return (
    <div>
      <h2>Current Phase: {phase}</h2>
      <div className="statistics">
        <h3>Statistics</h3>
        <p>Matches Completed: {stats.matchesCompleted}</p>
        <p>Quotes in Contention: {stats.quotesInContention}</p>
        {phase === 'final' && <p>Current Round: {currentRound + 1}/4</p>}
        {stats.topQuotes.length > 0 && (
          <div>
            <h4>Top 16 Quotes:</h4>
            <ol>
              {stats.topQuotes.map((quote, index) => (
                <li key={quote.id}>{quote.text.substring(0, 50)}...</li>
              ))}
            </ol>
          </div>
        )}
      </div>
      {currentMatch && (
        <QuoteComparison
          quote1={currentMatch.quote1}
          quote2={currentMatch.quote2}
          onVote={handleVote}
        />
      )}
      {phase === 'completed' && (
        <div className="final-rankings">
          <h3>Final Rankings</h3>
          <ol>
            {finalRankings.map((quote, index) => (
              <li key={quote.id}>{quote.text} (Score: {quote.score})</li>
            ))}
          </ol>
          <button onClick={startNewTournament}>Start New Tournament</button>
        </div>
      )}
    </div>
  );
}

export default TournamentManager;
