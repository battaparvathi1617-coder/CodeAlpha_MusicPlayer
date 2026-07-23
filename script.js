const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const volume = document.getElementById('volume');

// Playlist details
const songs = [
    {
        name: 'SoundHelix-Song-1',
        title: 'Acoustic Vibe',
        artist: 'Artist One'
    },
    {
        name: 'SoundHelix-Song-2',
        title: 'Electronic Beats',
        artist: 'Artist Two'
    },
    {
        name: 'SoundHelix-Song-3',
        title: 'Chill Melody',
        artist: 'Artist Three'
    }
];

let songIndex = 0;

// Load song details
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = `https://www.soundhelix.com/examples/mp3/${song.name}.mp3`;
}

loadSong(songs[songIndex]);

// Play song
function playSong() {
    audio.play();
    playBtn.innerText = '⏸';
}

// Pause song
function pauseSong() {
    audio.pause();
    playBtn.innerText = '▶';
}

// Play / Pause event
playBtn.addEventListener('click', () => {
    const isPlaying = !audio.paused;
    isPlaying ? pauseSong() : playSong();
});

// Previous song
prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
});

// Next song
nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
});

// Progress bar update
audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
});

// Set progress on click
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Volume control
volume.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Autoplay next song when current finishes
audio.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
});