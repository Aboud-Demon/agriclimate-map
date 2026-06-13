# AgriClimate Map

AgriClimate Map is a responsive agri-tech web platform for location-based environmental analysis. Users can select a point on an interactive map, fetch real climate and soil insights, review seasonal agricultural risk alerts, and open a report view based on the latest saved analysis.

## Main Features

- Home page with latest saved analysis summary from localStorage
- English and Arabic language support with RTL layout handling
- Interactive Leaflet map with OpenStreetMap tiles
- Click-to-select latitude and longitude
- Historical weather analysis using Open-Meteo Historical Weather API
- Soil analysis using ISRIC SoilGrids REST API
- Seasonal agricultural risk alerts using Open-Meteo Seasonal Forecast API
- Report page that reads the latest analysis from localStorage
- Print Report support with print-friendly styling
- Export latest analysis as JSON
- Responsive desktop and mobile layouts
- Clickable report sidebar navigation
- Bell and user dropdown UI interactions

## Tech Stack

- Next.js App Router
- React
- JavaScript
- Tailwind CSS
- Leaflet
- React Leaflet
- Recharts
- Lucide React

## APIs Used

- Open-Meteo Historical Weather API
- Open-Meteo Seasonal Forecast API
- ISRIC SoilGrids REST API

## Installation

1. Clone or copy the project to your local machine.
2. Open a terminal in `D:\agriclimate-map`.
3. Install dependencies:

```bash
npm install
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create a production build:

```bash
npm run build
```

Start the production server after building:

```bash
npm run start
```

## Available Routes

- `/`  
  Home page with platform overview and latest saved analysis summary.

- `/map`  
  Main analysis dashboard with map, weather results, soil results, risk alerts, and charts.

- `/report`  
  Report preview page based on the latest saved analysis in localStorage.

- `/api/historical?lat=...&lng=...`  
  Returns analyzed historical weather data for the selected coordinates.

- `/api/soil?lat=...&lng=...`  
  Returns analyzed soil property data for the selected coordinates.

- `/api/risk?lat=...&lng=...`  
  Returns seasonal agricultural risk indicators and alert summaries for the selected coordinates.

## How to Test the System

1. Run `npm run dev`.
2. Open `/map`.
3. Click a location on the map.
4. Click `Analyze Location`.
5. Confirm that:
   - historical weather cards update
   - soil cards update
   - risk alerts update
   - yearly charts render if data exists
6. Open `/`.
7. Confirm the Home overview cards show the latest analysis summary.
8. Open `/report`.
9. Confirm the report reads the latest saved analysis.
10. Click `Print Report` and confirm the browser print dialog opens.
11. Click `Export JSON` and confirm a JSON file downloads.
12. Switch between English and Arabic and confirm text and layout update.
13. Run `npm run build` and confirm the production build passes.

## Known Limitations

- Latest report and Home summary depend on browser localStorage, so they are device/browser specific.
- No database or user account system is connected yet.
- UV-specific live data is not connected yet.
- Smart irrigation logic is still a placeholder.
- Seasonal alerts are agricultural risk indicators, not exact daily weather predictions.
- External API availability and response quality depend on third-party services.
- Some translated fallback strings may still appear in English when a new translation key has not been added yet.

## Future Improvements

- Add persistent storage for analysis history
- Add user accounts and saved workspaces
- Add live UV and solar-specific data sources
- Add smart irrigation recommendation logic
- Add richer reporting and PDF export
- Add more detailed soil depth analysis
- Add optional seasonal forecast visualizations and comparison views
- Add automated test coverage
