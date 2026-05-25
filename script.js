// ========== MOBILE MENU TOGGLE ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========== COMMENTS FUNCTIONALITY ==========
const commentForm = document.getElementById('commentForm');
const commentsContainer = document.getElementById('commentsContainer');

if (commentForm) {
    // Load comments from localStorage
    loadComments();

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('commentName').value;
        const text = document.getElementById('commentText').value;

        // Create comment object
        const comment = {
            id: Date.now(),
            name,
            text,
            timestamp: new Date().toLocaleDateString()
        };

        // Save to localStorage
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.unshift(comment);
        localStorage.setItem('comments', JSON.stringify(comments));

        // Clear form
        commentForm.reset();

        // Reload comments
        loadComments();
    });
}

function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];

    if (commentsContainer) {
        commentsContainer.innerHTML = '';

        if (comments.length === 0) {
            commentsContainer.innerHTML = '<p style="text-align: center; color: #999;">No comments yet. Be the first to comment! 💬</p>';
            return;
        }

        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment-card';
            commentDiv.innerHTML = `
                <div class="comment-name">❤️ ${comment.name}</div>
                <div class="comment-text">${comment.text}</div>
                <small style="color: #999;">${comment.timestamp}</small>
            `;
            commentsContainer.appendChild(commentDiv);
        });
    }
}

// ========== PHOTOS FUNCTIONALITY ==========
const uploadForm = document.getElementById('uploadForm');
const photoUrl = document.getElementById('photoUrl');
const photoCaption = document.getElementById('photoCaption');
const photoPreview = document.getElementById('photoPreview');
const galleryContainer = document.getElementById('galleryContainer');
const emptyGallery = document.getElementById('emptyGallery');

if (uploadForm) {
    // Load photos from localStorage
    loadPhotos();

    // Preview photo on URL input
    if (photoUrl) {
        photoUrl.addEventListener('change', () => {
            const url = photoUrl.value;
            if (url) {
                photoPreview.innerHTML = `<img src="${url}" alt="Preview" style="max-width: 100%; border-radius: 10px;">`;
            }
        });
    }

    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = photoUrl.value;
        const caption = photoCaption.value || 'Beautiful Memory';

        // Create photo object
        const photo = {
            id: Date.now(),
            url,
            caption,
            timestamp: new Date().toLocaleDateString()
        };

        // Save to localStorage
        let photos = JSON.parse(localStorage.getItem('photos')) || [];
        photos.unshift(photo);
        localStorage.setItem('photos', JSON.stringify(photos));

        // Clear form
        uploadForm.reset();
        photoPreview.innerHTML = '<p style="text-align: center; color: #999;">Photo preview will appear here</p>';

        // Reload photos
        loadPhotos();
    });
}

function loadPhotos() {
    const photos = JSON.parse(localStorage.getItem('photos')) || [];

    if (galleryContainer) {
        galleryContainer.innerHTML = '';

        if (photos.length === 0) {
            if (emptyGallery) emptyGallery.style.display = 'block';
            return;
        }

        if (emptyGallery) emptyGallery.style.display = 'none';

        photos.forEach(photo => {
            const photoDiv = document.createElement('div');
            photoDiv.className = 'gallery-item';
            photoDiv.innerHTML = `
                <img src="${photo.url}" alt="${photo.caption}" onclick="openLightbox('${photo.url}', '${photo.caption}')">
                <div class="gallery-caption">${photo.caption}</div>
            `;
            galleryContainer.appendChild(photoDiv);
        });
    }
}

// ========== LIGHTBOX FUNCTIONALITY ==========
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.querySelector('.lightbox-close');

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

function openLightbox(url, caption) {
    lightboxImage.src = url;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

// ========== SONGS FUNCTIONALITY ==========
const songForm = document.getElementById('songForm');
const playlistContainer = document.getElementById('playlistContainer');
const emptySongs = document.getElementById('emptySongs');

if (songForm) {
    // Load songs from localStorage
    loadSongs();

    songForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('songTitle').value;
        const artist = document.getElementById('songArtist').value;
        const url = document.getElementById('songUrl').value;

        // Create song object
        const song = {
            id: Date.now(),
            title,
            artist,
            url,
            timestamp: new Date().toLocaleDateString()
        };

        // Save to localStorage
        let songs = JSON.parse(localStorage.getItem('songs')) || [];
        songs.unshift(song);
        localStorage.setItem('songs', JSON.stringify(songs));

        // Clear form
        songForm.reset();

        // Reload songs
        loadSongs();
    });
}

function loadSongs() {
    const songs = JSON.parse(localStorage.getItem('songs')) || [];

    if (playlistContainer) {
        playlistContainer.innerHTML = '';

        if (songs.length === 0) {
            if (emptySongs) emptySongs.style.display = 'block';
            return;
        }

        if (emptySongs) emptySongs.style.display = 'none';

        songs.forEach(song => {
            const songDiv = document.createElement('div');
            songDiv.className = 'song-card';
            songDiv.innerHTML = `
                <div class="song-title">🎵 ${song.title}</div>
                <div class="song-artist">Artist: ${song.artist}</div>
                <audio controls>
                    <source src="${song.url}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
                <small style="color: #999;">${song.timestamp}</small>
            `;
            playlistContainer.appendChild(songDiv);
        });
    }
}

// ========== FLOATING HEARTS ANIMATION ==========
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;

    const hearts = ['💕', '💖', '💗', '💝', '💓'];

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.fontSize = '2rem';
            heart.style.opacity = '0.6';
            heart.style.animation = 'float 4s ease-in-out forwards';
            heart.style.pointerEvents = 'none';
            container.appendChild(heart);

            setTimeout(() => heart.remove(), 4000);
        }, i * 600);
    }
}

// Create floating hearts on home page
if (document.querySelector('.home-section')) {
    createFloatingHearts();
    setInterval(createFloatingHearts, 6000);
}

// ========== INITIALIZATION ==========
console.log('🎂 Birthday Website Loaded!');
