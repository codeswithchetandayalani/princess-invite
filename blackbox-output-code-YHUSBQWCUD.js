// script.js
document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const detailsSection = document.getElementById('detailsSection');
    const noMessage = document.getElementById('noMessage');
    const yesBtnAfterNo = document.getElementById('yesBtnAfterNo');
    const todayDate = document.getElementById('todayDate');
    
    // Set today's date
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    todayDate.textContent = now.toLocaleDateString('en-US', options);
    
    let noClickCount = 0;
    const maxShuffles = 7;
    
    // Yes button functionality
    function showDetails() {
        detailsSection.classList.remove('hidden');
        yesBtn.style.display = 'none';
        noBtn.style.display = 'none';
        noMessage.classList.add('hidden');
    }
    
    yesBtn.addEventListener('click', showDetails);
    yesBtnAfterNo.addEventListener('click', showDetails);
    
    // No button functionality
    noBtn.addEventListener('click', function() {
        noClickCount++;
        
        if (noClickCount < maxShuffles) {
            // Shuffle position
            const maxX = window.innerWidth - noBtn.offsetWidth - 20;
            const maxY = window.innerHeight - noBtn.offsetHeight - 20;
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            
            noBtn.style.position = 'fixed';
            noBtn.style.left = randomX + 'px';
            noBtn.style.top = randomY + 'px';
            noBtn.style.zIndex = '1000';
            
            // Hide original buttons container if needed, but keep card visible
            document.querySelector('.buttons').style.display = 'none';
        } else {
            // After 7 tries, show message
            noBtn.style.display = 'none';
            noMessage.classList.remove('hidden');
            document.querySelector('.buttons').style.display = 'none';
            detailsSection.classList.add('hidden');
        }
    });
    
    // Ensure responsiveness for shuffling on resize
    window.addEventListener('resize', function() {
        if (noClickCount > 0 && noClickCount < maxShuffles) {
            // Re-shuffle if window resizes during shuffle phase
            const maxX = window.innerWidth - noBtn.offsetWidth - 20;
            const maxY = window.innerHeight - noBtn.offsetHeight - 20;
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            
            noBtn.style.left = randomX + 'px';
            noBtn.style.top = randomY + 'px';
        }
    });
});