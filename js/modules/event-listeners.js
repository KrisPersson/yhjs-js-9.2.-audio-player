// EVENT LISTENERS

import { elements, playAudio, searchTracks, divideSecondsIntoMinsAndSeconds } from "./functions.js"

function addEventListeners() {


    elements.searchBtn.addEventListener('click', () => {
        const input = elements.searchInput.value

        if (input.length > 2) {
            searchTracks(input)
        }
    })

    elements.audioControlPlay.addEventListener('click', playAudio)

    elements.audioControlForward.addEventListener('click', () => {
        elements.audioEl.currentTime += 10
    })

    elements.audioControlRewind.addEventListener('click', () => {
        elements.audioEl.currentTime -= 10
    })

    elements.audioPlayerVolume.addEventListener('click', () => {
        elements.audioPlayerVolumeSlider.classList.toggle('hidden')
    })

    elements.audioPlayerVolumeSlider.addEventListener('input', ()=> {

        const value = elements.audioPlayerVolumeSlider.value / 100

        elements.audioEl.volume = value
        if (value === 0) {
            elements.audioPlayerVolume.classList = "fa-solid fa-volume-xmark"
        } else {
            elements.audioPlayerVolume.classList = "fa-solid fa-volume-off"
        }

    })

    elements.audioEl.addEventListener('ended', ()=> {
        elements.audioControlPlayIcon.classList = "fa-solid fa-play"
        elements.audioEl.load()
        elements.audioProgressBarFiller.style.width = `0%`

    })

    elements.audioEl.addEventListener('timeupdate', () => {

        const currentTime = Math.floor(elements.audioEl.currentTime)
        const totalTime = Math.floor(elements.audioEl.duration)

        // Update progress-bar

        const passedTime = Math.floor((currentTime / totalTime) * 100)
        elements.audioProgressBarFiller.style.width = `${passedTime}%`

        // Update time

        const currentTimeInSeconds = divideSecondsIntoMinsAndSeconds(currentTime) 
        elements.audioProgressBarCurrentTime.textContent = currentTimeInSeconds

    })

    elements.audioEl.addEventListener('canplaythrough', () => {

        elements.audioProgressBarTotalTime.textContent = divideSecondsIntoMinsAndSeconds(Math.floor(elements.audioEl.duration)) 
        elements.audioEl.play()


    })


    elements.audioEl.volume = 0.5


}

export { addEventListeners }