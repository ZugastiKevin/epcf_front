const themeToggle = document.querySelector('#theme-toggle');
const toggleImage = document.querySelector('#theme-toggle img');


let rotation = 0;

function toggleTheme() {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    };

    rotation += 180;
    toggleImage.style.transform = `rotate(${rotation}deg)`;
    localStorage.setItem('rotation', rotation);
};

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        rotation = 180;
    } else {
        rotation = 0;
    };

    toggleImage.style.transform = `rotate(${rotation}deg)`;
});

themeToggle.addEventListener('click', toggleTheme);