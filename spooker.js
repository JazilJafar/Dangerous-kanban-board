const button = document.getElementById('kanbanbtn');
const overlay = document.getElementById('scaryoverlay');
button.addEventListener('click', () => {
    overlay.style.display = 'flex';
    setTimeout(() => {
        window.location.href = './index.html';
    }, 1500);
});