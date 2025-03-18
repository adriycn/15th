// Global variables
let currentSection = 'password-section';
let password = '';
const correctPassword = '0318';
let currentMessageIndex = 0;
let jabeeClickCount = 0;
let activeDragElement = null;
let offsetX = 0;
let offsetY = 0;

// Audio elements
const backgroundMusic = document.getElementById('background-music');
const effectSound = document.getElementById('effect-sound');

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initPasswordSection();
    initKeyboardControls();
    initDraggableStickers();
});

// Initialize password section
function initPasswordSection() {
    const numButtons = document.querySelectorAll('.num-btn');
    const passwordDisplay = document.getElementById('password-display');

    numButtons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-num');
            
            if (value === 'clear') {
                password = '';
                passwordDisplay.textContent = '****';
            } else if (value === 'enter') {
                checkPassword();
            } else {
                if (password.length < 4) {
                    password += value;
                    updatePasswordDisplay();
                }
            }
        });
    });
}

// Update password display with asterisks
function updatePasswordDisplay() {
    const passwordDisplay = document.getElementById('password-display');
    let display = '';
    
    for (let i = 0; i < 4; i++) {
        if (i < password.length) {
            display += '*';
        } else {
            display += '*';
        }
    }
    
    passwordDisplay.textContent = display;
}

// Check if the entered password is correct
function checkPassword() {
    const passwordDisplay = document.getElementById('password-display');
    const sleepyPenguin = document.getElementById('sleepy-penguin');
    const awakePenguin = document.getElementById('awake-penguin');
    const successMessage = document.getElementById('success-message');
    
    if (password === correctPassword) {
        // Password is correct
        passwordDisplay.classList.add('glow');
        sleepyPenguin.style.opacity = '0';
        awakePenguin.style.opacity = '1';
        successMessage.style.opacity = '1';
        
        // Play background music with fade-in
        backgroundMusic.volume = 0;
        backgroundMusic.play();
        
        const fadeIn = setInterval(() => {
            if (backgroundMusic.volume < 0.7) {
                backgroundMusic.volume += 0.05;
            } else {
                clearInterval(fadeIn);
            }
        }, 100);
        
        // Transition to the next section after a delay
        setTimeout(() => {
            transitionToSection('frame-section');
            initFrameSection();
        }, 2000);
    } else {
        // Password is incorrect
        passwordDisplay.classList.add('shake');
        setTimeout(() => {
            passwordDisplay.classList.remove('shake');
            password = '';
            updatePasswordDisplay();
        }, 500);
    }
}

// Initialize the frame section with animations
function initFrameSection() {
    // Add confetti effect
    createConfetti();
    
    // Animate dates
    setTimeout(() => {
        const date1 = document.getElementById('date-1');
        date1.classList.add('active');
        
        setTimeout(() => {
            date1.classList.remove('active');
            
            setTimeout(() => {
                const date2 = document.getElementById('date-2');
                date2.classList.add('active');
                
                setTimeout(() => {
                    const birthdayMessage = document.getElementById('birthday-message');
                    birthdayMessage.classList.add('active');
                    
                    // Transition to the next section after a delay
                    setTimeout(() => {
                        transitionToSection('choice-section');
                        initChoiceSection();
                    }, 3000);
                }, 1500);
            }, 500);
        }, 2000);
    }, 1000);
}

