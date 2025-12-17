/* ==========================================
   PORTFOLIO MAIN JAVASCRIPT FILE
   All interactive features and animations
   ========================================== */

/* ==========================================
   TYPEWRITER EFFECT FOR MAIN HEADING
   ========================================== */

// The text we want to type out character by character
const typewriterText = "Kaushal Bhattarai";

// Get the element where we'll display the typing effect
const typewriterElement = document.getElementById('typewriter');

// Variable to keep track of which character we're on
let charIndex = 0;

// Speed of typing in milliseconds (lower = faster)
const typingSpeed = 100;

/**
 * Main typewriter function
 * This function types out one character at a time
 * and calls itself recursively until all characters are typed
 */
function typeWriter() {
    // Check if we haven't typed all characters yet
    if (charIndex < typewriterText.length) {
        // Add the next character to the element
        typewriterElement.textContent += typewriterText.charAt(charIndex);
        
        // Move to the next character
        charIndex++;
        
        // Call this function again after the typing speed delay
        setTimeout(typeWriter, typingSpeed);
    } else {
        // When typing is complete, add the gradient class for styling
        typewriterElement.classList.add('text-gradient');
    }
}

// Start the typewriter effect when the page loads
// Wait 500ms before starting for a better user experience
setTimeout(typeWriter, 500);

/* ==========================================
   DARK MODE / LIGHT MODE TOGGLE
   ========================================== */

// Get the theme toggle button element
const themeToggle = document.getElementById('theme-toggle');

// Get the current theme from localStorage (remembers user's choice)
// If no theme is saved, default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';

/**
 * Apply the theme to the document
 * @param {string} theme - Either 'light' or 'dark'
 */
function applyTheme(theme) {
    // Add or remove 'dark-mode' class on the body element
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.classList.add('dark');
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.classList.remove('dark');
    }
    
    // Save the user's theme preference to localStorage
    // This way it persists even after page refresh
    localStorage.setItem('theme', theme);
}

// Apply the saved theme when page loads
applyTheme(currentTheme);

/**
 * Toggle between light and dark themes
 * This function is called when the user clicks the theme toggle button
 */
themeToggle.addEventListener('click', () => {
    // Check current theme and switch to the opposite
    const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    
    // Apply the new theme
    applyTheme(newTheme);
});

/* ==========================================
   COLOR THEME SWITCHER GAME
   Interactive element that lets users customize colors
   ========================================== */

// Select all the HTML elements we need for the color game
const body = document.querySelector('body');
const colorInput = document.getElementById('color-picker');
const colorDiv = document.querySelector('.color-div');
const hiddenText = document.querySelector('.color-message');
const resetBtn = document.querySelector('.reset-button');
const playBtn = document.getElementById('play-game');

/**
 * Show the color picker game
 * Hides the "Play game" button and shows the color selector
 */
