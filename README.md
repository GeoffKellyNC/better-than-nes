# ⚡ Better Than NES

A real-time Nashville power outage tracker built to help residents find outage information quickly during emergencies.

## About

Better Than NES provides a fast, mobile-friendly interface to track power outages in Nashville, TN. Built in response to recent storm outages, this tool helps residents quickly find outage information by zip code, address, or location.

## Data Source

Outage data is sourced from the official [NES (Nashville Electric Service) API](https://utilisocial.io/datacapable/v2/p/NES/map/events). The app refreshes data every 3 minutes to provide up-to-date outage information.

Address information is reverse-geocoded using the free [Nominatim OpenStreetMap API](https://nominatim.openstreetmap.org/) to make outages easier to find.

## Features

- **Real-time Outage Data**: Auto-refreshes every 3 minutes
- **Interactive Map**: Leaflet-based map with marker clustering for performance
- **Smart Search**: Search by incident ID, zip code, street address, or neighborhood
- **Stats Dashboard**: Live statistics showing total outages, people affected, and status breakdown
- **Mobile-First Design**: Optimized for mobile users in emergency situations
- **Dark Theme**: Easy on the eyes and saves battery

## Tech Stack

- React 19
- Vite
- styled-components
- Leaflet & react-leaflet
- @reach/router
- axios

## Running Locally

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev

# Build for production
npm run build
```

## Deployment

Deploys automatically to Netlify on push to main branch. The `.npmrc` file ensures proper dependency resolution with `legacy-peer-deps`.

## Contributing

This is an open-source project built for the Nashville community. Contributions, suggestions, and bug reports are welcome!

## License

MIT

---

Built with ❤️ for Nashville
