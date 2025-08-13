function handlePageTransition(event, targetPage) {
    event.preventDefault();
    const container = document.querySelector('.container');
    
    if (!container || container.classList.contains('transitioning')) return;
    
    container.classList.add('transitioning');
    
    requestAnimationFrame(() => {
        container.classList.add('page-exit');
        
        setTimeout(() => {
            window.location.href = targetPage;
        }, 300);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    if (!container) return;
    
    // Remove any existing transition classes
    container.classList.remove('page-exit', 'page-enter', 'transitioning');
    
    // Add page-transition class using requestAnimationFrame
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            container.classList.add('page-transition');
        });
    });
});