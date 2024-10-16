# Quote Champion

Quote Champion is a web application that helps you find your favorite quote through a tournament-style selection process. The quotes currently used in the app are sourced from personal highlights captured using Readwise.

## Tournament Methodology

The tournament follows a bracket-style elimination process:

1. 64 quotes are randomly selected from the pool of available quotes.
2. Quotes are paired, and users select their preferred quote from each pair.
3. Winners advance to the next round, while losers are eliminated.
4. The tournament progresses through the following rounds:
   - Round of 64 (First Round)
   - Round of 32 (Second Round)
   - Round of 16 (Third Round)
   - Round of 8 (Fourth Round or Quarterfinals)
   - Semifinals
   - Final
5. At the end of the tournament, the top 4 quotes are displayed in order from champion to 4th place.

## Running the Tournament with Your Own Quotes

To use your own quotes in the Quote Champion tournament:

1. Prepare a JSON file with your quotes. The file should have the following structure:

```json
[
  {
    "id": "unique_identifier",
    "text": "Your quote text goes here",
    "author": "Quote Author",
    "source": "Source of the quote (optional)"
  },
  // ... more quote objects
]
```

2. Place your JSON file in the `src/data` directory of the project.

3. Update the `src/utils/dataUtils.js` file to import your new JSON file:

```javascript
import yourQuotes from '../data/your-quotes-file.json';
```

4. In the same file, modify the `loadQuotes` function to use your new quotes:

```javascript
export function loadQuotes() {
  return yourQuotes;
}
```

5. Rebuild and deploy the application to see your quotes in action.

## Development and Deployment

1. Clone the repository
2. Install dependencies: `npm install`
3. Run locally: `npm start`
4. Deploy to GitHub Pages: Push changes to the `main` branch, and the GitHub Actions workflow will automatically deploy the app.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
