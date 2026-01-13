# Equine Integration - Veterinarian Dashboard POC #2

A single-page, interactive, mobile-first medical dashboard for veterinarians to view and manage horse health data.

## Features

- **Patient Summary**: Current condition, active cases, recovery score, and visit information
- **Active Cases Management**: View and manage active medical cases with detailed treatment plans
- **Vitals & Trends**: Interactive charts for heart rate, temperature, recovery score, and inflammation index
- **Medical Timeline**: Chronological view of all medical events with detailed information
- **Alerts System**: Actionable alerts with recommended next steps and metric history
- **Upcoming Schedule**: Manage upcoming events with acknowledge functionality

## Tech Stack

- React + TypeScript + Vite
- TailwindCSS for styling
- Recharts for data visualization
- lucide-react for icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Project Structure

```
src/
  ├── components/          # React components
  │   ├── VetDashboard.tsx
  │   ├── HeaderControls.tsx
  │   ├── PatientSummaryCards.tsx
  │   ├── ActiveCasesList.tsx
  │   ├── CaseDetailDrawer.tsx
  │   ├── VitalsTrends.tsx
  │   ├── MedicalTimeline.tsx
  │   ├── TimelineEventDetailDrawer.tsx
  │   ├── AlertsList.tsx
  │   ├── AlertDetailDrawer.tsx
  │   └── UpcomingSchedule.tsx
  ├── data/
  │   └── vetData.ts       # Dummy data models
  ├── utils/
  │   └── helpers.ts       # Utility functions
  ├── App.tsx
  ├── main.tsx
  └── index.css
```

## Usage

- **Horse Selector**: Use the dropdown in the header to switch between different horses
- **Time Range**: Toggle between 7D, 30D, and 6M to filter trend charts
- **Active Cases**: Click on any case card to view detailed treatment information
- **Medical Timeline**: Click on any timeline event to see full details
- **Alerts**: Click on alerts to view recommended next steps and metric history
- **Upcoming Events**: Click the circle icon to acknowledge upcoming events

## Design Principles

- **Clinical Aesthetic**: Clean, calm, high readability
- **Mobile-First**: Optimized for 375px mobile screens and desktop (≥1024px)
- **Color Usage**: Only for status and severity indicators (green/yellow/red)
- **Consistent Spacing**: Tailwind spacing scale with 16-24px outer padding, 16px card padding

## Build

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.