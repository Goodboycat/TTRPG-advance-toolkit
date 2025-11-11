// TTRPG Toolkit - Main JavaScript File
// Global settings manager and utility functions

const TTRPGToolkit = {
    // Initialize the application
    init: function() {
        this.setActiveTab();
        this.loadGlobalSettings();
        this.setupEventListeners();
        console.log('TTRPG Toolkit initialized');
    },

    // Set active navigation tab based on current page
    setActiveTab: function() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-tabs a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    },

    // Load global settings from localStorage
    loadGlobalSettings: function() {
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
        
        // Update page-specific elements
        this.updatePageElements(systemName, defaultDice, maxLevel);
    },

    // Update page-specific elements with settings
    updatePageElements: function(systemName, defaultDice, maxLevel) {
        const elements = {
            'gameTitle': systemName,
            'systemName': systemName,
            'diceType': defaultDice,
            'maxLevel': maxLevel
        };

        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        }
    },

    // Setup global event listeners
    setupEventListeners: function() {
        // Auto-save for editable content with data-save-key attribute
        document.addEventListener('blur', function(e) {
            if (e.target.hasAttribute('contenteditable') && e.target.dataset.saveKey) {
                const key = e.target.dataset.saveKey;
                const value = e.target.textContent;
                localStorage.setItem(key, value);
                TTRPGToolkit.showNotification('Auto-saved!', 'success');
            }
        }, true);

        // Handle Enter key in editable fields
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.target.hasAttribute('contenteditable')) {
                if (!e.shiftKey) {
                    e.preventDefault();
                    e.target.blur();
                }
            }
        });

        // Global click handler for buttons with data-action
        document.addEventListener('click', function(e) {
            if (e.target.dataset.action) {
                TTRPGToolkit.handleDataAction(e.target.dataset.action, e.target);
            }
        });
    },

    // Handle data-action attributes
    handleDataAction: function(action, element) {
        switch(action) {
            case 'save-setting':
                const key = element.dataset.key;
                const value = element.value;
                if (key && value !== undefined) {
                    localStorage.setItem(key, value);
                    this.showNotification('Setting saved!', 'success');
                }
                break;
            case 'delete-item':
                const itemId = element.dataset.itemId;
                const itemType = element.dataset.itemType;
                this.deleteItem(itemType, itemId);
                break;
            case 'clear-data':
                const dataType = element.dataset.dataType;
                this.clearData(dataType);
                break;
        }
    },

    // Show notification
    showNotification: function(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 4px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    // Delete item from storage
    deleteItem: function(itemType, itemId) {
        if (!confirm(`Delete this ${itemType}?`)) return;

        const items = JSON.parse(localStorage.getItem(itemType) || '[]');
        const updatedItems = items.filter(item => item.id !== itemId);
        localStorage.setItem(itemType, JSON.stringify(updatedItems));
        
        this.showNotification(`${itemType} deleted!`, 'success');
        
        // Reload the current list if possible
        if (typeof window.loadCharacterList === 'function') window.loadCharacterList();
        if (typeof window.loadNotes === 'function') window.loadNotes();
        if (typeof window.loadTableList === 'function') window.loadTableList();
    },

    // Clear specific data type
    clearData: function(dataType) {
        if (!confirm(`Clear all ${dataType}? This cannot be undone!`)) return;

        switch(dataType) {
            case 'rollHistory':
                localStorage.removeItem('rollHistory');
                break;
            case 'notes':
                localStorage.removeItem('notes');
                break;
            case 'characters':
                localStorage.removeItem('characters');
                break;
            case 'all':
                if (confirm('ARE YOU SURE? This will delete ALL data including characters, notes, and settings!')) {
                    localStorage.clear();
                    location.reload();
                }
                return;
        }

        this.showNotification(`${dataType} cleared!`, 'success');
        
        // Reload relevant lists
        if (typeof window.displayRollHistory === 'function') window.displayRollHistory();
        if (typeof window.loadNotes === 'function') window.loadNotes();
        if (typeof window.loadCharacterList === 'function') window.loadCharacterList();
    },

    // Utility function to generate unique ID
    generateId: function() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    },

    // Save data to localStorage
    saveData: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            this.showNotification('Error saving data!', 'error');
            console.error('Save error:', e);
            return false;
        }
    },

    // Load data from localStorage
    loadData: function(key, defaultValue = []) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Load error:', e);
            return defaultValue;
        }
    },

    // Export data as JSON file
    exportData: function(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    // Import data from JSON file
    importData: function(file, callback) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                callback(null, data);
            } catch (error) {
                callback(error, null);
            }
        };
        reader.readAsText(file);
    },

    // Dice rolling utility
    rollDice: function(formula) {
        // Parse dice formula like "2d6+3"
        const match = formula.match(/(\d*)d(\d+)([+-]\d+)?/i);
        if (!match) return null;

        const count = parseInt(match[1]) || 1;
        const sides = parseInt(match[2]);
        const mod = parseInt(match[3]) || 0;

        let total = 0;
        let rolls = [];

        for (let i = 0; i < count; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            rolls.push(roll);
            total += roll;
        }

        const finalResult = total + mod;

        return {
            formula: formula,
            total: finalResult,
            rolls: rolls,
            modifier: mod,
            details: `${formula} = [${rolls.join(' + ')}]${mod >= 0 ? '+' : ''}${mod} = ${finalResult}`
        };
    },

    // Get emoji suggestions based on tags
    getEmojiSuggestions: function(tags) {
        const suggestions = [];
        tags.forEach(tag => {
            const category = tag.toLowerCase();
            if (window.TTRPGEmojis && window.TTRPGEmojis[category]) {
                suggestions.push(...window.TTRPGEmojis[category].slice(0, 2));
            }
        });
        return [...new Set(suggestions)]; // Remove duplicates
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    TTRPGToolkit.init();
});

// Global utility functions
window.TTRPGToolkit = TTRPGToolkit;

// Make functions globally available
window.showNotification = TTRPGToolkit.showNotification;
window.generateId = TTRPGToolkit.generateId;
