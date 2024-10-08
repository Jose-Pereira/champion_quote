# Quote Champion

Quote Champion is a web application that implements a quote ranking system using a tournament-style methodology.

## Features

- Conducts multiple mini-tournaments with randomly selected quotes
- Aggregates results from mini-tournaments
- Runs a final Swiss-style tournament for top performers
- Provides real-time statistics throughout the tournament process
- Allows pausing and resuming tournaments
- Responsive design for various screen sizes

## Deployment

This project is set up to automatically deploy to GitHub Pages using GitHub Actions. Here's how it works:

1. The GitHub Actions workflow is defined in `.github/workflows/deploy.yml`.
2. Whenever changes are pushed to the main branch, the workflow will automatically:
   - Set up a Node.js environment
   - Install dependencies
   - Build the React application
   - Deploy the built files to the gh-pages branch

3. GitHub Pages is configured to serve the site from the gh-pages branch.

You can view the deployed application at: https://jose-pereira.github.io/quotes_champion

## Local Development

To run this project locally:

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm start`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the [MIT License](LICENSE).