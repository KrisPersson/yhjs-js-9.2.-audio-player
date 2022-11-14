// FUNCTIONS

import { getSpotifyToken, SPOTIFY_TOKEN_URL } from "./api.js"


const elements = {
    searchInput: document.querySelector('.search-input'),
    searchBtn: document.querySelector('.search-btn'),
    searchResults: document.querySelector('.main__search-results'),
    main: document.querySelector('main'),
    searchTerm: document.querySelector('main h3'),
    // audioPlayerSrc: document.querySelector('.aside-left__audio-player audio source'),
    audioEl: document.querySelector('.aside-left__audio-player audio'),
    audioProgressBarFiller: document.querySelector('.progress-bar__filler'),
    audioProgressBarCurrentTime: document.querySelector('.progress-bar__current-time'),
    audioProgressBarTotalTime: document.querySelector('.progress-bar__total-time'),
    audioControlPlay: document.querySelector('.control-section__btn--play'),
    audioControlPlayIcon: document.querySelector('.control-section__btn--play i'),
    audioControlForward: document.querySelector('.control-section__btn--forward'),
    audioControlRewind: document.querySelector('.control-section__btn--rewind'),

    // audioControlStop: document.querySelector('.control-section__btn--stop'),
    audioImageSection: document.querySelector('.audio-player__img-section'),
    audioPlayerVolume: document.querySelector('#audio-player__volume'),
    audioPlayerVolumeSlider: document.querySelector('.slider'),

}

async function searchTracks(searchTerm) {

    try {
        const token = await getSpotifyToken(SPOTIFY_TOKEN_URL)
        const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
        "headers": {
        "authorization": `Bearer ${token}`
        }
        });
        const data = await response.json();
        console.log(data)

        renderSearchResults(data, searchTerm)

    } catch (error) {
        console.log(error)
    }
}


function renderSearchResults(searchObject, searchTerm) {
    let acc = `
        <li class="search-results__header">
            <p class="li-artist-p">Artist</p>
            <p class="li-song-p">Song name</p>
            <p class="li-album-p">Album</p>
            <p class="li-length-p">Length</p>
        </li>`

    for (let i = 0; i < searchObject.tracks.items.length; i++) {
        const track = searchObject.tracks.items[i]
        acc += `
        <li id='${i}' class="search-results__result">
            <p class="li-artist-p">${shortenName(track.artists[0].name)}</p>
            <p class="li-song-p">${shortenName(track.name)}</p>
            <p class="li-album-p">${shortenName(track.album.name)}</p>
            <p class="li-length-p">${getTrackLength(track.duration_ms)}</p>

        </li>
        `

    }
    elements.searchTerm.innerHTML = `Displaying search results for "<span>${searchTerm} </span>"`

    elements.searchResults.innerHTML = acc


    // Add click event-listeners to every search result

    const allSearchResults = document.querySelectorAll('.search-results__result')

    for (let i = 0; i < allSearchResults.length; i++) {
        allSearchResults[i].addEventListener('click', (event) => {

            const trackIndex = event.target.parentNode.id
            elements.audioEl.src = searchObject.tracks.items[trackIndex].preview_url
            elements.audioEl.load()
            elements.audioImageSection.innerHTML = `<img src='${searchObject.tracks.items[trackIndex].album.images[1].url}' />`

            playAudio()
        })
    }
}

function shortenName(string) {
    if (string.length > 40) {
        let newStr = string.slice(0, 39) + '...'
        return newStr
    } else {
        return string
    }
}

function getTrackLength(timeInMS) {

    let seconds = timeInMS / 1000

   return divideSecondsIntoMinsAndSeconds(seconds)
}

function divideSecondsIntoMinsAndSeconds(seconds) {

    let minutes = 0
    
    while (seconds >= 60) {
        seconds -= 60
        minutes++
    }
   seconds = Math.floor(seconds)

   if (`${seconds}`.length === 1) {
    seconds = `0` + `${seconds}`
   }
    return `${minutes}:${seconds}`
}

function playAudio() {

    if (!elements.audioEl.paused) {
        elements.audioEl.pause()
        elements.audioControlPlayIcon.classList = "fa-solid fa-play"
    } else {
        elements.audioEl.play()
        elements.audioControlPlayIcon.classList = "fa-solid fa-pause"
    }
}

export { elements, searchTracks, renderSearchResults, shortenName, getTrackLength, divideSecondsIntoMinsAndSeconds, playAudio }