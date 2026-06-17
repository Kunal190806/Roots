# Trace - Personal Carbon Footprint & Sustainability Tracker

Trace is a modern Next.js web application designed to help users track, analyze, and reduce their daily carbon footprint using intelligent AI-powered observations.

## Core Features

- **Intelligent Onboarding Assessment**: A dynamic setup to establish a baseline carbon footprint across lifestyle categories.
- **AI Impact Journal & Analyzer**: An AI tool that reasons through user-submitted logs of daily activities (meals, transport, energy) to predict real-time carbon equivalents.
- **Visual Impact Dashboard**: Clear, interactive visualizations that display historical data trends and current footprint distribution.
- **Personalized Swaps Engine**: Generative AI suggestions for sustainable swaps and habit changes tailored to individual goals.
- **Adaptive Goal Tracker**: A smart system that adjusts daily reduction targets based on historical performance.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database / Auth**: Firebase Firestore & Firebase Auth
- **AI Engine**: Google Genkit & Gemini API
- **Styling**: Tailwind CSS & Tailwind CSS Animate
- **UI Components**: Radix UI (via shadcn/ui)
- **Charts**: Recharts

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Gemini API Key and Firebase configuration details:
   ```env
   GEMINI_API_KEY=your-gemini-api-key
   NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) in your browser to view the application.
