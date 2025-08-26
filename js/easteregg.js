document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTS ---
    const audio = document.getElementById('easter-egg-audio');
    const modalBackdrop = document.getElementById('easter-egg-modal-backdrop');
    const activationCountSpan = document.getElementById('activation-count');
    const closeModalButton = document.getElementById('close-modal-button');
    const pausePlayButton = document.getElementById('pause-play-button');
    const logo = document.querySelector('.logo');
    const invisibleTrigger = document.getElementById('invisible-trigger-zone');

    // --- STATE ---
    let activationCount = parseInt(localStorage.getItem('sonikActivationCount')) || 0;

    // --- MAIN ACTIVATION FUNCTION ---
    const activateEasterEgg = () => {
        // Update counter
        activationCount++;
        localStorage.setItem('sonikActivationCount', activationCount);
        activationCountSpan.textContent = activationCount;

        // Show modal
        modalBackdrop.classList.remove('hidden');
        modalBackdrop.classList.add('visible');

        // Play audio
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(error => console.error("Error playing audio:", error));
            pausePlayButton.textContent = 'Pausar';
        }
    };

    // --- TRIGGER 1: KONAMI CODE ---
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // --- TRIGGER 2: LOGO CLICKS ---
    let clickCount = 0;
    let clickTimer = null;
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 3000); // 3 second window
        }
        if (clickCount === 5) {
            activateEasterEgg();
            clickCount = 0;
            clearTimeout(clickTimer);
        }
    });

    // --- TRIGGER 3: INVISIBLE ZONE ---
    invisibleTrigger.addEventListener('click', activateEasterEgg);

    // --- MODAL CONTROLS ---
    closeModalButton.addEventListener('click', () => {
        modalBackdrop.classList.remove('visible');
        modalBackdrop.classList.add('hidden');
    });

    pausePlayButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            pausePlayButton.textContent = 'Pausar';
        } else {
            audio.pause();
            pausePlayButton.textContent = 'Reanudar';
        }
    });

    // Close modal if backdrop is clicked
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
            closeModalButton.click();
        }
    });
});