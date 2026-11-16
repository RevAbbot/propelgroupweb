class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('PropelGroup.ai initialized');

    // Text Scrambler
    const el = document.querySelector('#text-scrambler');
    if (el) {
        const fx = new TextScramble(el);
        const phrases = (el.dataset.phrases || 'Strategy|Governance|Reputation|Efficiency').split('|');

        let counter = 0;
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 2000);
            });
            counter = (counter + 1) % phrases.length;
        };

        next();
    }
});

    // Calculator Logic
    const teamSizeInput = document.getElementById('team-size');
    const taskCountInput = document.getElementById('task-count');
    const teamSizeVal = document.getElementById('team-size-val');
    const taskCountVal = document.getElementById('task-count-val');
    const savedHoursDisplay = document.getElementById('saved-hours');
    const roiValDisplay = document.getElementById('roi-val');

    function updateCalculator() {
        if(!teamSizeInput) return;
        
        const teamSize = parseInt(teamSizeInput.value);
        const taskCount = parseInt(taskCountInput.value);
        
        teamSizeVal.innerText = teamSize;
        taskCountVal.innerText = taskCount;
        
        // Simple logic: 20% efficiency gain per person on tasks * 12 months
        // Assume task takes 1 hour for simplicity
        const hoursSaved = Math.floor(teamSize * taskCount * 0.2 * 12);
        // $50/hr average loaded rate (placeholder)
        const moneySaved = hoursSaved * 50;
        const moneyLabel = moneySaved >= 1e6
            ? '$' + (moneySaved / 1e6).toFixed(1) + 'M'
            : '$' + Math.round(moneySaved / 1e3).toLocaleString() + 'k';

        savedHoursDisplay.innerText = hoursSaved.toLocaleString();
        roiValDisplay.innerText = moneyLabel;
    }

    if(teamSizeInput) {
        teamSizeInput.addEventListener('input', updateCalculator);
        taskCountInput.addEventListener('input', updateCalculator);
        updateCalculator();
    }

    // Ethics Toggle Logic
    const ethicsToggle = document.getElementById('ethics-toggle');
    if(ethicsToggle) {
        ethicsToggle.addEventListener('change', (e) => {
            if(e.target.checked) {
                document.body.classList.add('human-mode');
                // You could add logic here to highlight specific key words
                console.log('Human Mode Activated');
            } else {
                document.body.classList.remove('human-mode');
                console.log('Deep Tech Mode Activated');
            }
        });
    }

    // Scroll Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    // Custom Cursor
    const cursor = document.getElementById('cursor-follower');
    if(cursor) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            // Smooth follow
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effect
        const links = document.querySelectorAll('a, button, .pointer');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => cursor.classList.add('active'));
            link.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }

    // Mobile nav toggle
    const nav = document.getElementById('main-nav');
    const navToggle = nav && nav.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        nav.querySelectorAll('.nav-links a').forEach(a =>
            a.addEventListener('click', () => {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            })
        );
    }
