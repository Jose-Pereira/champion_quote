function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function conductMiniTournament(quotes) {
  // Reduced from 50 to 10 for faster testing
  const selectedQuotes = shuffleArray(quotes).slice(0, 10);
  const matches = [];

  for (let i = 0; i < selectedQuotes.length; i += 2) {
    if (i + 1 < selectedQuotes.length) {
      matches.push({
        quote1: selectedQuotes[i],
        quote2: selectedQuotes[i + 1],
      });
    }
  }

  return matches;
}

export function aggregateScores(miniTournaments) {
  const scores = {};

  miniTournaments.forEach(tournament => {
    tournament.forEach((match, index) => {
      const points = tournament.length - index;
      const winnerId = match.winner;
      scores[winnerId] = (scores[winnerId] || 0) + points;
    });
  });

  return scores;
}

export function conductSwissTournament(topQuotes) {
  const players = topQuotes.map(quote => ({ ...quote, score: 0, opponents: [] }));
  const rounds = 4;
  const tournamentRounds = [];

  for (let round = 0; round < rounds; round++) {
    const roundMatches = pairPlayers(players);
    tournamentRounds.push(roundMatches);

    roundMatches.forEach(match => {
      match.quote1.opponents.push(match.quote2.id);
      match.quote2.opponents.push(match.quote1.id);
    });

    players.sort((a, b) => b.score - a.score);
  }

  return tournamentRounds;
}

function pairPlayers(players) {
  const pairs = [];
  const unpaired = [...players];

  while (unpaired.length > 1) {
    const player1 = unpaired.shift();
    let opponent = unpaired.find(p => !player1.opponents.includes(p.id));

    if (!opponent) {
      opponent = unpaired[0];
    }

    unpaired.splice(unpaired.indexOf(opponent), 1);
    pairs.push({ quote1: player1, quote2: opponent });
  }

  return pairs;
}
