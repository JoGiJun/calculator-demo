# 🧮 Modern Component-Based Engineering Calculator

A fully functional, web-based engineering calculator built with vanilla JavaScript and modern web technologies. Designed with a focus on modular architecture (SOLID principles), clean UI/UX, and robust testing.

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://JoGiJun.github.io/calculator-demo/)
[![Build Status](https://github.com/JoGiJun/calculator-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/JoGiJun/calculator-demo/actions)

![Calculator Screenshot](./docs/screenshot.png) <!-- Replace with actual screenshot -->

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