// Create confetti effect - FIXED to spread across the screen
function createConfetti() {
    const frameSection = document.getElementById('frame-section');
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random position, color, size and animation duration
        // FIXED: Spread across the whole width instead of a line
        const left = Math.random() * 100;
        const size = Math.random() * 8 + 5;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        
        // More color variation
        const colorTypes = [
            `hsl(${Math.random() * 60 + 330}, 100%, 75%)`, // Pink/purple
            `hsl(${Math.random() * 60}, 100%, 75%)`, // Yellow/orange
            `hsl(${Math.random() * 60 + 180}, 100%, 75%)`, // Green/blue
            `hsl(${Math.random() * 30 + 15}, 100%, 85%)` // Gold/yellow
        ];
        const color = colorTypes[Math.floor(Math.random() * colorTypes.length)];
        
        // More shape variations
        const shapes = ['50%', '0%']; // Circle or square
        const borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
        
        confetti.style.left = `${left}%`;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.borderRadius = borderRadius;
        confetti.style.animationDuration = `${duration}s`;
        confetti.style.animationDelay = `${delay}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        frameSection.appendChild(confetti);
    }
}

// Initialize the choice section with Mig vs Jabee game
function initChoiceSection() {
    const migImg = document.getElementById('mig');
    const jabeeImg = document.getElementById('jabee');
    const angryCat = document.getElementById('angry-cat');
    const minionMessage = document.getElementById('minion-message');
    
    // Reset variables
    jabeeClickCount = 0;
    
    migImg.addEventListener('click', function() {
        // If Mig is clicked, reset everything and show message
        jabeeClickCount = 0;
        jabeeImg.style.transform = '';
        jabeeImg.style.position = '';
        jabeeImg.style.top = '';
        jabeeImg.style.left = '';
        migImg.style.transform = 'scale(1)';
        
        // Show minion message
        showMinionCelebration();
    });
    
    jabeeImg.addEventListener('click', function() {
        jabeeClickCount++;
        
        // Move Jabee to random position
        const randomTop = Math.random() * 300 + 100;
        const randomLeft = Math.random() * 500 + 50;
        
        jabeeImg.style.transition = 'all 0.3s ease';
        jabeeImg.style.position = 'absolute';
        jabeeImg.style.top = `${randomTop}px`;
        jabeeImg.style.left = `${randomLeft}px`;
        
        // Make Mig bigger
        const scale = 1 + (jabeeClickCount * 0.1);
        migImg.style.transform = `scale(${scale})`;
        
        // Show angry cat falling
        angryCat.style.opacity = '1';
        angryCat.style.animation = 'drop 1s forwards';
        
        setTimeout(() => {
            angryCat.style.animation = '';
            angryCat.style.opacity = '0';
            angryCat.style.top = '-300px';
        }, 1000);
    });
}

// Show minion celebration
function showMinionCelebration() {
    const minionMessage = document.getElementById('minion-message');
    minionMessage.style.opacity = '1';
    
    // Create minion images
    const choiceSection = document.getElementById('choice-section');
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const minion = document.createElement('img');
            minion.src = '/img/minion.png';
            minion.classList.add('minion-celebration');
            
            const left = Math.random() * 80 + 10;
            const top = Math.random() * 80 + 10;
            
            minion.style.left = `${left}%`;
            minion.style.top = `${top}%`;
            minion.style.animation = 'celebrate 1.5s forwards';
            
            choiceSection.appendChild(minion);
            
            setTimeout(() => {
                minion.remove();
            }, 1500);
        }, i * 200);
    }
    
    // Transition to message section after a delay
    setTimeout(() => {
        transitionToSection('message-section');
        initMessageSection();
    }, 2000);
}

// Initialize message section with spacebar controls
function initMessageSection() {
    currentMessageIndex = 0;
    document.getElementById('space-prompt').style.opacity = '1';
    
    // Show the first message
    showNextMessage();
}

// Show next message when spacebar is pressed
function showNextMessage() {
    const messages = document.querySelectorAll('.message');
    const spacePrompt = document.getElementById('space-prompt');
    const gangsta = document.getElementById('gangsta');
    
    // Hide all messages
    messages.forEach(msg => {
        msg.classList.remove('active');
    });
    
    // If there are more messages to show
    if (currentMessageIndex < messages.length) {
        messages[currentMessageIndex].classList.add('active');
        currentMessageIndex++;
    } else {
        // Show gangsta message
        spacePrompt.style.opacity = '0';
        gangsta.classList.add('active');
        
        // Transition to the final section after a delay
        setTimeout(() => {
            transitionToSection('letter-section');
            initLetterSection();
        }, 3000);
    }
}
function randomizeStickersPosition() {
    const stickers = document.querySelectorAll('.sticker');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    stickers.forEach(sticker => {
        // Generate random positions within 80% of viewport to avoid edges
        const randomX = Math.random() * (viewportWidth * 0.8) + (viewportWidth * 0.1);
        const randomY = Math.random() * (viewportHeight * 0.8) + (viewportHeight * 0.1);
        
        // Apply random position
        sticker.style.left = `${randomX}px`;
        sticker.style.top = `${randomY}px`;
        
        // Make sure all stickers have pointer-events: all
        sticker.style.pointerEvents = 'all';
        
        // ADDED: Random rotation and scale for each sticker
        sticker.style.transform = `rotate(${Math.random() * 20 - 10}deg) scale(${1.0 + Math.random() * 0.3})`;
    });
}
// Initialize letter section with draggable stickers
function initLetterSection() {
    const letter = document.getElementById('letter');
    letter.classList.add('active');
    
    // Add sticker containers to the whole body
    const stickersContainer = document.getElementById('stickers-container');
    document.body.appendChild(stickersContainer);
    stickersContainer.style.position = 'fixed';
    stickersContainer.style.top = '0';
    stickersContainer.style.left = '0';
    stickersContainer.style.width = '100vw';
    stickersContainer.style.height = '100vh';
    stickersContainer.style.zIndex = '100';
    stickersContainer.style.pointerEvents = 'none';
    
    // Position stickers randomly across the screen
    randomizeStickersPosition();
}

// IMPROVED: Initialize draggable stickers with added effects
function initDraggableStickers() {
    const stickers = document.querySelectorAll('.sticker');
    
    stickers.forEach(sticker => {
        // Add hover effects to stickers
        sticker.addEventListener('mousedown', function(e) {
            activeDragElement = this;
            
            // FIXED: Accurate offset calculation
            const rect = activeDragElement.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            
            // Add active-drag class for styling
            this.classList.add('active-drag');
            
            // Change cursor and visual feedback
            this.style.cursor = 'grabbing';
            this.style.zIndex = '1000';
            
            // Play sound if sticker has associated sound
            const sound = this.getAttribute('data-sound');
            if (sound && sound !== '') {
                effectSound.src = sound;
                effectSound.play();
            }
            
            // Add custom event listeners to the document
            document.addEventListener('mousemove', dragMove);
            document.addEventListener('mouseup', dragEnd);
            
            // Prevent default behavior
            e.preventDefault();
        });
        
        // Add scaling effect on double click
        sticker.addEventListener('dblclick', function() {
            const currentScale = this.style.transform || '';
            
            if (currentScale.includes('scale(1.5)')) {
                this.style.transform = currentScale.replace('scale(1.5)', 'scale(1)');
            } else {
                this.style.transform = `${currentScale.replace(/scale\([^)]*\)/g, '')} scale(1.5)`;
            }
        });
    });
    
    // Add CSS for wiggle animation to the document
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes wiggle {
            0% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(5deg) scale(1.1); }
            50% { transform: rotate(-5deg) scale(1.1); }
            75% { transform: rotate(3deg) scale(1.05); }
            100% { transform: rotate(0deg) scale(1); }
        }
        
        .sticker {
            transition: transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease;
        }
    `;
    document.head.appendChild(style);
}

