
// Professional Interactive Elements for Ripple Code Ebook
class RippleCodeApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.setupProgressTracking();
        this.loadSavedProgress();
    }

    init() {
        this.setupRippleSimulator();
        this.setupNavigationHighlight();
        this.setupMobileMenu();
        this.setupInteractiveElements();
    }

    bindEvents() {
        // Ripple simulator
        const simulator = document.getElementById('rippleSimulator');
        if (simulator) {
            simulator.addEventListener('click', this.createRipple.bind(this));
        }

        // Interactive game elements
        document.querySelectorAll('.game-item').forEach(item => {
            item.addEventListener('click', this.handleGameInteraction.bind(this));
        });

        // Mobile menu toggle
        const menuBtn = document.querySelector('.mobile-menu-btn');
        if (menuBtn) {
            menuBtn.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', this.smoothScroll.bind(this));
        });
    }

    setupRippleSimulator() {
        const simulator = document.getElementById('rippleSimulator');
        if (!simulator) return;

        // Create initial ripple text
        const rippleText = document.createElement('div');
        rippleText.id = 'rippleText';
        rippleText.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.2rem;
            color: rgba(255,255,255,0.9);
            text-align: center;
            pointer-events: none;
            z-index: 10;
        `;
        rippleText.innerHTML = 'Click to create<br>a ripple effect';
        simulator.appendChild(rippleText);
    }

    createRipple(event) {
        const simulator = event.currentTarget;
        const rect = simulator.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Create ripple element
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.left = (x - 10) + 'px';
        ripple.style.top = (y - 10) + 'px';

        simulator.appendChild(ripple);

        // Update text
        const rippleText = document.getElementById('rippleText');
        if (rippleText) {
            rippleText.innerHTML = 'Ripple Created!<br><small>Watch it expand...</small>';

            setTimeout(() => {
                rippleText.innerHTML = 'Click anywhere<br>to create ripples';
            }, 2000);
        }

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 2500);

        // Add subtle feedback
        simulator.style.transform = 'scale(0.98)';
        setTimeout(() => {
            simulator.style.transform = 'scale(1)';
        }, 150);
    }

    handleGameInteraction(event) {
        const gameItem = event.currentTarget;
        const gameType = gameItem.dataset.gameType;

        // Remove active state from all items
        document.querySelectorAll('.game-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active state to clicked item
        gameItem.classList.add('active');

        // Show relevant content
        this.showGameContent(gameType);

        // Add interactive feedback
        this.addInteractiveFeedback(gameItem);
    }

    showGameContent(gameType) {
        const contentMap = {
            'cause': {
                title: '🎯 Understanding CAUSE',
                content: `
                    <p><strong>The origin point of every ripple.</strong> Can be intentional (a strategic decision) or unintentional (a casual remark).</p>
                    <div class="example-box">
                        <h4>Real-world Examples:</h4>
                        <ul>
                            <li><strong>Personal:</strong> You decide to skip morning coffee → Different energy level all day</li>
                            <li><strong>Business:</strong> CEO makes offhand comment → Stock price fluctuates</li>
                            <li><strong>Historical:</strong> Archduke Franz Ferdinand's driver takes wrong turn → World War I triggers</li>
                        </ul>
                    </div>
                    <p class="insight"><em>Key Insight:</em> The size of the cause rarely determines the size of the effect. Small causes in unstable systems create massive echoes.</p>
                `
            },
            'carrier': {
                title: '🌐 Understanding CARRIER',
                content: `
                    <p><strong>The medium that transports influence.</strong> Same cause through different carriers = dramatically different outcomes.</p>
                    <div class="carrier-comparison">
                        <div class="carrier-item">
                            <h5>Face-to-Face</h5>
                            <p>High fidelity, immediate feedback, emotional context preserved</p>
                        </div>
                        <div class="carrier-item">
                            <h5>Digital Text</h5>
                            <p>Fast, scalable, but loses tone and nuance</p>
                        </div>
                        <div class="carrier-item">
                            <h5>Social Media</h5>
                            <p>Amplified reach, public context, potential for viral spread</p>
                        </div>
                    </div>
                    <p class="insight"><em>Strategic Principle:</em> Master your carriers. The same message through the right carrier can change everything.</p>
                `
            },
            'echo': {
                title: '🔄 Understanding ECHO',
                content: `
                    <p><strong>The system's inevitable response.</strong> Echoes are not optional—they always return, but timing and form vary.</p>
                    <div class="echo-types">
                        <div class="echo-type">
                            <h5>⚡ Immediate Echoes</h5>
                            <p>Direct responses within seconds to minutes</p>
                        </div>
                        <div class="echo-type">
                            <h5>⏰ Delayed Echoes</h5>
                            <p>Return after days, weeks, or months</p>
                        </div>
                        <div class="echo-type">
                            <h5>🌀 Distorted Echoes</h5>
                            <p>Return changed in form or intensity</p>
                        </div>
                        <div class="echo-type">
                            <h5>🎯 Compound Echoes</h5>
                            <p>Trigger new ripple chains</p>
                        </div>
                    </div>
                    <p class="insight"><em>Master's Insight:</em> Advanced practitioners learn to read echo patterns to predict system behavior.</p>
                `
            }
        };

        const content = contentMap[gameType];
        if (!content) return;

        // Find or create content display area
        let displayArea = document.getElementById('gameContentDisplay');
        if (!displayArea) {
            displayArea = document.createElement('div');
            displayArea.id = 'gameContentDisplay';
            displayArea.className = 'game-content-display fade-in';
            displayArea.style.cssText = `
                background: white;
                padding: 2rem;
                border-radius: 8px;
                margin-top: 2rem;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                border-left: 4px solid var(--primary-blue);
            `;

            // Insert after game container
            const gameContainer = document.querySelector('.game-container');
            gameContainer.parentNode.insertBefore(displayArea, gameContainer.nextSibling);
        }

        displayArea.innerHTML = `
            <h3>${content.title}</h3>
            ${content.content}
        `;

        // Smooth scroll to content
        displayArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Add CSS for styling
        if (!document.getElementById('gameContentStyles')) {
            const style = document.createElement('style');
            style.id = 'gameContentStyles';
            style.textContent = `
                .example-box, .carrier-comparison, .echo-types {
                    background: #f8f9fa;
                    padding: 1.5rem;
                    border-radius: 6px;
                    margin: 1rem 0;
                }
                .carrier-item, .echo-type {
                    background: white;
                    padding: 1rem;
                    border-radius: 4px;
                    margin: 0.5rem 0;
                    border-left: 3px solid var(--primary-blue);
                }
                .carrier-item h5, .echo-type h5 {
                    margin: 0 0 0.5rem 0;
                    color: var(--primary-blue);
                }
                .insight {
                    background: linear-gradient(135deg, #e3f2fd, #bbdefb);
                    padding: 1rem;
                    border-radius: 6px;
                    font-style: italic;
                    border-left: 4px solid #2196f3;
                    margin: 1rem 0;
                }
                .game-item.active {
                    background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
                    color: white;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(44, 90, 160, 0.3);
                }
                .game-item.active h4 {
                    color: white;
                }
                .game-item.active p {
                    color: rgba(255,255,255,0.9);
                }
            `;
            document.head.appendChild(style);
        }
    }

    addInteractiveFeedback(element) {
        // Create ripple effect on click
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(44, 90, 160, 0.3);
            transform: scale(0);
            animation: clickRipple 0.6s ease-out;
            width: 100px;
            height: 100px;
            left: ${rect.left + rect.width/2 - 50}px;
            top: ${rect.top + rect.height/2 - 50}px;
            pointer-events: none;
            z-index: 1000;
        `;

        document.body.appendChild(ripple);

        // Add animation keyframes if not exist
        if (!document.getElementById('clickRippleStyles')) {
            const style = document.createElement('style');
            style.id = 'clickRippleStyles';
            style.textContent = `
                @keyframes clickRipple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            document.body.removeChild(ripple);
        }, 600);
    }

    setupProgressTracking() {
        window.addEventListener('scroll', this.updateReadingProgress.bind(this));
    }

    updateReadingProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);

        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }

        // Save progress
        localStorage.setItem('rippleCodeProgress', JSON.stringify({
            page: window.location.pathname,
            progress: scrollPercent,
            timestamp: Date.now()
        }));
    }

    setupNavigationHighlight() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname;

        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath || 
                (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    setupMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('.site-nav');

        if (menuBtn && nav) {
            menuBtn.innerHTML = '☰';
            menuBtn.style.cssText = `
                display: none;
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1001;
                background: var(--primary-blue);
                color: white;
                border: none;
                padding: 0.75rem;
                border-radius: 4px;
                font-size: 1.2rem;
                cursor: pointer;
            `;
            document.body.appendChild(menuBtn);
        }

        // Show mobile menu button on small screens
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                if (menuBtn) menuBtn.style.display = 'block';
            } else {
                if (menuBtn) menuBtn.style.display = 'none';
                if (nav) nav.classList.remove('mobile-open');
            }
        };

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }

    toggleMobileMenu() {
        const nav = document.querySelector('.site-nav');
        if (nav) {
            nav.classList.toggle('mobile-open');
        }
    }

    setupInteractiveElements() {
        // Add loading animations to elements as they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.science-proof, .game-container, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    loadSavedProgress() {
        const saved = localStorage.getItem('rippleCodeProgress');
        if (saved) {
            try {
                const progress = JSON.parse(saved);
                const progressBar = document.querySelector('.progress-bar');
                if (progressBar && progress.page === window.location.pathname) {
                    progressBar.style.width = progress.progress + '%';
                }
            } catch (e) {
                console.log('Could not load saved progress');
            }
        }
    }

    // Utility method for chapter navigation
    navigateToChapter(chapterPath) {
        // Add loading state
        const loader = document.createElement('div');
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(44, 90, 160, 0.9);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            z-index: 2000;
        `;
        loader.innerHTML = 'Loading next chapter...';
        document.body.appendChild(loader);

        setTimeout(() => {
            window.location.href = chapterPath;
        }, 500);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.rippleApp = new RippleCodeApp();
});

// Additional utility functions
function showScientificProof(proofType) {
    const proofs = {
        'chaos': {
            title: 'Chaos Theory: Scientific Evidence',
            content: `
                <h4>🔬 Edward Lorenz (1963) - "Deterministic Nonperiodic Flow"</h4>
                <p><strong>Finding:</strong> Mathematical proof that complex systems exhibit sensitive dependence on initial conditions.</p>
                <p><strong>Evidence:</strong> Computer simulation where rounding 0.506127 to 0.506 completely changed two months of weather prediction.</p>
                <p><strong>Citations:</strong> 10,000+ peer-reviewed papers since 1963</p>
                <p><strong>Applications:</strong> Meteorology, biology, economics, social systems</p>
                <div class="proof-link">
                    📖 <a href="https://journals.ametsoc.org/view/journals/atsc/20/2/1520-0469_1963_020_0130_dnf_2_0_co_2.xml" target="_blank">View Original Paper</a>
                </div>
            `
        },
        'quantum': {
            title: 'Quantum Consciousness: Breakthrough Evidence',
            content: `
                <h4>⚛️ Mike Wiest (2024) - Wellesley College Study</h4>
                <p><strong>Finding:</strong> First experimental evidence supporting quantum theories of consciousness</p>
                <p><strong>Method:</strong> Studied how anesthetics work by disrupting quantum processes in neural microtubules</p>
                <p><strong>Significance:</strong> Validates Penrose-Hameroff Orchestrated Objective Reduction theory</p>
                <p><strong>Implications:</strong> Consciousness actively participates in reality creation</p>
                <div class="proof-link">
                    📖 <a href="https://www.wellesley.edu/news/2024/node/220501" target="_blank">View Research Summary</a>
                </div>
            `
        }
    };

    const proof = proofs[proofType];
    if (!proof) return;

    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 8px;
        max-width: 600px;
        margin: 2rem;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;

    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="margin: 0; color: var(--primary-blue);">${proof.title}</h3>
            <button onclick="this.closest('.modal').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; padding: 0.5rem;">×</button>
        </div>
        ${proof.content}
        <div style="margin-top: 2rem; text-align: center;">
            <button onclick="this.closest('.modal').remove()" style="background: var(--primary-blue); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer;">Close</button>
        </div>
    `;

    modal.className = 'modal';
    modal.appendChild(content);
    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}
