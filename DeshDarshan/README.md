# DeshDarshan

DeshDarshan is a web application designed to showcase top tourist spots in India, providing users with detailed information and dynamic pricing for various attractions.

## Features

- **Top Tourist Spots**: Displays a list of popular tourist destinations.
- **Dynamic Pricing**: Integrates pricing data for entry fees and boat rides, formatted in Indian Rupees.
- **Detailed Information**: Offers comprehensive details about each tourist spot, including pricing and available packages.

## Project Structure

```
DeshDarshan
├── src
│   ├── components
│   │   ├── TopSpots.jsx        // Component displaying a list of top tourist spots
│   │   └── DestinationDetails.jsx // Component showing detailed information about a specific spot
│   ├── data
│   │   ├── pricingData.js      // Contains pricing information for tourist spots
│   │   └── topSpotsData.js     // Merges tourist spots with their corresponding prices
│   ├── App.jsx                 // Main application component
│   └── index.js                // Entry point of the application
├── package.json                 // npm configuration file
├── babel.config.js              // Babel configuration file
└── README.md                    // Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/DeshDarshan.git
   ```
2. Navigate to the project directory:
   ```
   cd DeshDarshan
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:
```
npm start
```
This will launch the application in your default web browser.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.