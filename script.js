document.addEventListener("DOMContentLoaded", () => {
    // Abre as cortinas
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);

    // Efeito Vanilla Tilt nas esferas (Movimento 3D)
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".memory-orb"), {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 0.5,
            scale: 1.1
        });
    }

    // Animação simples de aparecimento ao rolar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    const elementsToAnimate = document.querySelectorAll('.chalkboard-paper, .dark-card, .memory-orb');
    elementsToAnimate.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
})

document.addEventListener("DOMContentLoaded", () => {
    /* --- CONFIGURAÇÃO DO PLAYER DE MÚSICA --- */
    
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const musicTitle = document.getElementById('music-title');
    const disk = document.getElementById('disk');
    const icon = playBtn.querySelector('i');

    // LISTA DE MÚSICAS (Adicione seus arquivos aqui)
    const songs = [
        { title: "Somos Estrelas", src: "assets/audio/musical.MP3" },
    ];

    let songIndex = 0;

    // Função para carregar a música
    function loadSong(song) {
        musicTitle.innerText = song.title;
        audio.src = song.src;
    }

    // Função Tocar
    function playSong() {
        musicTitle.closest('.music-player-container').classList.add('playing');
        disk.classList.add('playing');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        audio.play();
    }

    // Função Pausar
    function pauseSong() {
        musicTitle.closest('.music-player-container').classList.remove('playing');
        disk.classList.remove('playing');
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        audio.pause();
    }

    // Botão Play/Pause
    playBtn.addEventListener('click', () => {
        const isPlaying = musicTitle.closest('.music-player-container').classList.contains('playing');
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    // Botão Próximo
    nextBtn.addEventListener('click', () => {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }
        loadSong(songs[songIndex]);
        playSong();
    });

    // Botão Anterior
    prevBtn.addEventListener('click', () => {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }
        loadSong(songs[songIndex]);
        playSong();
    });

    // Quando a música acabar, toca a próxima automaticamente
    audio.addEventListener('ended', () => {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }
        loadSong(songs[songIndex]);
        playSong();
    });

    // Carregar a primeira música ao iniciar (sem tocar)
    loadSong(songs[songIndex]);
});
