# 🐴 Equine Integration - Veterinarian Dashboard

A modern, interactive medical dashboard for veterinarians to monitor and manage equine health data. Built with React, TypeScript, and cutting-edge 3D visualization capabilities.

![Version](https://img.shields.io/badge/version-0.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Development](#development)
- [Build & Deployment](#build--deployment)

## 🎯 Overview

This veterinarian dashboard provides a comprehensive, single-page interface for managing equine patient health data. It combines traditional medical record visualization with innovative 3D injury mapping and interactive metric exploration.

### Key Highlights

- **Real-time Health Monitoring**: Track vital signs, recovery scores, and inflammation indices
- **3D Injury Visualization**: Interactive 3D horse model with color-coded injury mapping
- **Expandable Metrics**: Click any metric to view detailed information in a centered modal
- **Mobile-First Design**: Optimized for both mobile devices and desktop screens
- **Clinical Aesthetic**: Clean, professional interface designed for medical professionals

## ✨ Features

### Core Functionality

- **📊 Patient Summary Cards**
  - Current condition assessment with color-coded status indicators
  - Active cases count with severity levels
  - Recovery score tracking (0-100 scale)
  - Visit history and upcoming appointments

- **🏥 Active Cases Management**
  - Detailed case information with diagnosis and treatment plans
  - Medication tracking with dosage and frequency
  - Status monitoring (active, monitoring, resolved)
  - Next review date tracking

- **📈 Vitals & Trends**
  - **Resting Heart Rate**: Track BPM trends over time
  - **Temperature**: Monitor body temperature (°C) with normal range indicators
  - **Recovery Score**: Visualize recovery progress (0-100)
  - **Inflammation Index**: Track inflammation levels (0-10 scale)
  - Interactive charts with customizable time ranges (7D, 30D, 6M)

- **🕐 Medical Timeline**
  - Chronological view of all medical events
  - Event types: Injuries, Treatments, Medications, Vaccinations, Checkups
  - Detailed event information with clinician notes
  - Attachment support for reports and images

- **🚨 Alerts System**
  - Severity-based alert categorization (low, med, high)
  - Metric history visualization
  - Recommended next steps for each alert
  - Actionable insights for veterinarians

- **📅 Upcoming Schedule**
  - Event management with priority levels
  - Acknowledge functionality for completed tasks
  - Follow-up reminders and vaccination schedules

### Advanced Features

- **🎨 3D Injury Visualization**
  - Interactive 3D horse model using Three.js
  - Color-coded injury mapping:
    - 🔴 Red: High severity injuries
    - 🟠 Orange: Medium severity injuries
    - 🟡 Yellow: Low severity injuries
  - Automatic injury detection from medical history
  - Body part mapping (shoulders, legs, knees, ankles, hips, neck, back)
  - Rotating 3D model with zoom and pan controls

- **📊 Expandable Metric Details**
  - Click any metric card or chart to view comprehensive details
  - Centered modal with:
    - Statistical summaries (current, average, min, max)
    - Full historical trend charts
    - Normal range information
    - Clinical interpretations
  - Available for:
    - Current Condition
    - Active Cases
    - Recovery Score
    - Visit History
    - All vital signs metrics

## 🛠 Tech Stack

### Frontend Framework
- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type-safe development
- **Vite 5.0.8** - Fast build tool and dev server

### Styling
- **TailwindCSS 3.3.6** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Data Visualization
- **Recharts 2.10.3** - Chart library for React
  - Line charts for trends
  - Area charts for filled visualizations
  - Responsive container support

### 3D Visualization
- **Three.js 0.158.0** - 3D graphics library
- **@react-three/fiber 8.15.11** - React renderer for Three.js
- **@react-three/drei 9.88.13** - Useful helpers for react-three-fiber

### Icons & UI
- **lucide-react 0.294.0** - Beautiful icon library

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** (v7 or higher) or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Data-Visualisation-EquineIntegration-No2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to the URL shown in the terminal (typically `http://localhost:5173`)
   - The app will automatically reload when you make changes

### Quick Start Example

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
Data-Visualisation-EquineIntegration-No2/
├── src/
│   ├── components/              # React components
│   │   ├── VetDashboard.tsx     # Main dashboard container
│   │   ├── HeaderControls.tsx   # Horse selector and time range controls
│   │   ├── PatientSummaryCards.tsx  # Summary metric cards
│   │   ├── ActiveCasesList.tsx  # Active cases display
│   │   ├── CaseDetailDrawer.tsx # Case detail sidebar
│   │   ├── VitalsTrends.tsx    # Vital signs charts
│   │   ├── MedicalTimeline.tsx  # Medical event timeline
│   │   ├── TimelineEventDetailDrawer.tsx  # Event detail sidebar
│   │   ├── AlertsList.tsx      # Alerts display
│   │   ├── AlertDetailDrawer.tsx  # Alert detail sidebar
│   │   ├── UpcomingSchedule.tsx # Upcoming events
│   │   ├── Horse3DVisualization.tsx  # 3D injury visualization
│   │   └── MetricDetailModal.tsx  # Expandable metric details modal
│   ├── data/
│   │   └── vetData.ts           # Data models and dummy data
│   ├── utils/
│   │   └── helpers.ts           # Utility functions
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── tailwind.config.js           # TailwindCSS configuration
└── README.md                    # This file
```

## 📖 Usage Guide

### Navigating the Dashboard

1. **Select a Horse**
   - Use the dropdown in the header to switch between different patients
   - Each horse has unique medical history and vitals data

2. **Filter Time Range**
   - Toggle between **7D**, **30D**, and **6M** buttons
   - Affects all trend charts and vitals displays

3. **View Active Cases**
   - Click on any case card to open detailed information
   - View treatment plans, medications, and review dates

4. **Explore Medical Timeline**
   - Scroll through chronological medical events
   - Click any event to view full details, notes, and attachments

5. **Review Alerts**
   - Click alerts to see metric history and recommended actions
   - Color-coded by severity (red/orange/yellow)

6. **Manage Schedule**
   - View upcoming appointments and events
   - Click the circle icon to acknowledge completed items

### 3D Injury Visualization

- **View Injuries**: The 3D model automatically highlights injured body parts
- **Color Coding**:
  - Red = High severity
  - Orange = Medium severity
  - Yellow = Low severity
- **Interact**: Rotate, zoom, and pan the model using mouse/touch controls
- **Injury List**: View detected injuries and recent injury events below the model

### Expandable Metrics

- **Click any metric card** (Current Condition, Active Cases, Recovery Score, Visits)
- **Click any chart** (Resting HR, Temperature, Recovery Score, Inflammation Index)
- **View detailed information**:
  - Statistical summaries
  - Full historical trends
  - Clinical interpretations
  - Normal range information
- **Close modal**: Click outside or press the X button

## 💻 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type check without building
npx tsc --noEmit
```

### Code Style

- **TypeScript**: Strict mode enabled
- **Components**: Functional components with hooks
- **Styling**: TailwindCSS utility classes
- **Formatting**: Follow React and TypeScript best practices

### Key Design Principles

- **Clinical Aesthetic**: Clean, calm interface with high readability
- **Mobile-First**: Optimized for 375px+ mobile screens
- **Responsive**: Scales beautifully to desktop (≥1024px)
- **Color Usage**: Reserved for status and severity indicators
- **Consistent Spacing**: 16-24px outer padding, 16px card padding

### Data Models

The application uses TypeScript interfaces for type safety:

- `Horse` - Patient information
- `VitalsReading` - Vital signs data
- `MedicalHistoryEvent` - Medical events
- `ActiveCase` - Current medical cases
- `Alert` - Health alerts
- `UpcomingEvent` - Scheduled events

See `src/data/vetData.ts` for complete type definitions.

## 🏗 Build & Deployment

### Production Build

```bash
npm run build
```

This will:
1. Run TypeScript type checking
2. Build optimized production bundle
3. Output to `dist/` directory

### Build Output

- `dist/index.html` - Entry HTML file
- `dist/assets/` - Optimized JavaScript and CSS bundles
- All assets are minified and optimized for production

### Deployment

The `dist/` directory contains all static files needed for deployment. You can deploy to:

- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: Cloudflare, AWS CloudFront
- **Web Server**: Nginx, Apache

### Environment Variables

Currently, no environment variables are required. All data is mock data in `src/data/vetData.ts`.

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      accent: '#your-color',
      // ...
    }
  }
}
```

### Adding New Metrics

1. Add data to `src/data/vetData.ts`
2. Create component in `src/components/`
3. Add to `VetDashboard.tsx`
4. Create detail view in `MetricDetailModal.tsx` if needed

## 📝 License

This project is part of the Equine Integration POC series. Please refer to your organization's licensing terms.

## 🤝 Contributing

This is a proof-of-concept project. For production use, consider:

- Adding real API integration
- Implementing authentication
- Adding data persistence
- Expanding 3D model capabilities
- Adding more metric types

## 📞 Support

For questions or issues, please refer to your development team or project maintainer.

---

**Built with ❤️ for equine veterinary care**
