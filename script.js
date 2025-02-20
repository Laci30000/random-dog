async function fetchDogMedia(filter) {
    try {
        let mediaUrl;
        do {
            const response = await fetch('https://random.dog/woof.json');
            const data = await response.json();
            mediaUrl = data.url;
        } while ((filter === 'image' && mediaUrl.endsWith('.mp4')) || (filter === 'video' && !mediaUrl.endsWith('.mp4')));
        
        return mediaUrl;
    } catch (error) {
        console.error('Hiba történt:', error);
    }
}

async function getRandomDog() {
    const mediaUrl = await fetchDogMedia();
    displayMedia(mediaUrl);
}

async function getOnlyImage() {
    const mediaUrl = await fetchDogMedia('image');
    displayMedia(mediaUrl);
}

async function getOnlyVideo() {
    const mediaUrl = await fetchDogMedia('video');
    displayMedia(mediaUrl);
}

function displayMedia(mediaUrl) {
    const imgElement = document.getElementById('dogImage');
    const videoElement = document.getElementById('dogVideo');
    
    if (mediaUrl.endsWith('.mp4')) {
        imgElement.style.display = 'none';
        videoElement.style.display = 'block';
        videoElement.src = mediaUrl;
    } else {
        videoElement.style.display = 'none';
        imgElement.style.display = 'block';
        imgElement.src = mediaUrl;
    }
}