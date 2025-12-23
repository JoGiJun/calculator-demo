import UIController from './ui/UIController.js';
import ThemeManager from './ui/ThemeManager.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme
    new ThemeManager();

    // Initialize Calculator UI
    new UIController();

    // Log for debugging
    console.log('Calculator App Initialized');
});
