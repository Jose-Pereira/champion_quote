function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function initializeTournament(quotes) {
  const selectedQuotes = shuffleArray(quotes).slice(0, 64);
  const matches = [];

  for (let i = 0; i < selectedQuotes.length; i += 2) {
    matches.push({
      quote1: selectedQuotes[i],
      quote2: selectedQuotes[i + 1],
      winner: null
    });
  }

  return matches;
}

export function advanceToNextRound(currentMatches) {
  const winners = currentMatches.map(match => match.winner);
  const nextRoundMatches = [];

  for (let i = 0; i < winners.length; i += 2) {
    nextRoundMatches.push({
      quote1: winners[i],
      quote2: winners[i + 1],
      winner: null
    });
  }

  return nextRoundMatches;
}

export function getRoundName(matchesCount) {
  switch (matchesCount) {
    case 32: return "Round of 64 (First Round)";
    case 16: return "Round of 32 (Second Round)";
    case 8: return "Round of 16 (Third Round)";
    case 4: return "Round of 8 (Fourth Round or Quarterfinals)";
    case 2: return "Semifinals";
    case 1: return "Final";
    default: return "Tournament Completed";
  }
}

export function getFinalRankings(matches, semifinalists) {
  const final = matches[0];
  const champion = final.winner;
  const runnerUp = final.quote1.id === champion.id ? final.quote2 : final.quote1;
  
  const thirdPlaceMatch = {
    quote1: semifinalists.find(q => q.id !== final.quote1.id && q.id !== final.quote2.id),
    quote2: semifinalists.find(q => q.id !== final.quote1.id && q.id !== final.quote2.id && q.id !== semifinalists[0].id)
  };

  return [
    champion,
    runnerUp,
    thirdPlaceMatch.quote1,
    thirdPlaceMatch.quote2
  ];
}
