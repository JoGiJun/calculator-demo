# 🧮 Modern Bionic Calculator (Portfolio Project)

> **"Not just a calculator, but a demonstration of Solid Engineering Principles."**

This project is a high-fidelity **Engineering Calculator** designed to demonstrate advanced **Frontend Engineering** skills. Built with **Vanilla JavaScript** (ES Modules) without heavy reliance on UI frameworks like React or Vue, it showcases a deep understanding of:

-   **Software Architecture**: Strictly follows **MVC Pattern** and **SOLID Principles**.
-   **Quality Assurance**: Developed using **TDD (Test-Driven Development)** with 100% core logic coverage.
-   **Modern UX**: Features glassmorphism design, fluid animations, and robust input validation.

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://JoGiJun.github.io/calculator-demo/)
[![Build Status](https://github.com/JoGiJun/calculator-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/JoGiJun/calculator-demo/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Calculator Screenshot](./docs/screenshot.png)

## 🎯 Design Philosophy & Technical Highlights

This project was built to prove that **scalable, maintainable code** can be written without frameworks by sticking to fundamental engineering principles.

### 1. Zero-Framework Architecture
Instead of using React/Vue, I implemented a custom **Component-Based MVC** architecture.
-   **Why?** To demonstrate mastery of the DOM API, Event Delegation, and State Management fundamentals.

### 2. Test-Driven Development (TDD)
Every feature started with a failing test. core logic is rigorously tested using **Jest**.
-   **Coverage**: Unit tests cover implementations of Parser (Shunting-yard algorithm), Validators, and Operations.

### 3. SOLID Principles in Action
-   **Single Responsibility**: Separated `Parser`, `Validator`, `Formatter`, and `Calculator` classes.
-   **Open/Closed**: New operations (e.g., `sin`, `log`) can be added by extending the `Operation` class without modifying the calculator core.
-   **Dependency Inversion**: High-level modules depend on abstractions (interfaces), not concrete implementations.

## ✨ Key Features

-   **Scientific Operations**: Trigonometry (sin, cos, tan), Logarithms (log, ln), Powers, Roots, and more.
-   **Advanced History**: Slide-over panel to view, restore, and manage calculation history.
-   **Smart Editing**:
    -   **Detailed Input Validation**: Prevents invalid syntax before calculation.
    -   **Smart Editing**:
        -   **Auto-Parentheses**: Automatically handles closing parentheses for functions.
        -   **Visual Formatting**: Enhanced display for scientific symbols like Square Root.
    -   **Context-Aware Toggles**: Smart `+/-` sign toggling and percentage calculations.
-   **Customization**:
    -   **Dark/Light Theme**: Automatically respects system preference, with manual toggle.
    -   **Configurable Settings**: Adjust default angle mode (DEG/RAD) and decimal precision.
-   **Responsive Design**: Glassmorphism-inspired UI that works seamlessly on desktop and mobile.

## 🛠️ Technology Stack

-   **Core**: HTML5, CSS3, JavaScript (ES Modules)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
-   **Build Tool**: [Vite](https://vitejs.dev/) for fast development and optimized production builds.
-   **Testing**: [Jest](https://jestjs.io/) for Unit and Integration testing (TDD approach).
-   **Linting**: ESLint (v9 Flat Config) + Prettier.
-   **CI/CD**: GitHub Actions for automated deployment.

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18 or higher)
-   npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/calculator-demo.git

# Navigate to directory
cd calculator-demo

# Install dependencies
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

### Build

Create an optimized production build:

```bash
npm run build
```

The output will be in the `dist` directory.

### Testing

Run the test suite:

```bash
npm test
```

## 🏗️ Architecture

The project follows a component-based **Model-View-Controller (MVC)** pattern:

-   **Core (Model)**: Pure logic handling calculations, operations, and parsing.
    -   `Calculator`: Main entry point.
    -   `ExpressionParser`: Tokenizes and parses infix expressions to RPN.
    -   `Operation`: Abstract base for all math operations.
-   **UI (View/Controller)**: Handles DOM interaction and user events.
    -   `UIController`: Orchestrates interactions.
    -   `DisplayManager`: Renders state to the screen.
    -   `ThemeManager`, `HistoryController`, `SettingsController`: Manage specific sub-features.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
