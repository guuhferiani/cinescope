/**
 * CineScope Hero Carousel Logic
 * Handles slide transitions, auto-play, and user interaction.
 */

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');
    const dotsContainer = document.getElementById('carousel-indicators');
    
    let currentIndex = 0;
    let autoPlayInterval;
    const intervalTime = 6000; // 6 seconds

    // Initialize dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    /**
     * Updates the active slide and dots
     * @param {number} index - Index of the slide to show
     */
    function goToSlide(index) {
        // Remove active class from CURRENT slide and dot
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');

        // Target index bounds check
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }

        // Add active class to NEW slide and dot
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    function handleNext() {
        goToSlide(currentIndex + 1);
    }

    function handlePrev() {
        goToSlide(currentIndex - 1);
    }

    // Event Listeners
    nextButton.addEventListener('click', () => {
        handleNext();
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        handlePrev();
        resetAutoPlay();
    });

    // Auto Play Logic
    function startAutoPlay() {
        autoPlayInterval = setInterval(handleNext, intervalTime);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Pause on hover
    const carouselSection = document.querySelector('.hero-carousel');
    carouselSection.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carouselSection.addEventListener('mouseleave', startAutoPlay);

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            handleNext();
            resetAutoPlay();
        } else if (e.key === 'ArrowLeft') {
            handlePrev();
            resetAutoPlay();
        }
    });

    // Initial Start
    startAutoPlay();
});
