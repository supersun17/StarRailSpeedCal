const CONFIG = {
    AV_BASE: 10000,
    MAX_TURNS: 20,
    PIXELS_PER_AV: 5,
    INITIAL_CHARACTERS: [
        { name: "Character 1", speed: 100, color: "#ff4757" },
        { name: "Character 2", speed: 110, color: "#2e86de" },
        { name: "Character 3", speed: 120, color: "#2ed573" },
        { name: "Character 4", speed: 130, color: "#ffa502" }
    ]
};

let characters = [...CONFIG.INITIAL_CHARACTERS];
let currentZoom = 1;

// DOM Elements
const characterInputsContainer = document.getElementById('characterInputs');
const zoomRange = document.getElementById('zoomRange');

/**
 * Initialize the application
 */
function init() {
    renderInputs();
    renderTimeline();
    setupEventListeners();
}

/**
 * Render character input cards in the sidebar
 */
function renderInputs() {
    characterInputsContainer.innerHTML = '';
    characters.forEach((char, index) => {
        const card = document.createElement('div');
        card.className = 'char-input-card';
        card.innerHTML = `
            <div class="char-header">
                <div class="color-indicator" style="background-color: ${char.color}"></div>
                <input type="text" class="char-name-input" value="${char.name}" data-index="${index}">
            </div>
            <div class="speed-input-wrapper">
                <label>Speed</label>
                <input type="number" class="speed-input" value="${char.speed}" min="0" max="500" data-index="${index}">
            </div>
        `;
        characterInputsContainer.appendChild(card);
    });
}

/**
 * Render the timeline columns and blocks
 */
function renderTimeline() {
    characters.forEach((char, index) => {
        const column = document.getElementById(`col-${index}`);
        column.innerHTML = '';

        if (char.speed <= 0) {
            const grayBlock = document.createElement('div');
            grayBlock.className = 'turn-block grayed';
            grayBlock.textContent = '?';
            column.appendChild(grayBlock);
            return;
        }

        const actionValue = CONFIG.AV_BASE / char.speed;
        const blockHeight = actionValue * CONFIG.PIXELS_PER_AV * currentZoom;

        for (let turn = 1; turn <= CONFIG.MAX_TURNS; turn++) {
            const block = document.createElement('div');
            block.className = 'turn-block';
            block.style.height = `${blockHeight}px`;
            block.style.backgroundColor = char.color;
            block.textContent = turn;
            column.appendChild(block);
        }
    });
}

/**
 * Handle input changes and zoom
 */
function setupEventListeners() {
    characterInputsContainer.addEventListener('input', (e) => {
        const index = e.target.getAttribute('data-index');
        if (e.target.classList.contains('speed-input')) {
            characters[index].speed = parseFloat(e.target.value) || 0;
            renderTimeline();
        } else if (e.target.classList.contains('char-name-input')) {
            characters[index].name = e.target.value;
        }
    });

    zoomRange.addEventListener('input', (e) => {
        currentZoom = parseFloat(e.target.value);
        renderTimeline();
    });
}

// Start the app
init();
// Auto-scroll to bottom to see the start of the timeline
setTimeout(() => {
    const container = document.querySelector('.timeline-container');
    container.scrollTop = container.scrollHeight;
}, 100);
