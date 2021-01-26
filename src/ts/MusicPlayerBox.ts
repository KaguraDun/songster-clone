import renderElement from "./helpers/renderElements";
import Store, { EVENTS } from "./Store";

export default class MusicPlayerBox{
    parentElement: HTMLElement;
    container: HTMLElement;
    controlsContainer: HTMLElement;
    progressBarContainer: HTMLElement;
    playButton: HTMLElement;

    store: Store;  
    
    constructor(parentElement: HTMLElement, store: Store){
        this.parentElement = parentElement;
        this.store = store;
        this.playButton;

        this.playButtonClick = this.playButtonClick.bind(this);
        this.playButtonToggleIcon = this.playButtonToggleIcon.bind(this);
    }

    playButtonToggleIcon(){
        this.playButton.classList.toggle('play');
        this.playButton.classList.toggle('pause');
    }

    init() {
        this.store.eventEmitter.addEvent(EVENTS.END_OF_SONG, this.playButtonToggleIcon);
        this.render();
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

        const level = renderElement(container,'div',['percentage'],'60%');
        const bar = renderElement(container,'div',['progress-bar']);
        const mute = renderElement(container,'div',['mute-icon']);
    }

    renderProgressBar() {
        this.progressBarContainer = renderElement(this.container,'div',['player-box__progress']);

        const time = renderElement(this.progressBarContainer,'div',['time'],'2.42');
        const bar = renderElement(this.progressBarContainer,'div',['progress-bar']);
        const repeat = renderElement(this.progressBarContainer,'div',['repeat']);
    }
}



