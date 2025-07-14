document.addEventListener('DOMContentLoaded', function() {

    // --- Dark Mode Toggle ---
    // Dark mode functionality has been removed as the theme is now permanently dark.
    // The previous code for themeToggleBtn, applySavedTheme, and localStorage interactions
    // has been removed.


    // --- Writing Samples Scroller ---
    const samplesContainer = document.querySelector('.samples-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    if (samplesContainer && scrollLeftBtn && scrollRightBtn) {
        
        const scroll = (direction) => {
            const card = samplesContainer.querySelector('.sample-card');
            if (!card) return;

            const cardStyle = window.getComputedStyle(card);
            // Get the computed margin-right and convert it to a number
            const cardMargin = parseFloat(cardStyle.marginRight);
            const scrollAmount = card.offsetWidth + cardMargin;

            samplesContainer.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        };

        scrollLeftBtn.addEventListener('click', () => scroll(-1));
        scrollRightBtn.addEventListener('click', () => scroll(1));

        const handleScrollButtons = () => {
            // Hide buttons on mobile (768px and below)
            if (window.innerWidth <= 768) {
                scrollLeftBtn.style.display = 'none';
                scrollRightBtn.style.display = 'none';
                return; // Exit the function as buttons are hidden
            }
            // Calculate maximum scrollable distance
            const maxScrollLeft = samplesContainer.scrollWidth - samplesContainer.clientWidth;
            const tolerance = 1; // Small tolerance for floating point comparisons

            // Show/hide left button based on scroll position
            scrollLeftBtn.style.display = samplesContainer.scrollLeft <= tolerance ? 'none' : 'block';
            // Show/hide right button based on scroll position
            scrollRightBtn.style.display = samplesContainer.scrollLeft >= maxScrollLeft - tolerance ? 'none' : 'block';
        };

        // Initial check for button visibility
        handleScrollButtons();
        // Update button visibility on scroll
        samplesContainer.addEventListener('scroll', handleScrollButtons);
        // Update button visibility on window resize
        window.addEventListener('resize', handleScrollButtons);
    }

    // --- Smooth scrolling for navigation links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior
            const targetId = this.getAttribute('href');
            
            // Do not scroll if the href is just '#' (e.g., for the theme toggle's parent li)
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Smooth scroll effect
                    block: 'start' // Scroll to the start of the element
                });
            }
        });
    });
});
