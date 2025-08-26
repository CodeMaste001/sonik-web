document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const introSound = document.getElementById('intro-sound');

    // A single source of truth for the total duration
    const totalDuration = 10000; // 10 seconds

    let animationTimeout;

    const hideSplashScreen = () => {
        // Prevent multiple calls
        if (splashScreen.classList.contains('hidden')) return;

        splashScreen.classList.add('hidden');
        document.body.classList.remove('splash-active');

        // Clean up the timeout just in case
        clearTimeout(animationTimeout);

        // Optional: remove the splash screen from DOM after transition
        setTimeout(() => {
            splashScreen.remove();
        }, 1500);
    };

    const startAnimation = () => {
        document.body.classList.add('splash-active');

        // Play sound
        introSound.play().catch(e => console.log("Intro sound could not be played automatically."));

        // Set a single timeout to hide the splash screen after the full duration
        animationTimeout = setTimeout(hideSplashScreen, totalDuration);
    };

    // --- Event Listeners ---
    // Skip functionality
    splashScreen.addEventListener('click', hideSplashScreen);

    // Start the sequence
    startAnimation();
});