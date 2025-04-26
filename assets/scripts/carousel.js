function carousel() {
    const gallery = document.querySelector('.gallery');
    const nextBtn = document.querySelector('#div-next');
    const prevBtn = document.querySelector('#div-previous');
    const dotsContainer = document.querySelector('.dots');

    let currentIndex = 0;
    const items = document.querySelectorAll('.gallery li');
    const totalItems = items.length;
    let interval;

    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('span');
        if (i === 0) {
            dot.classList.add('active');
        };
        dotsContainer.appendChild(dot);
    };

    const dots = document.querySelectorAll('.dots span');
    
    function updateGalleryPosition() {
        const offset = -currentIndex * (items[0].offsetWidth + 1600);
        gallery.style.opacity = 0;
        gallery.style.transform = `translateX(${offset}px)`;
        setTimeout(() => {
            gallery.style.opacity = 1;
        }, 400);
        updateDots();
    };
    
    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    };
  
    function nextImg() {
        currentIndex++;
        if (currentIndex >= totalItems) {
            currentIndex = 0;
        };
        updateGalleryPosition();
    };
    
    function prevImg() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalItems - 1;
        };
        updateGalleryPosition();
    };
    
    nextBtn.addEventListener('click', () => {
        nextImg();
        resetInterval();
    });
    
    prevBtn.addEventListener('click', () => {
        prevImg();
        resetInterval();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateGalleryPosition();
            resetInterval();
        });
    });
    
    function moveAuto() {
        interval = setInterval(nextImg, 8000);
    };
    
    function resetInterval() {
        clearInterval(interval); 
        moveAuto();
    };
    
    moveAuto();
};

carousel();