function playGame() {
    // Show the color picker container
    colorDiv.style.display = 'flex';
    
    // Hide the play button
    playBtn.style.display = 'none';
    
    // Smooth scroll to the color picker after a short delay
    // This ensures the element is visible before scrolling
    setTimeout(() => {
        colorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

/**
 * Apply the user's selected color to the page theme
 * Creates a custom gradient background based on the chosen color
 */
function changeColor() {
    // Get the color value the user selected
    const selectedColor = colorInput.value;
    
    // Convert the hex color to RGB values for lightness calculation
    // This helps us create appropriate color variations
    const r = parseInt(selectedColor.substr(1,2), 16) / 255;
    const g = parseInt(selectedColor.substr(3,2), 16) / 255;
    const b = parseInt(selectedColor.substr(5,2), 16) / 255;
    
    // Calculate the lightness of the color (0 to 1)
    // This determines if the color is light or dark
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    
    // Update CSS custom properties with the selected color
    document.documentElement.style.setProperty('--gradient-start', selectedColor);
    document.documentElement.style.setProperty('--color-link', selectedColor);
    
    // Create a subtle gradient background
    // Use lighter opacity for light colors, darker opacity for dark colors
    if (l > 0.5) {
        // For light colors, use very subtle background
        body.style.background = `linear-gradient(135deg, ${selectedColor}15 0%, ${selectedColor}05 100%)`;
    } else {
        // For dark colors, use slightly less subtle background
        body.style.background = `linear-gradient(135deg, ${selectedColor}10 0%, ${selectedColor}03 100%)`;
    }
    
    // Show the reset button so user can go back to default
    resetBtn.style.display = 'flex';
    
    // Show the success message
    hiddenText.style.display = 'block';
    
    // Hide the color input (they've already picked a color)
    colorInput.style.display = 'none';
    
    // Trigger a fun confetti celebration
    createConfetti();
}

/**
 * Reset everything back to default theme
 * Removes custom colors and shows the play button again
 */
function resetColor() {
    // Reset background to white (or dark mode background if in dark mode)
    if (document.body.classList.contains('dark-mode')) {
        body.style.background = 'var(--bg-primary)';
    } else {
        body.style.background = 'white';
    }
    
    // Reset CSS custom properties to original values
    document.documentElement.style.setProperty('--gradient-start', '#9580ff');
    document.documentElement.style.setProperty('--color-link', '#2563eb');
    
    // Reset the color picker to default blue
    colorInput.value = '#0084ff';
    
    // Show the color input again
    colorInput.style.display = 'block';
    
    // Show the play button
    playBtn.style.display = 'block';
    
    // Hide success message
    hiddenText.style.display = 'none';
    
    // Hide reset button
    resetBtn.style.display = 'none';
    
    // Hide entire color picker container
    colorDiv.style.display = 'none';
}

/**
 * Create a confetti celebration effect
 * Spawns multiple colored particles that animate outward from center
 */
function createConfetti() {
    // Array of colors for the confetti particles
    const colors = ['#9580ff', '#80ffea', '#2563eb', '#60a5fa'];
    
    // Create 15 confetti particles
    for (let i = 0; i < 15; i++) {
        // Stagger the creation of each particle for a cascading effect
        setTimeout(() => {
            // Create a new div element for each confetti piece
            const confetti = document.createElement('div');
            
            // Style the confetti particle
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                top: 50%;
                left: 50%;
                pointer-events: none;
                z-index: 9999;
            `;
            
            // Add the confetti to the page
            document.body.appendChild(confetti);
            
            // Calculate random direction and velocity for this particle
            const angle = (Math.random() * 360) * (Math.PI / 180); // Random angle in radians
            const velocity = 100 + Math.random() * 100; // Random speed
            const tx = Math.cos(angle) * velocity; // X distance
            const ty = Math.sin(angle) * velocity; // Y distance
            
            // Animate the confetti particle
            confetti.animate([
                // Start position: center, full size, fully visible
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                // End position: moved to calculated position, scaled down, invisible
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000, // Animation lasts 1 second
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Smooth easing
            });
            
            // Remove the confetti element from DOM after animation completes
            setTimeout(() => confetti.remove(), 1000);
        }, i * 30); // Stagger each confetti by 30ms
    }
}

/* ==========================================
   SMOOTH SCROLLING FOR ANCHOR LINKS
   ========================================== */

/**
 * Add smooth scrolling behavior to all internal anchor links
 * This creates a better user experience than default jump scrolling
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Prevent default jump behavior
        e.preventDefault();
        
        // Find the target element
        const target = document.querySelector(this.getAttribute('href'));
        
        // If target exists, smoothly scroll to it
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

/* ==========================================
   SCROLL REVEAL ANIMATIONS
   Elements fade in and slide up as they enter viewport
   ========================================== */

// Configuration for the Intersection Observer
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -100px 0px' // Trigger 100px before element enters viewport
};

/**
 * Create an Intersection Observer to watch for elements entering viewport
 * When an element becomes visible, we animate it in
 */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Check if the element is now visible
        if (entry.isIntersecting) {
            // Make element visible and slide it up into position
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

/**
 * Select all elements we want to animate on scroll
 * and prepare them for animation
 */
document.querySelectorAll('.project-card, .skill-category, .timeline-item').forEach(el => {
    // Start with element invisible and pushed down
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    
    // Add smooth transition properties
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Start observing this element
    observer.observe(el);
});