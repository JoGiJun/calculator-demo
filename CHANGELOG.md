# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-12-23

### 🚀 Added
-   **Scientific Calculator Engine**: Complete support for basic arithmetic, trigonometry, logs, and powers.
-   **Expression Parser**: Robust shunting-yard algorithm implementation with implicit multiplication support.
-   **UI/UX**:
    -   Glassmorphism design with Tailwind CSS.
    -   Responsive layout for mobile and desktop.
    -   Smooth Dark/Light mode switching.
-   **History Feature**: Persisted calculation history with restore capability.
-   **Settings**: User-configurable precision and default angle mode.
-   **Advanced Ops**: Percentage (`%`) and Smart Sign Toggle (`+/-`).
-   **CI/CD**: Automated build and deployment workflow via GitHub Actions.

### 🔧 Changed
-   Migrated ESLint configuration to the new Flat Config system (v9).
-   Optimized project structure for better separation of concerns (Core vs UI).
