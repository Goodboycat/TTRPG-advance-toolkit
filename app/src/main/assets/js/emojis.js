// Enhanced TTRPG Emoji Library for Maps, Tags, and World-Building

window.TTRPGEmojis = {
    // Adventure & Equipment
    adventure: [
        '⚔️', '🛡️', '🏹', '🗡️', '🔮', '📜', '🗝️', '💎', '🏆', '👑',
        '⚱️', '🏺', '📦', '🎁', '💼', '🧭', '🕯️', '💡', '🔦', '🕯️'
    ],
    
    // Weapons & Combat
    weapons: [
        '🗡️', '⚔️', '🏹', '🔫', '🪓', '🔨', '🗜️', '⚒️', '🛠️', '⛏️',
        '🔪', '💣', '🧨', '🎯', '🛡️', '🏴', '🚩', '🎌', '🏳️', '⚔️'
    ],
    
    // Magic & Spells
    magic: [
        '🔮', '✨', '🌟', '💫', '⭐', '☄️', '🌠', '💥', '🔥', '❄️',
        '💧', '🌪️', '⚡', '🌈', '☀️', '🌙', '💎', '🔱', '♾️', '📜'
    ],
    
    // Creatures & Monsters
    creatures: [
        '🐉', '🐲', '🦖', '🦕', '🐊', '🐍', '🦎', '🐢', '🦅', '🦉',
        '🐺', '🦊', '🐗', '🐻', '🦌', '🐘', '🦏', '🦛', '🐫', '🦒',
        '🦘', '🐎', '🦄', '🐂', '🐃', '🐄', '🐏', '🐑', '🐐', '🦙'
    ],
    
    // Fantasy Races
    races: [
        '🧝', '🧙', '🧌', '🧚', '🧛', '🧜', '🧞', '🧟', '👹', '👺',
        '🤴', '👸', '🦸', '🦹', '🧝', '🧙', '🧚', '🧛', '🧜', '🧞'
    ],
    
    // Locations & Places
    locations: [
        '🏰', '🏯', '🗼', '🏛️', '⛪', '🕌', '🛕', '🕍', '🏠', '🏡',
        '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '🏪', '🏫', '🏬',
        '🏭', '🏮', '🗿', '🏟️', '🎪', '🎭', '🛖', '⛺', '🏕️', '🌋'
    ],
    
    // Nature & Environment
    nature: [
        '🌲', '🌳', '🌴', '🌱', '🌿', '☘️', '🍀', '🎍', '🎋', '🍃',
        '🍂', '🍁', '🌾', '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻',
        '🌵', '🎄', '🌊', '🌋', '🏔️', '⛰️', '🌄', '🌅', '🌌', '🌠'
    ],
    
    // NPC & Characters
    npc: [
        '👤', '👥', '🧑', '👨', '👩', '🧔', '👴', '👵', '👦', '👧',
        '🧒', '👶', '👮', '💂', '👷', '🤴', '👸', '🦸', '🦹', '🧙'
    ],
    
    // Items & Tools
    items: [
        '🔧', '🪛', '🔨', '⛏️', '🪓', '🪚', '🔩', '⚙️', '⛓️', '🪝',
        '🧰', '🧲', '🪜', '🗑️', '🛒', '🛖', '⛽', '🛢️', '💈', '🧴'
    ],
    
    // Status & Conditions
    status: [
        '❤️', '💙', '💚', '💛', '💜', '🖤', '💔', '❣️', '💕', '💞',
        '💓', '💗', '💖', '💘', '💝', '🔴', '🟠', '🟡', '🟢', '🔵'
    ],
    
    // Symbols & UI
    symbols: [
        '❓', '❗', '⚠️', '⚜️', '🔱', '⭕', '❌', '💠', '🔰', '♨️',
        '💤', '🌀', '♿', '🚹', '🚺', '🚻', '🚼', '🚾', '🛂', '🛃'
    ],
    
    // Food & Consumables
    food: [
        '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈',
        '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦'
    ],
    
    // Time & Weather
    time: [
        '🌞', '🌝', '🌛', '🌜', '🌙', '⭐', '🌟', '🌠', '🌌', '☀️',
        '🌤️', '⛅', '🌥️', '☁️', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '❄️'
    ]
};

