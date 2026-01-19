# ✈️ Flight Search Engine

A flight search application built with React + TypeScript, integrated with the Amadeus API, allowing users to search for flights, apply filters, and visualize price data in a clear and interactive way.

The project focuses on good UX, clean architecture, loading states with skeletons, and serverless APIs deployed on Vercel.

### 🔗 Live Demo

👉 https://flight-search-engine-rouge.vercel.app

### 🧩 Features

🔍 Search flights by origin, destination, and departure date

✈️ Autocomplete for airports and cities using Amadeus Locations API

### 🎚️ Filters by:

- Airline

- Number of stops

- Maximum price

📊 Interactive price chart

📋 Flights table with horizontal scroll

⏳ Skeleton loaders for better UX during API requests

⚠️ Error handling and empty states

📱 Fully responsive layout

### 🛠️ Tech Stack
React

TypeScript

Material UI (MUI)

Vite

Custom hooks for data fetching and filtering

Backend (Serverless)

Vercel Serverless Functions

Amadeus Self-Service API

Node.js

### 🗂️ Project Structure
├── api/<br>
│   └── amadeus/ <br>
│       ├── token.ts          # Fetches OAuth token from <br>Amadeus<br>
│       ├── flight-offers.ts  # Flight search endpoint<br>
│       └── locations.ts      # Airport / city autocomplete<br>
│<br>
├── lib/<br>
│   └── amadeusToken.ts       # Shared token logic(server-side)<br>
│<br>
├── src/<br>
│   ├── components/<br>
│   │   ├── SearchForm<br>
│   │   ├── FiltersPanel<br>
│   │   ├── FlightsTable<br>
│   │   ├── PriceChart<br>
│   │   └── Skeletons<br>
│   ├── hooks/<br>
│   │   ├── useFlightsSearch<br>
│   │   └── useFlightFilters<br>
│   ├── types/<br>
│   └── utils/<br>
│<br>
└── vercel.json<br>

### 🔐 Environment Variables

Create the following environment variables in Vercel or a local .env file:

AMADEUS_CLIENT_ID=your_client_id
AMADEUS_CLIENT_SECRET=your_client_secret

### 🚀 Running Locally
- install dependencies: <br>
$ npm install

- start local dev server<br>
$ vercel dev


The project uses Vercel Serverless Functions, so vercel dev is required instead of npm run dev.

### ⚠️ Important Notes

Dates earlier than today are validated to prevent API errors.

Serverless functions must not import from other /api routes — shared logic lives in /lib.

File and import letter casing must match exactly (important for Linux/Vercel environments).

### 🧠 What This Project Demonstrates

Real-world API integration

Frontend architecture with hooks and separation of concerns

UX best practices (loading states, skeletons, empty states)

Debugging production-only issues (Vercel, serverless, ESM, casing)

Clean and maintainable codebase

### 👩‍💻 Author

Emily July Gomes Domingos <br>
Frontend / Fullstack Software Engineer <br>
🇧🇷 Brazil | 🌍 Remote-friendly