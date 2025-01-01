function toggleDetails(button) {
    const details = button.parentElement.querySelector('.extra-details');
    const isHidden = details.style.display === 'none' || details.style.display === '';
    
    details.style.display = isHidden ? 'block' : 'none';
    button.innerText = isHidden ? 'Show Less' : 'Learn More';
    
    // Add animation
    if(isHidden) {
        details.style.animation = 'slideDown 0.3s ease forwards';
        // Start countdown to remove exhibit
        removeExhibitAfterTimeout(button, 8000);
    } else {
        details.style.animation = 'slideUp 0.3s ease forwards';
    }
}

function removeExhibitAfterTimeout(button, timeout) {
    const exhibitContainer = button.closest('.exhibit-container');
    
    setTimeout(() => {
        exhibitContainer.style.animation = 'fadeOut 0.5s ease forwards';
        
        // Remove element after animation completes
        setTimeout(() => {
            exhibitContainer.remove();
        }, 500);
    }, timeout);
}

function openFullScreen(imgElement) {
    const modal = document.getElementById('fullscreenModal');
    const modalImg = document.getElementById('fullscreenImage');
    modal.style.display = 'flex';
    modalImg.src = imgElement.src;
    
    // Add zoom animation
    modalImg.style.animation = 'zoomIn 0.3s ease forwards';
    document.body.style.overflow = 'hidden';
}

function closeFullScreen() {
    const modal = document.getElementById('fullscreenModal');
    const modalImg = document.getElementById('fullscreenImage');
    
    modalImg.style.animation = 'zoomOut 0.3s ease forwards';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Exhibit click tracking functionality
function trackExhibitClick(exhibitTitle) {
    const history = JSON.parse(localStorage.getItem('exhibitHistory') || '[]');
    const entry = {
        title: exhibitTitle,
        timestamp: new Date().toLocaleString()
    };
    history.unshift(entry);
    localStorage.setItem('exhibitHistory', JSON.stringify(history));
}

function displayExhibitHistory() {
    const history = JSON.parse(localStorage.getItem('exhibitHistory') || '[]');
    const historyContainer = document.getElementById('exhibit-history');
    
    if (historyContainer) {
        historyContainer.innerHTML = history.map(entry => `
            <div class="list-group-item mb-2" style="background: rgba(255,255,255,0.1); border-radius: 10px;">
                <div class="d-flex justify-content-between">
                    <span>${entry.title}</span>
                    <small>${entry.timestamp}</small>
                </div>
            </div>
        `).join('');
        
        if (history.length === 0) {
            historyContainer.innerHTML = `
                <div class="text-center text-white">
                    No exhibit views yet. Visit exhibits on the home page to see them appear here.
                </div>
            `;
        }
    }
}

// Add click tracking to exhibit buttons
document.addEventListener('DOMContentLoaded', () => {
    // Track exhibit clicks
    document.querySelectorAll('.exhibit .learn-more').forEach(button => {
        button.addEventListener('click', () => {
            const exhibitTitle = button.closest('.exhibit').querySelector('h2').textContent;
            trackExhibitClick(exhibitTitle);
        });
    });

    // Display history when on history page
    displayExhibitHistory();
});

// Add these contact form enhancements
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('.form-control');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-arrow-right"></i>';
            }, 2000);
        }, 1500);
    });
});
