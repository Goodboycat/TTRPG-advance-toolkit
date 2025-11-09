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

document.addEventListener('DOMContentLoaded', setActiveTab);

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
    setActiveTab
};