// Enhanced emoji utility functions
window.TTRPGEmojiUtils = {
    // Get emoji by category
    getByCategory: function(category) {
        return TTRPGEmojis[category] || [];
    },

    // Get all emojis as flat array
    getAll: function() {
        return Object.values(TTRPGEmojis).flat();
    },

    // Find emoji category
    findCategory: function(emoji) {
        for (const [category, emojis] of Object.entries(TTRPGEmojis)) {
            if (emojis.includes(emoji)) {
                return category;
            }
        }
        return 'unknown';
    },

    // Get emojis by tags (searches multiple categories)
    getByTags: function(tags) {
        const results = new Set();
        tags.forEach(tag => {
            const categoryEmojis = this.getByCategory(tag);
            categoryEmojis.forEach(emoji => results.add(emoji));
            
            // Also search in other categories that might match
            Object.entries(TTRPGEmojis).forEach(([category, emojis]) => {
                if (category.includes(tag) || tag.includes(category)) {
                    emojis.forEach(emoji => results.add(emoji));
                }
            });
        });
        return Array.from(results);
    },

    // Get random emoji from category
    getRandom: function(category = null) {
        const emojiList = category ? this.getByCategory(category) : this.getAll();
        return emojiList[Math.floor(Math.random() * emojiList.length)] || '❓';
    },

    // Create emoji picker HTML
    createPicker: function(onSelect, categories = null) {
        const picker = document.createElement('div');
        picker.className = 'emoji-picker';
        picker.style.cssText = `
            max-height: 300px;
            overflow-y: auto;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
            gap: 0.5rem;
        `;

        const emojiList = categories ? 
            categories.map(cat => this.getByCategory(cat)).flat() : 
            this.getAll();

        emojiList.forEach(emoji => {
            const button = document.createElement('button');
            button.textContent = emoji;
            button.style.cssText = `
                font-size: 1.5rem;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 4px;
                transition: all 0.3s;
            `;
            button.onmouseover = () => button.style.background = 'var(--accent)';
            button.onmouseout = () => button.style.background = 'none';
            button.onclick = () => onSelect(emoji);
            picker.appendChild(button);
        });

        return picker;
    },

    // Suggest emojis based on text content
    suggestFromText: function(text) {
        const words = text.toLowerCase().split(/\s+/);
        const suggestions = new Set();
        
        words.forEach(word => {
            Object.entries(TTRPGEmojis).forEach(([category, emojis]) => {
                if (category.includes(word) || word.includes(category)) {
                    emojis.slice(0, 2).forEach(emoji => suggestions.add(emoji));
                }
                
                // Check if word matches common RPG terms
                const rpgTerms = {
                    'attack': ['⚔️', '🗡️', '🏹'],
                    'defend': ['🛡️', '⚔️'],
                    'magic': ['🔮', '✨', '🌟'],
                    'heal': ['❤️', '💚', '🏥'],
                    'treasure': ['💎', '🏆', '👑'],
                    'door': ['🚪', '🗝️'],
                    'secret': ['🕵️', '🗝️'],
                    'danger': ['⚠️', '💀', '🔥']
                };
                
                if (rpgTerms[word]) {
                    rpgTerms[word].forEach(emoji => suggestions.add(emoji));
                }
            });
        });
        
        return Array.from(suggestions).slice(0, 6); // Return top 6 suggestions
    },

    // Add emoji to tags in notes or database entries
    enhanceTagsWithEmojis: function(tags) {
        return tags.map(tag => {
            const suggestions = this.suggestFromText(tag);
            const emoji = suggestions[0] || this.getRandom();
            return `${emoji} ${tag}`;
        });
    },

    // Parse text and replace keywords with emojis
    replaceKeywords: function(text) {
        let enhancedText = text;
        Object.entries(TTRPGEmojis).forEach(([category, emojis]) => {
            emojis.forEach(emoji => {
                // Simple keyword replacement - can be enhanced
                enhancedText = enhancedText.replace(
                    new RegExp(`\\b${category}\\b`, 'gi'), 
                    `${emoji} ${category}`
                );
            });
        });
        return enhancedText;
    }
};

// Auto-initialize emoji utilities
document.addEventListener('DOMContentLoaded', function() {
    if (!window.TTRPGEmojis) window.TTRPGEmojis = {};
    if (!window.TTRPGEmojiUtils) window.TTRPGEmojiUtils = {};
});
