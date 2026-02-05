
# Trading and Investment Analytics Dashboard

## Overview

A comprehensive dashboard for tracking and analyzing trading and investment performance. The application features a modern, dark-themed interface with a sidebar for easy navigation between different analytics pages.

## Design and Features

### Visuals

*   **Theme:** Dark theme with a blue accent color.
*   **Typography:** Clean, sans-serif fonts for readability.
*   **Iconography:** Using `lucide-react` for modern and clean icons.
*   **Layout:** A sidebar layout for navigation and a main content area for the dashboard pages.

### Implemented Features

*   **Modern UI:** Dark theme with a blue accent color, clean typography, and modern icons from `lucide-react`.
*   **Navigation:** A responsive sidebar for easy navigation.
*   **Authentication:**
    *   Secure user signup and login with Firebase Authentication.
    *   Protected routes that require authentication.
    *   Sign-out functionality.
    *   `AuthContext` and `useAuth` hook for global state management.
*   **Firestore Database:**
    *   Firestore is integrated for data storage.
*   **Journal:**
    *   Users can create, view, and delete journal entries for Trades, ETFs, and Mutual Funds.
    *   Journal entries are stored in Firestore and are user-specific.
*   **Analytics Pages:**
    *   Dashboard, Trading Analytics, ETF Analytics, and Mutual Fund Analytics pages have been created with a consistent layout.
*   **Data & Analytics:**
    *   Integrated the Alpha Vantage API to fetch real-time and historical financial data.
    *   Implemented a candlestick chart with volume data using `lightweight-charts` to visualize stock data.
    *   The chart now displays a 50-day moving average.
*   **Trading Analytics:**
    *   Users can manually add their winning and losing trades.
    *   The dashboard dynamically calculates and displays key performance metrics: `Total Trades`, `Win Rate`, `Average Gain`, and `Average Loss`.
    *   A trade history list displays all entered trades.
    *   Trade data is persisted in Firestore and is user-specific.
*   **AI Assistant:**
    *   An AI assistant provides basic insights and recommendations based on the user's trading data.

## Current Plan

- No new features are planned at the moment. The application is now complete.

## Completed Tasks

*   **Alpha Vantage Integration:** Integrated the Alpha Vantage API to fetch financial data.
*   **Charting Library:** Replaced `recharts` with `lightweight-charts` for better performance and more advanced charting capabilities.
*   **Chart Implementation:** Implemented a candlestick chart with volume data to display stock prices over time.
*   **Dependency Management:** Resolved dependency conflicts and updated packages to the latest versions.
*   **Trading Analytics:** Implemented a feature to manually add trades and view key performance metrics.
*   **Persist Trade Data:** Stored and retrieved trade data from Firestore to persist it across sessions.
*   **Refine Charting:** Added a 50-day moving average to the candlestick chart.
*   **AI Assistant:** Implemented an AI assistant to provide insights and recommendations based on user data.
