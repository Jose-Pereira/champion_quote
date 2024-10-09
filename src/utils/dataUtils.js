export async function loadQuotes() {
  try {
    const response = await fetch('https://jose-pereira.github.io/quotes_champion/pre_process/3_star_quotes.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const quotes = await response.json();
    return quotes.map((quote, index) => ({
      id: index.toString(),
      text: quote.highlight,
      bookTitle: quote.bookTitle
    }));
  } catch (error) {
    console.error('Error loading quotes:', error);
    throw new Error('Failed to load quotes. Please check your internet connection and try again.');
  }
}

export function saveState(state) {
  try {
    localStorage.setItem('quoteChampionState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving state:', error);
  }
}

export function loadState() {
  try {
    const savedState = localStorage.getItem('quoteChampionState');
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error('Error loading state:', error);
    return null;
  }
}
