import renderElement from "./helpers/renderElements";
import { SVG_SPRITE } from "./helpers/svg_sprites";
import Store, { EVENTS } from "./Store";

export default class MusicPlayerBox{
    parentElement: HTMLElement;
    container: HTMLElement;
    controlsContainer: HTMLElement;
    progressBarContainer: HTMLElement;
    playButton: HTMLElement;

    playButton: HTMLElement;

    volumeBar: HTMLInputElement;
    volumeLevel: HTMLElement;

    intervalID: number;
    songTimeElement: HTMLElement;
    songTimeDate: Date;
    timeProgressBarWidth: number;
    timeProgressBar: HTMLElement;
    timeSlider: HTMLElement;

    store: Store;
    songDurationSeconds: number;
    
    constructor(parentElement: HTMLElement, store: Store,songDuration: number){
        this.parentElement = parentElement;
        this.store = store;
        this.songDurationSeconds = songDuration;
        this.songTimeDate = new Date(0);

        this.playButtonClick = this.playButtonClick.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.mute = this.mute.bind(this);
        this.showHoverLocationTime = this.showHoverLocationTime.bind(this);
        this.startOrStopSlider = this.startOrStopSlider.bind(this);
        this.onSongEnded = this.onSongEnded.bind(this);
    }

    render(){
        this.store.eventEmitter.addEvent(EVENTS.PLAY_BUTTON_CLICK,this.startOrStopSlider);
        this.store.eventEmitter.addEvent(EVENTS.END_OF_SONG,this.onSongEnded);

        this.container = renderElement(this.parentElement,'div',['player-box__container']);

        this.renderControls();
        this.renderProgressBar();
    }

    dispose() {
        this.store.eventEmitter.removeEvent(EVENTS.PLAY_BUTTON_CLICK,this.startOrStopSlider);
        this.store.eventEmitter.removeEvent(EVENTS.END_OF_SONG,this.onSongEnded);
    }

    renderControls() {
        this.controlsContainer = renderElement(this.container,'div',['player-box__controls']);
        this.renderSpeedButton();
        this.renderPlayButtons();
        this.renderVolumeBar();
    }

    renderPlayButtons() {
        const container = renderElement(this.controlsContainer,'div',['player-box__play-container']);
        renderElement(container,'div',['prev']);
        this.playButton = renderElement(container,'div',['play-pause','play']);
        renderElement(container,'div',['next']);

        this.playButton.addEventListener('click',this.playButtonClick);
    }

    playButtonClick(e: MouseEvent) {
        const target = e.target as HTMLElement;
        target.classList.toggle('play');
        target.classList.toggle('pause');

        this.store.playSong();
    }

    renderSpeedButton() {
        const select = renderElement(this.controlsContainer,'select',['player-box__speed']) as HTMLSelectElement;
        const speedOptions = ['0.5','1','1.5','2'];

        for(const speed of speedOptions) {
            const option = document.createElement('option');
            if (speed === '1') option.selected = true;
            option.text = speed;
            option.value = speed
            select.options.add(option);
        }
    }

    renderVolumeBar() {
        const container = renderElement(this.controlsContainer,'div',['player-box__volume-container']);

        this.volumeLevel = renderElement(container,'div',['percentage'],'50%');
        this.volumeBar = renderElement(container,'input',['progress-bar']) as HTMLInputElement;
        this.volumeBar.type = 'range';
        this.volumeBar.min = '0';
        this.volumeBar.max = '100';
        this.volumeBar.addEventListener('change',this.changeVolume);

        const mute = renderElement(container,'div',['mute-icon']);
        mute.innerHTML = SVG_SPRITE.MUTE;
        mute.addEventListener('click',this.mute);
    }

    changeVolume() {
        const value = this.volumeBar.value;
        this.volumeLevel.textContent = `${value}%`;
        this.store.changeVolume(+value);
    }

    mute(e: MouseEvent) {
        const target = e.target as HTMLDivElement;
        const element = target.closest('.mute-icon');
        element.classList.toggle('active');
        this.store.muteSong();
    }

    renderProgressBar() {
        this.progressBarContainer = renderElement(this.container,'div',['player-box__progress']);

        this.songTimeElement = renderElement(this.progressBarContainer,'div',['time'],'0:00');

        this.timeProgressBar = renderElement(this.progressBarContainer,'div',['progress-bar']);
        this.timeProgressBar.addEventListener('mouseenter',this.showHoverLocationTime);
        this.timeProgressBarWidth = this.timeProgressBar.offsetWidth;

        this.timeSlider = renderElement(this.timeProgressBar,'div',['slider']);
        this.timeSlider.style.width = '0px';

        const repeat = renderElement(this.progressBarContainer,'div',['repeat']);
    }

    showHoverLocationTime(e: MouseEvent) {
        const percentage = e.offsetX / this.timeProgressBarWidth;
        const timeInSeconds = this.songDurationSeconds * percentage;
        const date = new Date(timeInSeconds * 1000);

        const indicator = renderElement(this.timeProgressBar,'div',['time-indicator']);
        indicator.style.left = `${e.offsetX}px`;
        indicator.textContent = `${date.getMinutes()}:${this.addZero(date.getSeconds())}`;
        this.timeProgressBar.addEventListener('mouseleave',() => {
            this.timeProgressBar.removeChild(indicator);
        });
    }

    addZero(n: number) {
        return (parseInt(n.toString(), 10) < 10 ? '0' : '') + n;
    }

    startOrStopSlider() {
        if(this.store.playMusic) {
            this.runSlider();
        }
        else {
            this.stopSlider();
        }
    }

    runSlider() {
        const interval = 1000;
        const delta = this.timeProgressBarWidth / this.songDurationSeconds * (interval/1000);

        let width = +this.timeSlider.style.width.slice(0,-2);
        this.intervalID = +setInterval(() => {
            this.songTimeDate.setMilliseconds(interval);
            this.songTimeElement.textContent = `${this.songTimeDate.getMinutes()}:${this.addZero(this.songTimeDate.getSeconds())}`;

            width += delta;
            this.timeSlider.style.width = `${width}px`;
        },interval);
    }

    stopSlider() {
        clearInterval(this.intervalID);
    }

    onSongEnded() {
        this.stopSlider();
        this.playButton.classList.remove('pause');
        this.playButton.classList.add('play');
        this.songTimeDate = new Date(0);
        this.timeSlider.style.width = '0px';
        this.songTimeElement.textContent = '0:00';
    }


}