// FIXED: Helper function to drag stickers with accurate positioning
function dragMove(e) {
    if (activeDragElement) {
        // Calculate new position based on mouse position and offset
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        
        // FIXED: Allow stickers to move anywhere on screen
        activeDragElement.style.left = `${newX}px`;
        activeDragElement.style.top = `${newY}px`;
        
        // Add slight rotation while dragging for more dynamic feel
        const dragRotate = (Math.sin(Date.now() / 200) * 3);
        const currentTransform = activeDragElement.style.transform || '';
        const newTransform = currentTransform.replace(/rotate\([^)]*\)/g, `rotate(${dragRotate}deg)`);
        activeDragElement.style.transform = newTransform || `rotate(${dragRotate}deg)`;
    }
}

function dragEnd() {
    if (activeDragElement) {
        // Reset cursor and remove active class
        activeDragElement.style.cursor = 'grab';
        activeDragElement.classList.remove('active-drag');
        
        // Add bounce effect when dropped
        activeDragElement.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            activeDragElement.style.animation = '';
        }, 500);
        
        activeDragElement = null;
    }
    
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
}

// Initialize keyboard controls for spacebar
function initKeyboardControls() {
    document.addEventListener('keydown', function(e) {
        // If spacebar is pressed and message section is active
        if (e.code === 'Space' && currentSection === 'message-section' && !document.getElementById('gangsta').classList.contains('active')) {
            e.preventDefault();
            showNextMessage();
        }
    });
}

// Transition to a different section
function transitionToSection(sectionId) {
    // Hide current section
    document.getElementById(currentSection).classList.remove('active');
    
    // Show new section
    document.getElementById(sectionId).classList.add('active');
    
    // Update current section
    currentSection = sectionId;
}

// Helper function to generate random integers
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Add extra bounce animation for stickers
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes bounce {
            0% { transform: scale(1.2); }
            50% { transform: scale(0.9); }
            75% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});