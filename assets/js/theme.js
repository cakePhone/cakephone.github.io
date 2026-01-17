/**
 * Theme toggle functionality
 * Clicking sun/moon switches between light and dark mode
 */

document.addEventListener('DOMContentLoaded', () => {
    const ambientSky = document.querySelector('.ambient-sky');
    
    if (!ambientSky) return;
    
    ambientSky.addEventListener('click', () => {
        const html = document.documentElement;
        const isDark = html.classList.contains('theme-dark') || 
            (!html.classList.contains('theme-light') && 
             window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        // Toggle theme
        html.classList.remove('theme-light', 'theme-dark');
        
        if (isDark) {
            html.classList.add('theme-light');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('theme-dark');
            localStorage.setItem('theme', 'dark');
        }
    });
});
