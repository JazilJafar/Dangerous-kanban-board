const button = document.getElementById('kanbanbtn');
const overlay = document.getElementById('scaryoverlay');
const mutebtn =document.getElementById('mutebtn');
const audio = document.getElementById('spookyaudio');
const volumeslider = document.getElementById('volumeslider');
audio.volume = volumeslider.value;
const playaudio = () => {
    audio.play().catch(() => {
        document.addEventListener('click', () => {
            audio.play();
        }, { once: true });
    });
};
playaudio();
volumeslider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    audio.muted = audio.volume === 0;
    mutebtn.textContent = audio.muted ? '🔇' : '🔊';
});
mutebtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    mutebtn.textContent = audio.muted ? '🔇' : '🔊';
})
button.addEventListener('click', () => {
    overlay.style.display = 'flex';
    setTimeout(() => {
        window.location.href = './kanban.html';
    }, 1500);
});