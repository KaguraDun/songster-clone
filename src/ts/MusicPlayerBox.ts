import renderElement from "./helpers/renderElements";
import { SVG_SPRITE } from "./helpers/svg_sprites";
import Store, { EVENTS } from "./Store";

export default class MusicPlayerBox{
    parentElement: HTMLElement;
    container: HTMLElement;
    controlsContainer: HTMLElement;
    progressBarContainer: HTMLElement;

    volumeBar: HTMLInputElement;
    volumeLevel: HTMLElement;

    store: Store;  
    
    constructor(parentElement: HTMLElement, store: Store){
        this.parentElement = parentElement;
        this.store = store;

        this.playButtonClick = this.playButtonClick.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.mute = this.mute.bind(this);
    }

    render(){
        this.container = renderElement(this.parentElement,'div',['player-box__container']);

        this.renderControls();
        this.renderProgressBar();
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
        const playButton = renderElement(container,'div',['play-pause','play']);
        renderElement(container,'div',['next']);

        playButton.addEventListener('click',this.playButtonClick);
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

        const time = renderElement(this.progressBarContainer,'div',['time'],'2.42');
        const bar = renderElement(this.progressBarContainer,'div',['progress-bar']);
        const repeat = renderElement(this.progressBarContainer,'div',['repeat']);
    }
}



