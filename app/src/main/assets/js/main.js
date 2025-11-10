// Global settings manager - loads settings from localStorage on every page
function loadGlobalSettings() {
    // Load system settings
    const systemName = localStorage.getItem('systemName') || 'Flexible TTRPG';
    const defaultDice = localStorage.getItem('defaultDice') || 'd20';
    const maxLevel = localStorage.getItem('maxLevel') || '20';
    const fontSize = localStorage.getItem('fontSize') || '16';
    const theme = localStorage.getItem('theme') || 'dark';
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', theme);
    
    // Apply font size
    document.documentElement.style.fontSize = fontSize + 'px';
    
    // Update dashboard-specific elements
    const gameTitleEl = document.getElementById('gameTitle');
    const systemNameEl = document.getElementById('systemName');
    const diceTypeEl = document.getElementById('diceType');
    const maxLevelEl = document.getElementById('maxLevel');
    
    if (gameTitleEl) gameTitleEl.textContent = systemName;
    if (systemNameEl) systemNameEl.textContent = systemName;
    if (diceTypeEl) diceTypeEl.textContent = defaultDice;
    if (maxLevelEl) maxLevelEl.textContent = maxLevel;
    
    // Update dice roller
    const diceTypeLabel = document.getElementById('diceTypeLabel');
    if (diceTypeLabel) {
        const diceMatch = defaultDice.match(/d(\d+)/i);
        if (diceMatch) {
            document.getElementById('diceSides').value = diceMatch[1];
        }
    }
    
    // Load and apply character stats to character sheet
    if (window.location.pathname.includes('character-sheet') || document.getElementById('statsGrid')) {
        loadCharacterStatsSettings();
    }
}

// Load character stats from settings
function loadCharacterStatsSettings() {
    const characterStats = JSON.parse(localStorage.getItem('characterStats') || '["STR","DEX","CON","INT","WIS","CHA"]');
    const statsGrid = document.getElementById('statsGrid');
    
    if (statsGrid) {
        statsGrid.innerHTML = characterStats.map(stat => `
            <div class="stat-item">
                <label contenteditable="true">${stat}:</label>
                <input type="number" id="stat-${stat}" value="10" min="1" max="30">
                <span class="stat-mod" contenteditable="true">Mod: +0</span>
            </div>
        `).join('');
        
        // Add mod calculation
        statsGrid.addEventListener('input', function(e) {
            if (e.target.type === 'number') {
                const value = parseInt(e.target.value) || 10;
                const mod = Math.floor((value - 10) / 2);
                const modSpan = e.target.nextElementSibling;
                if (modSpan) modSpan.textContent = `Mod: ${mod >= 0 ? '+' : ''}${mod}`;
            }
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: var(--accent);
        color: var(--bg-primary);
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

function setActiveTab() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-tabs a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setActiveTab();
    loadGlobalSettings();
});

document.addEventListener('blur', function(e) {
    if (e.target.hasAttribute('contenteditable') && e.target.dataset.autoSave) {
        const key = e.target.dataset.autoSave;
        localStorage.setItem(key, e.target.textContent);
    }
}, true);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.hasAttribute('contenteditable')) {
        if (!e.shiftKey) {
            e.preventDefault();
            e.target.blur();
        }
    }
});

window.TTRPGToolkit = {
    showNotification,
    setActiveTab,
    loadGlobalSettings,
    loadCharacterStatsSettings
};
