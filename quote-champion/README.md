# Quote Champion

Quote Champion is a web application that implements a quote ranking system using a tournament-style methodology.

## Features

- Conducts multiple mini-tournaments with randomly selected quotes
- Aggregates results from mini-tournaments
- Runs a final Swiss-style tournament for top performers
- Provides real-time statistics throughout the tournament process
- Allows pausing and resuming tournaments
- Responsive design for various screen sizes

## Prerequisites

- Node.js (version 14 or later)
- npm (usually comes with Node.js)

## Setup

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/quote-champion.git
   cd quote-champion
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a file named `3_star_quotes.json` in the `public` directory containing an array of quotes:
   ```json
   [
     "First quote",
     "Second quote",
     "Third quote",
     ...
   ]
   ```

## Running the Application

To start the development server:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Deployment

To deploy the application to GitHub Pages:

1. Update the `homepage` field in `package.json` with your GitHub Pages URL:
   ```json
   "homepage": "https://yourusername.github.io/quote-champion"
   ```

2. Run the following command:
   ```
   npm run deploy
   ```

3. Your application will be available at the URL specified in the `homepage` field.

## Usage

1. Open the application in your web browser
2. The tournament will start automatically
3. Click on the quote you prefer in each matchup
4. View the results and statistics as you progress through the tournament phases
5. After the final phase, you can view the final rankings and start a new tournament

## Architecture

The application is built using React and consists of the following main components:

- `App.js`: The main component that manages loading quotes and error handling
- `TournamentManager.js`: Handles the logic for conducting the tournament phases
- `QuoteComparison.js`: Displays two quotes for comparison and handles voting
- `dataUtils.js`: Utility functions for loading quotes and managing local storage
- `tournamentUtils.js`: Functions for implementing the tournament logic

The ranking methodology is implemented in three phases:
1. Initial Phase: Conduct 10 mini-tournaments
2. Scoring Phase: Aggregate results from mini-tournaments
3. Final Phase: Conduct a Swiss-style tournament with the top 16 quotes

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the [MIT License](LICENSE).