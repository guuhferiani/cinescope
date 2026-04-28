/**
 * CineScope - Interactions & Filtering Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Interactive Highlights (About Section) ---
    const highlightItems = document.querySelectorAll('.highlight-item');
    const displayContents = document.querySelectorAll('.display-content');

    if (highlightItems.length && displayContents.length) {
        highlightItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetId = item.getAttribute('data-target');

                // Update active item in the list
                highlightItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Update active display content
                displayContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === targetId) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    // --- Content Filtering Logic (Movies & Series) ---
    const sections = document.querySelectorAll('.content-grid-section');

    sections.forEach(section => {
        const chips = section.querySelectorAll('.filter-chip');
        const cards = section.querySelectorAll('.content-card');

        if (!chips.length || !cards.length) return;

        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const filterValue = chip.textContent.trim();

                // Update active chip
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                // Filter cards within this specific section
                cards.forEach(card => {
                    const genreTag = card.querySelector('.genre-tag');
                    const genre = genreTag ? genreTag.textContent.trim() : '';

                    if (filterValue === 'Todos' || genre === filterValue) {
                        card.style.display = 'block';
                        // Reset opacity for transition
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        
                        // Small timeout to trigger transition
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    });

    // Simple transition style for filtered cards
    const style = document.createElement('style');
    style.textContent = `
        .content-card {
            transition: opacity 0.4s ease, transform 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
        }
    `;
    document.head.appendChild(style);
});
